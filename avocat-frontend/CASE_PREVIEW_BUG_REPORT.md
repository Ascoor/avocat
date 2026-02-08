# Case Preview Bug Report

## Reproduction Steps
1. Log in to the dashboard.
2. Navigate directly to a case details route such as `/dashboard/legcases/show/:id` (deep link or refresh on the details page).
3. Observe the page redirecting to the Home page instead of staying on the details view.

## Root Cause (Verified)
- The Axios response interceptor used in the frontend redirects to `/` on `401` or `419` responses.
- When a session expires or the token is invalid, the interceptor clears auth state and forces a redirect to the Home page, which breaks the case details deep link.
- Evidence:
  - `src/shared/services/api/axiosConfig.js` and `src/shared/api/axiosConfig.ts` both contained:
    ```js
    if (status === 401 || status === 419) {
      clearStoredAuth();
      if (window.location.pathname !== '/') {
        window.location.assign('/');
      }
    }
    ```

## Fix Implemented
1. **Safe redirect on 401/419**
   - Updated both Axios interceptors to redirect to `/login?next=<current-path>` instead of `/`.
   - This preserves the deep link and aligns with the existing auth guard that already supports the `next` query parameter.

2. **Details page resilience**
   - Added explicit error handling for missing IDs and failed fetches in the case details page.
   - Added clear error states instead of bouncing the user out of the page.

## Why This Fix Works
- Users are now sent to the login screen with a `next` param, so after re-authentication they return to the original case details route.
- The details view no longer navigates away on fetch failures; it surfaces errors inline and provides retry options.
