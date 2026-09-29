const DEFAULT_AUTHENTICATED_PATH = '/dashboard';

/**
 * Only allow router-local return paths. This prevents a crafted `next` query
 * parameter from becoming a protocol-relative or external redirect.
 */
export const getSafeReturnPath = (
  candidate: string | null | undefined,
  fallback = DEFAULT_AUTHENTICATED_PATH,
) => {
  if (!candidate || !candidate.startsWith('/') || candidate.startsWith('//')) {
    return fallback;
  }

  return candidate;
};

