# API Catalog

## Base URL & Client
- **Base URL**: `${VITE_API_BASE_URL}/api/v1` from `src/config/config.jsx`.
- **Axios client**: `src/services/api/axiosConfig.js` and `src/api/axiosConfig.ts` (duplicated). Both add:
  - `Authorization: Bearer <token>` if token exists.
  - Response handling: on `401/419`, clear auth + redirect to `/`.

## Auth Endpoints (AuthContext)
- `POST /login` — email/password + device_name + token flag.
- `POST /register` — name/email/password + device_name + token flag.
- `POST /logout` — invalidate session.
- `GET /me` — fetch current user.

## Core Services — `src/services/api/*.js`
### GeneralReqApi.js
- **Clients**: `GET /clients`, `GET /clients/:id`, `POST /clients`, `PUT /clients/:id`, `DELETE /clients/:id`, `GET /client-search?query=`
- **Unclients**: `GET /unclients`, `GET /unclients/:id`, `POST /unclients`, `PUT /unclients/:id`, `DELETE /unclients/:id`
- **Lawyers**: `GET /lawyers`, `GET /lawyer/:id`, `POST /lawyers`, `PUT /lawyer/:id`, `DELETE /lawyer/:id`
- **Courts**: `GET /courts`, `GET /courts/:id`, `POST /courts`, `PUT /courts/:id`, `DELETE /courts/:id`
- **Court Types**: `GET /court_types`, `GET /court_types/:id`, `POST /court_types`, `PUT /court_types/:id`, `DELETE /court_types/:id`
- **Court Levels**: `GET /court_levels`, `GET /court_levels/:id`, `POST /court_levels`, `PUT /court_levels/:id`, `DELETE /court_levels/:id`
- **Legal Cases**: `GET /legal-cases`, `GET /legal-cases/:id`, `POST /legal-cases`, `PUT /legal-cases/:id`, `DELETE /legal-cases/:id`, `GET /leg-case-search?query=`
- **Case Types**: `GET /case_types`, `GET /case_types/:id`, `POST /case_types`, `PUT /case_types/:id`, `DELETE /case_types/:id`
- **Case Sub Types**: `GET /case_sub_types`, `GET /case_sub_types/:id`, `POST /case_sub_types`, `PUT /case_sub_types/:id`, `DELETE /case_sub_types/:id`
- **Procedure Types**: `GET /procedure_types`, `GET /procedure_types/:id`, `POST /procedure_types`, `PUT /procedure_types/:id`, `DELETE /procedure_types/:id`
- **Procedure Place Types**: `GET /procedure_place_types`, `GET /procedure_place_types/:id`, `POST /procedure_place_types`, `PUT /procedure_place_types/:id`, `DELETE /procedure_place_types/:id`
- **Procedures**: `GET /procedures`, `GET /procedures/:id`, `DELETE /procedures/:id`
- **Services**: `GET /services`, `GET /services/:id`, `POST /services`, `PUT /services/:id`, `DELETE /services/:id`
- **Expense Categories**: `GET /expense_categories`, `GET /expense_categories/:id`, `POST /expense_categories`, `PUT /expense_categories/:id`, `DELETE /expense_categories/:id`
- **Legal Sessions**: `GET /legal_sessions`, `GET /legal_sessions/leg-case/:id`, `GET /legal_sessions/court/:id`, `GET /legal_sessions/lawyer/:id`, `POST /legal_sessions`, `PUT /legal_sessions/:id`, `DELETE /legal_sessions/:id`

### clients.js
- `GET /clients`, `GET /unclients`, `GET /clients/:id`, `POST /clients`, `PUT /clients/:id`, `DELETE /clients/:id`, `PUT /clients/:id` (status update)

### courts.js
- `GET /courts`, `GET /courts/:id`, `POST /courts`, `PUT /courts/:id`, `DELETE /courts/:id`

### events.js
- `GET /events`, `POST /event`

### expenses.js
- `GET /expenses/search`, `GET /expense_categories`

