import api from './axiosConfig';
import type { PageContent, PageHistoryEntry, PublishingQueueItem } from '@shared/types/website';

export interface PageUpdatePayload {
  title_en?: string | null;
  title_ar?: string | null;
  content_blocks?: Array<{
    id?: string;
    key?: string;
    type?: string | null;
    value?: unknown;
    order?: number;
  }>;
  status?: string;
}

export interface WorkflowRequestPayload {
  message?: string;
  notes?: string;
}

export interface SchedulePayload {
  scheduled_at: string;
  timezone?: string;
}

export const getWebsitePage = async (slug: string): Promise<PageContent> => {
  const response = await api.get(`/admin/website/pages/${slug}`);
  return response.data?.data ?? response.data;
};

export const getWebsitePageHistory = async (slug: string): Promise<PageHistoryEntry[]> => {
  const response = await api.get(`/admin/website/pages/${slug}/history`);
  return response.data?.data ?? response.data ?? [];
};

export const updateWebsitePage = async (
  slug: string,
  payload: PageUpdatePayload
): Promise<PageContent> => {
  const response = await api.put(`/admin/website/pages/${slug}`, payload);
  return response.data?.data ?? response.data;
};

export const publishWebsitePage = async (slug: string): Promise<PageContent> => {
  const response = await api.post(`/admin/website/pages/${slug}/publish`);
  return response.data?.data ?? response.data;
};

export const previewWebsitePage = async (
  slug: string,
  payload?: PageUpdatePayload
): Promise<PageContent> => {
  const response = await api.post(`/admin/website/pages/${slug}/preview`, payload ?? {});
  return response.data?.data ?? response.data;
};

export const requestPageApproval = async (
  slug: string,
  payload: WorkflowRequestPayload = {}
): Promise<PageContent> => {
  const response = await api.post(`/admin/website/pages/${slug}/request-approval`, payload);
  return response.data?.data ?? response.data;
};

export const approveWebsitePage = async (
  slug: string,
  payload: WorkflowRequestPayload = {}
): Promise<PageContent> => {
  const response = await api.post(`/admin/website/pages/${slug}/approve`, payload);
  return response.data?.data ?? response.data;
};

export const scheduleWebsitePage = async (
  slug: string,
  payload: SchedulePayload
): Promise<PageContent> => {
  const response = await api.post(`/admin/website/pages/${slug}/schedule`, payload);
  return response.data?.data ?? response.data;
};

export const cancelScheduledWebsitePage = async (slug: string): Promise<PageContent> => {
  const response = await api.post(`/admin/website/pages/${slug}/cancel-schedule`);
  return response.data?.data ?? response.data;
};

export const getPublishingQueue = async (): Promise<PublishingQueueItem[]> => {
  const response = await api.get('/admin/website/publishing-queue');
  return response.data?.data ?? response.data ?? [];
};
