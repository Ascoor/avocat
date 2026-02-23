# UI Finance + Lookups

## 1) Component architecture proposal

### `shared/components/LookupManager`
- `LookupManager.jsx`: reusable CRUD table + modal for any lookup with `name_ar`, `name_en`, `is_active`, `sort_order`, `scope`, `is_locked`.
- `config.js`: central lookup entities list and shared form fields.

### `shared/components/Finance`
- `FinanceFilters.jsx`: standard filters for ledger (date range, kind, case, service, category).
- `LedgerTable.jsx`: unified transactions table with empty/loading states.
- `FinanceSummaryCards.jsx`: case totals cards (expenses, revenues, paid, outstanding).
- `TransactionForm.jsx`: create expense/revenue transaction and link to case/service/session/ad/procedure.

### API adapters
- `shared/services/api/lookups.js`: unified `/lookups/{entity}` with fallback to `/offices/{office}/settings/{entity}`.
- `shared/services/api/finance.js`: unified finance endpoints with compatibility fallback to legacy expense routes.

## 2) Routes map

- `/dashboard/office-settings` → lookup management screen (tabs by lookup entity)
- `/dashboard/finance/ledger` → finance ledger list + filters
- `/dashboard/finance/case-summary` → case finance summary + recent transactions
- `/dashboard/finance/create-transaction` → create expense/revenue transaction

## 3) Add a new lookup in 2 minutes

1. Open `src/shared/components/LookupManager/config.js`.
2. Add new entity in `lookupEntities`:
   ```js
   { value: 'new_lookup_table', titleKey: 'settings.lookups.entities.newLookupTable' }
   ```
3. Add i18n labels in:
   - `src/shared/locales/en/settings.json`
   - `src/shared/locales/ar/settings.json`
4. Ensure backend supports `/api/v1/lookups/new_lookup_table` (or office settings fallback endpoint).
5. Done — the UI tab auto-renders with search, create/edit, active toggle, sort order, and lock handling.

## 4) UI flow summary

- **Lookup page**: choose entity tab → search in table → add/edit from modal → toggle enable/disable → locked items are protected.
- **Finance ledger**: set filters → search → review ledger rows for expense/revenue/payment.
- **Case summary**: enter case ID → load totals cards + latest transactions.
- **Create transaction**: choose kind (expense/revenue), fill amount/date/links, save to create ledger entry.
