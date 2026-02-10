# RBAC Backend Switch

- Default mode is `VITE_RBAC_MODE=mock`.
- `src/shared/api/rbac/client.ts` switches between mock and real clients.
- For future Laravel integration set `VITE_RBAC_MODE=real` and implement endpoints inside `src/shared/api/rbac/real.ts`.
- Mock data is persisted in `localStorage` key `RBAC_MOCK_DB`.
