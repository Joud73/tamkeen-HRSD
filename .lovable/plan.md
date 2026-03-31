

# خطة: ربط إدارة المستخدمين بالبيانات الحقيقية

## ملخص
تحويل صفحة "إدارة المستخدمين" من البيانات التجريبية إلى بيانات حقيقية، مع إمكانية إنشاء حسابات جديدة يستطيع أصحابها تسجيل الدخول بكلمة مرور افتراضية `Aa123456`.

## المشكلة
إنشاء مستخدم جديد يتطلب `supabase.auth.admin.createUser()` الذي يحتاج `service_role_key` — وهذا المفتاح سري ولا يمكن استخدامه من المتصفح. الحل: إنشاء Edge Function تعمل بصلاحيات الخادم.

## خطوات التنفيذ

### 1. إنشاء Edge Function: `create-user`
**ملف جديد:** `supabase/functions/create-user/index.ts`

- تستقبل: `email`, `role` (admin / evaluator / user), `organization_name` (اختياري)
- تتحقق أن الطالب لديه دور `admin` عبر JWT
- تنفذ:
  1. إنشاء مستخدم في Auth بكلمة مرور `Aa123456` مع تأكيد الإيميل تلقائيًا
  2. إدراج صف في `profiles` (email, organization_name, status: active)
  3. إدراج صف في `user_roles` (user_id, role)
- ترجع بيانات المستخدم الجديد

### 2. إضافة سياسة RLS على profiles للتعديل
**Migration:** السياسة الحالية تسمح للـ admin بالـ SELECT فقط. نحتاج إضافة UPDATE حتى يتمكن المدير من تعديل حالة المستخدمين.

```sql
CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
```

### 3. إضافة `useAdminUsers` hook
**تعديل:** `src/hooks/useAdminData.ts`

- جلب جميع `profiles` + أدوارهم من `user_roles`
- بناء قائمة: id, email, organization_name, role (عربي), status, created_at

### 4. تحديث `AdminUsers.tsx`
**تعديل:** `src/pages/AdminUsers.tsx`

- استبدال البيانات التجريبية بـ `useAdminUsers()`
- عند "إنشاء مستخدم جديد": استدعاء Edge Function `create-user`
- عند "تعديل": تحديث `profiles` مباشرة عبر Supabase SDK
- عند "تعطيل/تفعيل": تحديث `profiles.status`
- عند "إعادة تعيين كلمة المرور": استخدام `resetPasswordForEmail`
- KPIs تعتمد على البيانات الحقيقية

## التفاصيل التقنية

```text
Client (AdminUsers.tsx)
  │
  ├─ GET: useAdminUsers() → profiles + user_roles (Supabase SDK)
  │
  ├─ CREATE: supabase.functions.invoke('create-user', { email, role, ... })
  │           → Edge Function uses service_role to create auth user + profile + role
  │
  ├─ UPDATE: supabase.from('profiles').update({...}).eq('id', userId)
  │
  └─ TOGGLE STATUS: supabase.from('profiles').update({ status }).eq('id', userId)
```

### الأدوار المدعومة
| دور عربي | قيمة قاعدة البيانات |
|----------|---------------------|
| مدير النظام | admin |
| مقيم | evaluator |
| أفراد | user |

> ملاحظة: `app_role` enum يحتوي على `admin`, `evaluator`, `user` فقط. دور "مفوض الجمعية" غير موجود حاليًا في الـ enum — سيتم التعامل معه كـ `user` مع وجود `organization_name`.

### ملفات سيتم إنشاؤها/تعديلها

| ملف | عملية |
|-----|-------|
| `supabase/functions/create-user/index.ts` | إنشاء |
| `src/hooks/useAdminData.ts` | إضافة `useAdminUsers` |
| `src/pages/AdminUsers.tsx` | تحديث كامل |
| Migration (RLS update) | إنشاء |

