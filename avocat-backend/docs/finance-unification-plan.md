# Finance Unification Plan

## Schema changes
- Add `financial_transactions` as canonical ledger for expenses/revenues/payments/invoice adjustments.
- Keep legacy `expenses`, `revenues`, `payments`, and embedded `cost1/cost2/cost3` fields for transition compatibility.
- Add `expenses.legal_ad_id` and stop writing legal ad IDs into `expenses.legal_session_id`.
- Keep lookup category tables (`expense_categories`, `revenue_categories`) and standardize usage through shared lookup CRUD conventions.

## Backfill steps
1. Backfill ledger from `expenses` with normalized amount parsing (`json`/string/array).
2. Backfill deterministic entries from `procedures`, `legal_sessions`, and `legal_ads` cost1/2/3 values.
3. Backfill revenues and payments into the ledger.
4. Use idempotent `updateOrInsert` keys (`source_type`, `source_id`, `type`, plus metadata for cost slots).

## Rollback strategy
- Drop `financial_transactions` and `expenses.legal_ad_id`.
- Remove ledger-derived entries created from legacy sources.
- Legacy business paths continue to work since old tables are preserved.

## API transition notes
- New endpoints:
  - `GET /api/v1/finance/ledger`
  - `POST /api/v1/finance/ledger`
  - `GET /api/v1/finance/cases/{id}/summary`
- Backward compatibility:
  - Existing expense search endpoint now reads from canonical ledger (`type=expense`).
  - Legal ad expense creation still creates legacy expense rows while also creating ledger entries.

## Reporting query examples
```sql
-- Case totals (single case)
SELECT
  leg_case_id,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses,
  SUM(CASE WHEN type = 'revenue' THEN amount ELSE 0 END) AS total_revenues,
  SUM(CASE WHEN type = 'payment' THEN amount ELSE 0 END) AS total_paid
FROM financial_transactions
WHERE leg_case_id = :case_id
GROUP BY leg_case_id;
```

```sql
-- Case balance view
SELECT
  lc.id,
  lc.fees,
  COALESCE(SUM(CASE WHEN ft.type = 'payment' THEN ft.amount END), 0) AS paid,
  lc.fees - COALESCE(SUM(CASE WHEN ft.type = 'payment' THEN ft.amount END), 0) AS outstanding
FROM leg_cases lc
LEFT JOIN financial_transactions ft ON ft.leg_case_id = lc.id
WHERE lc.id = :case_id
GROUP BY lc.id, lc.fees;
```
