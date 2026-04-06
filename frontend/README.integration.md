# Frontend-Backend Integration Guide

## 1) Backend URL

Create `frontend/.env` with:

VITE_API_URL=http://127.0.0.1:8000/api

## 2) Authentication flow

- Login page calls POST /auth/login with:
  - email
  - password
- Register page calls POST /auth/register with:
  - first_name
  - last_name
  - email
  - password
  - password_confirmation
- Token is stored in localStorage under key: cm_token
- Protected routes require a valid user from GET /auth/me
- Logout calls POST /auth/logout and clears local token

## 3) Frontend pages to backend endpoints

- Dashboard
  - GET /posts
  - GET /calendar?a_venir=1
- Calendar widgets
  - GET /calendar?a_venir=1
- Accounts
  - GET /platforms
- Comments moderation
  - GET /commentaires/en-attente (role-protected)
  - Fallback: GET /posts then GET /posts/{id}/comments
  - PATCH /commentaires/{id}/moderer
  - DELETE /commentaires/{id}
- Create post
  - POST /publications
  - If scheduled: POST /calendrier

## 4) Request format used by frontend

- Authorization header:
  - Bearer {token}
- JSON Content-Type for body requests

## 5) Files implementing integration

- API client:
  - src/lib/api.ts
- Shared types:
  - src/lib/types.ts
- Auth context:
  - src/hooks/use-auth.tsx
- Route guards:
  - src/components/auth/route-guards.tsx
- Data hooks:
  - src/hooks/use-community-data.ts

## 6) Notes

- The frontend now consumes backend data for core CM pages.
- Some advanced analytics widgets remain UI-only placeholders and can be wired in a second pass when dedicated analytics endpoints are available.
