# Integration Plan: Admin ↔ Evaluator

## Current State

**Admin side** (all mock/client-side data):

- **إدارة المقيمين** (`/admin/reviewers`): Lists reviewers with mock data, has "توزيع التقييمات" and "إعادة إسناد" dialogs that show toasts only
- **إدارة الجمعيات** (`/admin/associations`): Lists associations with mock data, shows evaluator name per association but no real assignment logic

**Evaluator side** (connected to database):

- **EvaluatorDashboard** (`/evaluator`): Reads from `evaluator_assignments` table via Supabase, shows KPIs
- **EvaluatorAssignments** (`/evaluator/assignments`): Lists real assignments from DB
- **EvaluationDetails** (`/evaluator/assignment/:id`): Full scoring/messaging flow against real DB tables

**Gap**: The admin pages use hardcoded mock data and toast-only actions. The evaluator pages read from real DB tables (`evaluator_assignments`, `evaluation_criteria`, etc.) but no admin UI writes to them.

---

## Integration Steps

### Step 1: Connect Admin Reviewers to Real Users

- Update **إدارة المقيمين** to fetch actual users who have the `evaluator` role from `user_roles` + `profiles` tables instead of mock data
- Show real assignment counts by querying `evaluator_assignments`
- Keep the add/edit reviewer flow (create user + assign `evaluator` role)

### Step 2: Build Assignment Workflow in Admin

- In **إدارة المقيمين** or **إدارة الجمعيات**, replace the mock "توزيع التقييمات" dialog with a real form that:
  - Lets admin select an association (from profiles with org role) and an evaluator
  - Picks an evaluation year
  - Inserts a row into `evaluator_assignments` table with status `not_started`
- This is the core link: admin creates assignment → evaluator sees it in their dashboard

### Step 3: Connect Admin Associations to Real Data

- Update **إدارة الجمعيات** to read associations from `profiles` (orgs) and their assignment status from `evaluator_assignments`
- The "تغيير المقيم" action would update `evaluator_assignments.evaluator_id`
- The "إيقاف تقييم" action would update `evaluator_assignments.status`

### Step 4: Admin Monitoring

- Admin dashboard KPIs pull from `evaluator_assignments` (total, in-progress, completed)
- Admin can view evaluation progress per association (read from `criterion_evaluations`)

---

## Database Changes Needed

No new tables required. Existing tables support the flow:

```text
Admin creates assignment
        ↓
evaluator_assignments (evaluator_id, association_id, year, status)
        ↓
Evaluator sees it in dashboard, starts scoring
        ↓
criterion_evaluations (scores per criteria)
evaluation_evidences (uploaded files)
evaluation_messages (communication)
```

**RLS**: Admin policies already exist (`has_role(auth.uid(), 'admin')`) for all relevant tables. The admin user just needs the `admin` role in `user_roles`.

**Optional migration**: Add a `profiles` RLS policy so admins can read all profiles (currently users can only read their own). This is needed for the admin to list associations and evaluators.

```sql
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
```

---

## Implementation Order

1. **Add admin RLS policy on profiles** (migration) so admin can query all users
2. **Update AdminReviewers** to fetch real evaluators from DB instead of mock data
3. **Build real assignment creation** dialog (admin picks evaluator + association + year → inserts into `evaluator_assignments`)
4. **Update AdminAssociations** to show real data from DB
5. **Update AdminDashboard** KPIs to pull from real tables

---

## Technical Details


| What               | How                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| Fetch evaluators   | `supabase.from('user_roles').select('user_id').eq('role','evaluator')` then join with `profiles` |
| Fetch associations | `supabase.from('profiles').select('*').not('organization_name','is',null)`                       |
| Create assignment  | `supabase.from('evaluator_assignments').insert({evaluator_id, association_id, year})`            |
| Reassign evaluator | `supabase.from('evaluator_assignments').update({evaluator_id: newId}).eq('id', assignmentId)`    |
| Admin auth guard   | Verify user has `admin` role before rendering admin pages                                        |


Each step can be implemented incrementally. The evaluator side requires zero changes -- it already reads from the correct tables.