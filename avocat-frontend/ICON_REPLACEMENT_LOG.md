# Icon Replacement Log

## Mapping File
- Added `src/shared/icons/icon-map.ts` to document old icon usage and Lexicraft replacements.

## Replacements Applied (Legal Case Details Scope)
- Action buttons and section headers in Legal Case Details and related sections now use `LexicraftIcon`.
- Old `react-icons` imports removed from:
  - `LegalCaseDetails`
  - `LegalCaseClients`
  - `LegalCaseProcedures`
  - `LegalCaseSessions`
  - `LegalCaseAds`
  - `LegCaseCourts`
  - `AddEditLegCase`
  - `CourtModal` / `CourtList`
  - `AdsDetailsModal`

## Proof of Removal
```bash
rg -n "react-icons" src/features/legal-cases/components/LegalCases
```
Result: no matches.

## Lexicraft Mapping Examples
- `BiPlusCircle` → `document`
- `BiPencil` → `tool`
- `BiTrash` → `shield`
- `BiMinusCircle` → `lock`
- `AiFillEye` → `search`
- `FaRegFile` → `document`
- Header artwork → `briefcase`
