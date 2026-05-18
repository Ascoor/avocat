/**
 * After a new production deploy, hashed lazy-loaded chunks from an older
 * in-memory bundle return 404. Recover by reloading once so index.html
 * and the main entry pull the current asset graph.
 */
let reloadScheduled = false;

function reloadOnceForStaleBuild(): void {
  if (reloadScheduled) {
    return;
  }
  reloadScheduled = true;
  window.location.reload();
}

function isDynamicImportChunkFailure(message: string): boolean {
  return (
    message.includes('Failed to fetch dynamically imported module') ||
    message.includes('error loading dynamically imported module') ||
    message.includes('Importing a module script failed')
  );
}

export function registerStaleBuildRecovery(): void {
  window.addEventListener('vite:preloadError', (event: Event) => {
    event.preventDefault();
    reloadOnceForStaleBuild();
  });

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const message =
      typeof reason === 'object' && reason !== null && 'message' in reason
        ? String((reason as { message: unknown }).message)
        : String(reason);
    if (isDynamicImportChunkFailure(message)) {
      event.preventDefault();
      reloadOnceForStaleBuild();
    }
  });
}
