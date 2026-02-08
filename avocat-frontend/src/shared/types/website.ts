export type Locale = 'en' | 'ar';

export interface Localized<T> {
  en?: T | null;
  ar?: T | null;
}

export type PageStatus = 'draft' | 'published' | 'scheduled' | 'pending_review' | 'approved';

export type WorkflowState = 'draft' | 'pending_review' | 'approved' | 'published' | 'scheduled';

export type Role = 'Admin' | 'Editor' | 'Viewer';

export type Permission =
  | 'pages:view'
  | 'pages:edit'
  | 'pages:publish'
  | 'pages:approve'
  | 'pages:schedule'
  | 'pages:bulk-publish'
  | 'media:upload'
  | 'analytics:view';

export interface ContentBlock {
  id?: string;
  key?: string;
  type?: string | null;
  value?: Localized<unknown> | unknown;
  order?: number;
}

export interface PageWorkflowMeta {
  state: WorkflowState;
  requested_by?: string;
  requested_at?: string;
  approved_by?: string;
  approved_at?: string;
  scheduled_at?: string;
}

export interface PageContent {
  id?: string;
  slug: string;
  title?: Localized<string | null>;
  content?: ContentBlock[];
  content_blocks?: ContentBlock[];
  status?: PageStatus;
  workflow?: PageWorkflowMeta | null;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export interface PageHistoryEntry {
  id: string;
  page_id: string;
  action: string;
  user_id?: string;
  user_name?: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}

export interface PublishingQueueItem {
  id: string;
  page_id: string;
  page_slug: string;
  page_title?: Localized<string | null>;
  scheduled_at?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface AdminProfile {
  id: string;
  name?: string;
  email?: string;
  roles?: Role[];
  permissions?: Permission[];
}
