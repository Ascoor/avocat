import { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  approveWebsitePage,
  cancelScheduledWebsitePage,
  getPublishingQueue,
  publishWebsitePage,
  requestPageApproval,
  scheduleWebsitePage,
  type SchedulePayload,
  type WorkflowRequestPayload,
} from '@/api/websiteAdmin.service';
import type { PageContent, PublishingQueueItem, WorkflowState } from '@/types/website';

interface UseWorkflowManagerOptions {
  slug: string;
  enabled?: boolean;
  loadQueue?: boolean;
}

interface WorkflowActionHandlers {
  requestApproval: (payload?: WorkflowRequestPayload) => Promise<PageContent>;
  approveAndPublish: (payload?: WorkflowRequestPayload) => Promise<PageContent>;
  publishDirectly: () => Promise<PageContent>;
  schedulePublish: (payload: SchedulePayload) => Promise<PageContent>;
  cancelSchedule: () => Promise<PageContent>;
}

interface UseWorkflowManagerResult extends WorkflowActionHandlers {
  queue: PublishingQueueItem[];
  isQueueLoading: boolean;
  isRequestingApproval: boolean;
  isApproving: boolean;
  isPublishing: boolean;
  isScheduling: boolean;
  isCancellingSchedule: boolean;
  workflowState: WorkflowState;
  refreshQueue: () => void;
}

export const useWorkflowManager = ({ slug, enabled = true, loadQueue = false }: UseWorkflowManagerOptions): UseWorkflowManagerResult => {
  const queryClient = useQueryClient();
  const isActive = enabled && Boolean(slug);

  const queueQuery = useQuery({
    queryKey: ['admin-website-publishing-queue'],
    queryFn: getPublishingQueue,
    enabled: loadQueue && isActive,
  });

  const requestApprovalMutation = useMutation({
    mutationFn: (payload: WorkflowRequestPayload = {}) => requestPageApproval(slug, payload),
    onSuccess: (page) => {
      queryClient.setQueryData(['admin-website-page', slug], page);
      queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-publishing-queue'] });
    },
  });

  const approveMutation = useMutation({
    mutationFn: (payload: WorkflowRequestPayload = {}) => approveWebsitePage(slug, payload),
    onSuccess: (page) => {
      queryClient.setQueryData(['admin-website-page', slug], page);
      queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-publishing-queue'] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: () => publishWebsitePage(slug),
    onSuccess: (page) => {
      queryClient.setQueryData(['admin-website-page', slug], page);
      queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-publishing-queue'] });
    },
  });

  const scheduleMutation = useMutation({
    mutationFn: (payload: SchedulePayload) => scheduleWebsitePage(slug, payload),
    onSuccess: (page) => {
      queryClient.setQueryData(['admin-website-page', slug], page);
      queryClient.invalidateQueries({ queryKey: ['admin-website-page-history', slug] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-publishing-queue'] });
    },
  });

  const cancelScheduleMutation = useMutation({
    mutationFn: () => cancelScheduledWebsitePage(slug),
    onSuccess: (page) => {
      queryClient.setQueryData(['admin-website-page', slug], page);
      queryClient.invalidateQueries({ queryKey: ['admin-website-pages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-website-publishing-queue'] });
    },
  });

  const queue = useMemo(() => queueQuery.data ?? [], [queueQuery.data]);

  const workflowState = useMemo<WorkflowState>(() => {
    if (!isActive) {
      return 'draft';
    }
    const page = queryClient.getQueryData<PageContent>(['admin-website-page', slug]);
    return page?.workflow?.state ?? 'draft';
  }, [isActive, queryClient, slug]);

  const requestApproval = useCallback<WorkflowActionHandlers['requestApproval']>(
    async (payload) => {
      const result = await requestApprovalMutation.mutateAsync(payload ?? {});
      return result;
    },
    [requestApprovalMutation],
  );

  const approveAndPublish = useCallback<WorkflowActionHandlers['approveAndPublish']>(
    async (payload) => {
      const result = await approveMutation.mutateAsync(payload ?? {});
      return result;
    },
    [approveMutation],
  );

  const publishDirectly = useCallback<WorkflowActionHandlers['publishDirectly']>(
    async () => publishMutation.mutateAsync(),
    [publishMutation],
  );

  const schedulePublish = useCallback<WorkflowActionHandlers['schedulePublish']>(
    async (payload) => {
      const result = await scheduleMutation.mutateAsync(payload);
      return result;
    },
    [scheduleMutation],
  );

  const cancelSchedule = useCallback<WorkflowActionHandlers['cancelSchedule']>(
    async () => {
      const result = await cancelScheduleMutation.mutateAsync();
      return result;
    },
    [cancelScheduleMutation],
  );

  const refreshQueue = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['admin-website-publishing-queue'] });
  }, [queryClient]);

  return {
    queue,
    workflowState,
    requestApproval,
    approveAndPublish,
    publishDirectly,
    schedulePublish,
    cancelSchedule,
    refreshQueue,
    isQueueLoading: queueQuery.isLoading,
    isRequestingApproval: requestApprovalMutation.isPending,
    isApproving: approveMutation.isPending,
    isPublishing: publishMutation.isPending,
    isScheduling: scheduleMutation.isPending,
    isCancellingSchedule: cancelScheduleMutation.isPending,
  };
};

export default useWorkflowManager;
