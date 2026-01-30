import { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getWebsitePage,
  getWebsitePageHistory,
  previewWebsitePage,
  publishWebsitePage,
  updateWebsitePage,
  type PageUpdatePayload,
} from '@/api/websiteAdmin.service';
import type { PageContent, PageHistoryEntry, PageStatus, PageWorkflowMeta, WorkflowState } from '@/types/website';

interface UsePageManagerOptions {
  enabled?: boolean;
}

interface SaveDraftOptions {
  silent?: boolean;
  status?: PageStatus;
}

interface UsePageManagerResult {
  page: PageContent | undefined;
  status: PageStatus;
  workflow: PageWorkflowMeta | null | undefined;
  workflowState: WorkflowState;
  history: PageHistoryEntry[];
  isLoading: boolean;
  isHistoryLoading: boolean;
  isSaving: boolean;
  isPublishing: boolean;
  isPreviewing: boolean;
  saveDraft: (payload: PageUpdatePayload, options?: SaveDraftOptions) => Promise<PageContent | undefined>;
  publish: () => Promise<PageContent | undefined>;
  requestPreview: (payload?: PageUpdatePayload) => Promise<PageContent | undefined>;
  refresh: () => void;
  error: unknown;
}

const deriveStatus = (page: PageContent | undefined): PageStatus => {
  if (page?.status) {
    return page.status;
  }
  return 'draft';
};

const deriveWorkflowState = (page: PageContent | undefined): WorkflowState => {
  if (page?.workflow?.state) {
    return page.workflow.state;
  }
  if (page?.status === 'published') {
    return 'published';
  }
  return 'draft';
};

export const usePageManager = (
  slug: string,
  options: UsePageManagerOptions = {},
): UsePageManagerResult => {
  const { enabled = true } = options;
  const queryClient = useQueryClient();

  const pageQuery = useQuery({
    queryKey: ['admin-website-page', slug],
    queryFn: () => getWebsitePage(slug),
    enabled: Boolean(slug) && enabled,
  });

  const historyQuery = useQuery({
    queryKey: ['admin-website-page-history', slug],
    queryFn: () => getWebsitePageHistory(slug),
    enabled: Boolean(slug) && enabled,
  });

  const saveMutation = useMutation({
    mutationFn: (payload: PageUpdatePayload) => updateWebsitePage(slug, payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['admin-website-page', slug] });

      const previousPage = queryClient.getQueryData<PageContent>(['admin-website-page', slug]);

      const nextPage = previousPage
        ? {
            ...previousPage,
            title: {
              en: payload.title_en ?? previousPage.title?.en ?? null,
              ar: payload.title_ar ?? previousPage.title?.ar ?? null,
            },
            content_blocks: (payload.content_blocks ?? previousPage.content_blocks ?? []).map(block => ({
              ...block,
              type: block.type ?? null,
            })),
            content: previousPage.content,
            status: payload.status ?? previousPage.status ?? 'draft',
            updated_at: new Date().toISOString(),
          } as PageContent
        : previousPage;

      if (nextPage) {
        queryClient.setQueryData(['admin-website-page', slug], nextPage);
      }

      return { previousPage };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPage) {
        queryClient.setQueryData(['admin-website-page', slug], context.previousPage);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['admin-website-page', slug], data);
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: () => publishWebsitePage(slug),
    onSuccess: (data) => {
      queryClient.setQueryData(['admin-website-page', slug], data);
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
    },
  });

  const previewMutation = useMutation({
    mutationFn: (payload: PageUpdatePayload | undefined) => previewWebsitePage(slug, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['admin-website-page', slug], data);
      queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
    },
  });

  const saveDraft = useCallback(
    async (payload: PageUpdatePayload, saveOptions?: SaveDraftOptions) => {
      const status = saveOptions?.status ?? payload.status ?? 'draft';
      const mergedPayload: PageUpdatePayload = {
        ...payload,
        status,
      };

      try {
        const data = await saveMutation.mutateAsync(mergedPayload);
        if (!saveOptions?.silent) {
          return data;
        }
        return data;
      } catch (error) {
        if (saveOptions?.silent) {
          throw error;
        }
        throw error;
      }
    },
    [saveMutation],
  );

  const publish = useCallback(async () => {
    const data = await publishMutation.mutateAsync();
    return data;
  }, [publishMutation]);

  const requestPreview = useCallback(
    async (payload?: PageUpdatePayload) => {
      const data = await previewMutation.mutateAsync(payload);
      return data;
    },
    [previewMutation],
  );

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['admin-website-page', slug] });
    queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
  }, [queryClient, slug]);

  const status = useMemo(() => deriveStatus(pageQuery.data), [pageQuery.data]);
  const workflow = pageQuery.data?.workflow;
  const workflowState = useMemo(() => deriveWorkflowState(pageQuery.data), [pageQuery.data]);

  return {
    page: pageQuery.data,
    status,
    workflow,
    workflowState,
    history: historyQuery.data ?? [],
    isLoading: pageQuery.isLoading || pageQuery.isFetching,
    isHistoryLoading: historyQuery.isLoading,
    isSaving: saveMutation.isPending,
    isPublishing: publishMutation.isPending,
    isPreviewing: previewMutation.isPending,
    saveDraft,
    publish,
    requestPreview,
    refresh,
    error: pageQuery.error,
  };
};

export default usePageManager;
