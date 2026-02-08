# i18n Coverage (Step 2)

## Auth
- Login page hero copy + form labels + toasts use `t(...)`.
- Signup page hero copy + form labels + alerts use `t(...)`.

## Header / Sidebar / Navigation
- Header labels and menu items use `t(...)`.
- Sidebar navigation labels are mapped through translation keys in `@config/sidebar`.
- Mobile drawer section titles + items use `t(...)`.

## Common actions
- `Save` / `Cancel` / `Search` / `Logout` are available in `common` and used in:
  - Settings → Service Types modal and pagination
  - Finance → Client Account search

## Alerts / Toasts
- Auth toasts (login success/error/session) use translations.
- Service Types alerts (fetch/save/delete) use translations.
