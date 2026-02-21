# Office Settings LookupManager

To add a new lookup entity in Office Settings:

1. Open `src/features/settings/pages/ManagmentSettings.jsx`.
2. Add a new item in `lookupEntities` with:
   - `value`: backend entity slug (example: `service_types`).
   - `titleKey`: translation key under `settings.lookups.entities.*`.
3. Add translation labels in:
   - `src/shared/locales/ar/settings.json`
   - `src/shared/locales/en/settings.json`
4. If the entity needs custom fields, pass a `fields` array to `LookupManager`
   in the tab content.

All CRUD requests go through: `src/shared/services/api/officeSettings.js` and
target: `/offices/{officeId}/settings/{entity}`.