### lawyers.js
- `GET /lawyers`, `GET /lawyers/:id`, `POST /lawyers`, `PUT /lawyers/:id`, `DELETE /lawyers/:id`

### legalCases.js
- **Case Clients**: `POST /legal-cases/:id/add_clients`, `DELETE /legal-cases/:id/clients/:clientId`
- **Case Courts**: `POST /legal-cases/add_courts`, `DELETE /leg-case/remove-court`
- **Courts**: `GET/POST/PUT/DELETE /courts`
- **Lawyers**: `GET/POST/PUT/DELETE /lawyers`
- **Legal Cases**: `GET/POST/PUT/DELETE /legal-cases`, `GET /legal-case-search?query=`
- **Case Types**: `GET/POST/PUT/DELETE /case_types`
- **Case Subtypes**: `GET/POST/PUT/DELETE /case_sub_types`
- **Legal Ads**: `GET /legal-ads`, `GET /legal-ads/:id`, `GET /legal_ad_types`, `POST /legal-ads`, `PUT /legal-ads/:id`, `DELETE /legal-ads/:id`, `POST /legal_ad_types`
- **Legal Sessions**: `GET /legal_sessions`, `GET /legal_sessions/leg-case/:id`, `GET /legal_sessions/court/:id`, `GET /legal_sessions/lawyer/:id`, `POST /legal_sessions`, `PUT /legal_sessions/:id`, `DELETE /legal_sessions/:id`

### notifications.js
- `GET /notifications/:userId`, `POST /notifications/:id/read`, `POST /notification`

### procedures.js
- `GET /procedures`, `GET /procedures/:id`, `POST /procedures`, `PUT /procedures/:id`, `DELETE /procedures/:id`
- `GET /procedures/leg-case/:id`
- `GET/POST/PUT/DELETE /procedure_types`
- `GET/POST/PUT/DELETE /procedure_place_types`

### services.js
- `GET/POST/PUT/DELETE /services`
- `GET /service-procedures/:serviceId`, `POST /service-procedures`, `PUT /service-procedures/:id`, `DELETE /service-procedure/:id`
- `GET/POST/PUT/DELETE /service-types`

### sessions.js
- `GET /legal_sessions`, `GET /legal_session_types`
- `GET /legal_sessions/leg-case/:id`, `GET /legal_sessions/court/:id`, `GET /legal_sessions/lawyer/:id`
- `POST /legal_sessions`, `PUT /legal_sessions/:id`, `DELETE /legal_sessions/:id`

## Typed Services — `src/api/*.ts`
### adminAuth.service.ts
- `GET /admin/profile`, `PUT /admin/profile`

### clients.service.ts
- `GET /clients`, `GET /unclients`, `GET /clients/:id`, `POST /clients`, `PUT /clients/:id`, `DELETE /clients/:id`, `PUT /clients/:id` (status)

### legalCases.service.ts
- `GET /leg-cases`, `GET /leg-cases/:id`, `POST /leg-cases`, `PUT /leg-cases/:id`, `DELETE /leg-cases/:id`

### websiteAdmin.service.ts
- `GET /admin/website/pages/:slug`
- `GET /admin/website/pages/:slug/history`
- `PUT /admin/website/pages/:slug`
- `POST /admin/website/pages/:slug/publish`
- `POST /admin/website/pages/:slug/preview`
- `POST /admin/website/pages/:slug/request-approval`
- `POST /admin/website/pages/:slug/approve`
- `POST /admin/website/pages/:slug/schedule`
- `POST /admin/website/pages/:slug/cancel-schedule`
- `GET /admin/website/publishing-queue`

## Direct API Usage in Components (non-service)
- `GET /all_count_office` (Dashboard)
- `GET /search-court` (SearchCourt + SearchCourtsApi)
- `POST https://search-api.avocat.live/search` (SearchCourt)
- `POST https://search-api.ask-ar.net/search` (SearchCourtsApi)
- `GET/PUT /user/:id` (ProfileUser)
- `GET /expense_categories` and `GET /expenses/search` (Financially/Expense)
