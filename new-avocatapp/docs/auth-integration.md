# Auth Integration Guide (Laravel 11 + Frontend)

## Base URL

```
<API_BASE_URL>/api/v1
```

## Authentication Strategy

This API uses Sanctum personal access tokens. Tokens are returned on login/registration and must be sent with every request:

```
Authorization: Bearer <token>
Accept: application/json
```

Tokens are revoked on logout, and protected endpoints require `auth:sanctum`.

## Endpoints

### Public

| Method | Path | Description |
| --- | --- | --- |
| POST | `/register` | Create account |
| POST | `/login` | Login and receive token |
| POST | `/forgot-password` | Send reset email |
| POST | `/reset-password` | Reset password |

### Protected (auth:sanctum)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/me` | Current user profile |
| POST | `/logout` | Revoke current token |
| POST | `/token/refresh` | Rotate token |
| GET | `/email/verify/{id}/{hash}` | Verify email (signed) |
| POST | `/email/verify/resend` | Resend verification email |

All other API resources are protected by `auth:sanctum`.

## Example Requests

### Register

```bash
curl -X POST "<API_BASE_URL>/api/v1/register" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret123",
    "password_confirmation": "secret123"
  }'
```

### Login

```bash
curl -X POST "<API_BASE_URL>/api/v1/login" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "secret123"
  }'
```

### Authenticated request

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

- Store the token in memory and persist a fallback copy in `localStorage`.
- Always send `Authorization: Bearer <token>` from the API client.
- On 401/419, clear auth state and redirect back to the login screen.
- Use `/me` on page refresh to rehydrate the user profile.
