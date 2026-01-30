import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import api from '@/api/axiosConfig';
import type { ContentBlock, Localized, Locale, PageContent } from '@/types/website';

export interface UseWebsiteContentResult {
  data: PageContent | null;
  loading: boolean;
  error: Error | null;
  contentBlocks: ContentBlock[];
  getLocalizedValue: <T>(key: string, fallback?: Localized<T>) => Localized<T | null>;
  getValueForLocale: (
    key: string,
    locale: Locale,
    fallback?: string
  ) => string;
}

export function useWebsiteContent(slug: string): UseWebsiteContentResult {
  const query = useQuery({
    queryKey: ['website-content', slug],
    queryFn: async () => {
      const response = await api.get(`/api/website/pages/${slug}`);
      const payload = (response.data?.data ?? response.data) as PageContent | null;
      return payload;
    },
  });

  const data = query.data ?? null;

  const contentBlocks = useMemo<ContentBlock[]>(
    () => data?.content_blocks ?? data?.content ?? [],
    [data]
  );

  const getBlock = useCallback(
    (key: string) => contentBlocks.find((block) => block.key === key),
    [contentBlocks]
  );

  const getLocalizedValue = useCallback(
    <T,>(key: string, fallback?: Localized<T>): Localized<T | null> => {
      const block = getBlock(key);
      const value = block?.value as Localized<T | null> | undefined;

      return {
        ar: value?.ar ?? fallback?.ar ?? null,
        en: value?.en ?? fallback?.en ?? null,
      };
    },
    [getBlock]
  );

  const getValueForLocale = useCallback(
    (key: string, locale: Locale, fallback: string = ''): string => {
      const block = getBlock(key);
      const value = block?.value as Localized<string> | undefined;
      return value?.[locale] ?? fallback;
    },
    [getBlock]
  );

  return {
    data,
    loading: query.isLoading,
    error: (query.error as Error | null) ?? null,
    contentBlocks,
    getLocalizedValue,
    getValueForLocale,
  };
}
