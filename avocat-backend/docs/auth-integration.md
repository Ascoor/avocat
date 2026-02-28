# Auth Integration Guide (Laravel 11 + Frontend)

## Base URL

```
<API_BASE_URL>/api/v1
```

## Authentication Strategy

This API uses Laravel Sanctum for SPA cookie-based authentication by default. The frontend authenticates via the session cookie and CSRF token, and requests are authorized with `auth:sanctum`.

Optional: If you need personal access tokens for non-browser clients, you can request a token during login/registration.

### SPA cookie auth (default)

1. Fetch the CSRF cookie:

```
GET /sanctum/csrf-cookie
```

2. Login with credentials (cookies + XSRF header enabled in your HTTP client).
3. Subsequent API calls include the session cookie automatically.

### Personal access tokens (optional)

Tokens are returned only when `token=true` (or `device_name` is provided) on login/registration.

```
Authorization: Bearer <token>
Accept: application/json
```

Tokens are revoked on logout, and protected endpoints require `auth:sanctum`.

## Endpoints

### Public

| Method | Path | Description |
| --- | --- | --- |
| POST | `/register` | Create account (session login) |
| POST | `/login` | Login (session) |
| POST | `/forgot-password` | Send reset email |
| POST | `/reset-password` | Reset password |

### Protected (auth:sanctum)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/me` | Current user profile |
| POST | `/logout` | Logout (session + token) |
| POST | `/token/refresh` | Rotate token (token auth only) |
| GET | `/email/verify/{id}/{hash}` | Verify email (signed) |
| POST | `/email/verify/resend` | Resend verification email |

All other API resources are protected by `auth:sanctum`.

## Example Requests

### Register (session auth)

```bash
curl -X POST "<API_BASE_URL>/api/v1/register" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -b cookies.txt -c cookies.txt \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret123",
    "password_confirmation": "secret123"
  }'
```

### Login (session auth)

```bash
curl -X GET "<API_BASE_URL>/sanctum/csrf-cookie" -c cookies.txt

curl -X POST "<API_BASE_URL>/api/v1/login" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "X-XSRF-TOKEN: <value-from-cookie>" \
  -b cookies.txt -c cookies.txt \
  -d '{
    "email": "jane@example.com",
    "password": "secret123"
  }'
```

### Authenticated request (session auth)

```bash
curl -X GET "<API_BASE_URL>/api/v1/me" \
  -H "Accept: application/json" \
  -H "X-XSRF-TOKEN: <value-from-cookie>" \
  -b cookies.txt -c cookies.txt
```

### Login with token (non-SPA client)

```bash
curl -X POST "<API_BASE_URL>/api/v1/login" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "secret123",
    "token": true,
    "device_name": "cli"
  }'
```

### Authenticated request (token auth)

```bash
curl -X GET "<API_BASE_URL>/api/v1/me" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <token>"
```

## Response Format

Successful responses:

```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "...": "..."
  }
}
```

Validation errors:

```json
{
  "status": "error",
  "message": "Validation failed.",
  "errors": {
    "field": ["message"]
  }
}
```

Authentication errors:

```json
{
  "status": "error",
  "message": "Unauthenticated.",
  "errors": null
}
```

## Frontend Integration Notes

- Configure `withCredentials: true` in your SPA HTTP client so cookies are sent.
- Call `/sanctum/csrf-cookie` once before login to get the CSRF cookie.
- Send the `X-XSRF-TOKEN` header for state-changing requests.
- On 401/419, clear auth state and redirect back to the login screen.
- Use `/me` on page refresh to rehydrate the user profile.
- If you need tokens for non-browser clients, pass `token=true` or `device_name` when logging in.

## Sanctum + Session Configuration Checklist

- `SANCTUM_STATEFUL_DOMAINS` includes your SPA host (e.g. `localhost:8088`).
- `SESSION_DOMAIN` is set so the session cookie is sent to your SPA domain.
- `SESSION_DRIVER` supports your deployment (e.g. `redis` for API servers).
- `SESSION_SECURE_COOKIE` is `true` in production (HTTPS).
