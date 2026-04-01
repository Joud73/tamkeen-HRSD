

# Phase 1: Role System, Route Protection, Login Redirect

## Scope
Only roles, route protection, and login redirect. No UI redesign, no workflow changes.

## Changes

### 1. Database Migration — Expand `app_role` enum
```sql
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'organization';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'individual';
```
The old `user` value stays in the enum (Postgres cannot remove enum values) but will not be used in new code.

**Manual cleanup needed after migration:**
```sql
-- Inspect existing 'user' role records
SELECT ur.user_id, ur.role, p.email, p.organization_name
FROM user_roles ur JOIN profiles p ON p.id = ur.user_id
WHERE ur.role = 'user';

-- Then manually update each based on context:
-- If they have organization_name → UPDATE SET role = 'organization'
-- If they are individuals → UPDATE SET role = 'individual'
-- This CANNOT be safely auto-mapped because some may be ambiguous.
```

### 2. New File: `src/lib/roles.ts` — Centralized role helper
- Export `AppRole` type: `"admin" | "evaluator" | "organization" | "individual"`
- Export `roleDefaultRoute` map:
  - `admin` → `/admin`
  - `evaluator` → `/evaluator`
  - `organization` → `/dashboard`
  - `individual` → `/individuals-journey`
- Export `getDefaultRouteForRole(role: AppRole | null): string` — returns route or `/login` fallback
- Export `fetchUserRole(userId: string): Promise<AppRole | null>` — queries `user_roles` table

### 3. Edit: `src/context/AuthContext.tsx`
- Import `AppRole`, `fetchUserRole` from `roles.ts`
- Add `userRole: AppRole | null` to context state and interface
- Fetch role alongside `profileStatus` in `initAuth` and `onAuthStateChange`
- **Fix `signUp`**: after inserting profile, also insert into `user_roles` with role `"organization"` (the registration flow is for organizations only)
- Clear `userRole` on sign out

### 4. Edit: `src/components/ProtectedRoute.tsx`
- Accept optional `allowedRoles?: AppRole[]` prop
- Read `userRole` and `loading` from `useAuth()`
- If not authenticated → redirect to `/login`
- If `allowedRoles` specified and user's role not in list → redirect to `getDefaultRouteForRole(userRole)` (sends them to their correct area)
- If role is still loading, show spinner
- If authenticated but no role exists at all → show "no access" fallback

### 5. Edit: `src/App.tsx` — Apply role-based protection
| Routes | `allowedRoles` |
|--------|---------------|
| `/dashboard`, `/settings`, `/training-stage`, `/course/:id`, `/under-review`, `/certificate/:id`, `/technical-indicators/:slug` | `["organization"]` |
| `/evaluator`, `/evaluator/assignments`, `/evaluator/assignment/:id` | `["evaluator"]` |
| `/admin`, `/admin/*` (all admin routes) | `["admin"]` |
| `/individuals-journey`, `/individual-course/:id` | remain public (no change) |
| `/contact-us` | remain public |

### 6. Edit: `src/pages/LoginLocal.tsx` — Role-based redirect
- After successful `signIn`, call `fetchUserRole(user.id)` to get role
- Use `getDefaultRouteForRole(role)` instead of hardcoded `/dashboard`

### 7. Skip: `src/pages/NafathAuth.tsx`
NafathAuth is a mock flow with no real Supabase session — no role lookup is possible. Leave as-is.

### 8. Edit: `src/hooks/useAdminData.ts` — Minimal type update
- Update `roleArMap` to include `organization: "جمعية"` and `individual: "أفراد"`
- No query logic changes

### 9. Edit: `src/pages/AdminUsers.tsx` — Minimal type update
- Update `DbRole` type to `"admin" | "evaluator" | "organization" | "individual"`
- Update role dropdown options to match

### 10. Edit: `supabase/functions/create-user/index.ts`
- Update `validRoles` to `["admin", "evaluator", "organization", "individual"]`

## Files Summary

| File | Action |
|------|--------|
| Migration SQL | Add `organization`, `individual` to enum |
| `src/lib/roles.ts` | **New** — role types + route map + fetch helper |
| `src/context/AuthContext.tsx` | Add `userRole`, fix `signUp` to insert role |
| `src/components/ProtectedRoute.tsx` | Add `allowedRoles` check |
| `src/App.tsx` | Apply `allowedRoles` per route group |
| `src/pages/LoginLocal.tsx` | Role-based redirect |
| `src/hooks/useAdminData.ts` | Add role labels only |
| `src/pages/AdminUsers.tsx` | Update role type + options |
| `supabase/functions/create-user/index.ts` | Update valid roles |

## Not Changed
- `NafathAuth.tsx` (mock flow, no real session)
- `useAdminAssociations` query logic
- Page layouts, styles, dashboards
- Registration approval workflow
- Evaluator assignment workflow
- Individual journey pages remain public

