const cacheStore = new Map();
const DEFAULT_TTL_MS = 45000;

const isDev = () => typeof import.meta !== 'undefined' && import.meta.env?.DEV;

const logCache = (message, meta) => {
  if (!isDev()) return;
  const prefix = '[caseFetchCache]';
  if (meta) {
    console.info(prefix, message, meta);
  } else {
    console.info(prefix, message);
  }
};

export const fetchWithCaseCache = async ({
  key,
  fetcher,
  ttl = DEFAULT_TTL_MS,
}) => {
  const now = Date.now();
  const existing = cacheStore.get(key);

  if (existing?.data && now - existing.ts < ttl) {
    logCache('cache-hit', { key });
    return existing.data;
  }

  if (existing?.promise) {
    logCache('cache-join', { key });
    return existing.promise;
  }

  logCache('cache-miss', { key });

  const promise = Promise.resolve()
    .then(fetcher)
    .then((data) => {
      cacheStore.set(key, { ts: Date.now(), data });
      return data;
    })
    .catch((error) => {
      cacheStore.delete(key);
      throw error;
    });

  cacheStore.set(key, { ts: now, promise, data: existing?.data });
  return promise;
};

export const invalidateCaseFetchCache = (target) => {
  if (!target) return;

  if (typeof target === 'string') {
    for (const key of cacheStore.keys()) {
      if (key.startsWith(target)) {
        cacheStore.delete(key);
      }
    }
    logCache('invalidate-prefix', { target });
    return;
  }

  if (Array.isArray(target)) {
    target.forEach((entry) => invalidateCaseFetchCache(entry));
  }
};

export const clearCaseFetchCache = () => {
  cacheStore.clear();
  logCache('cache-cleared');
};
