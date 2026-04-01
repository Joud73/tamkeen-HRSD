

## Fix: Clean up legacy "user" fallback in useAdminData.ts

**File:** `src/hooks/useAdminData.ts`, lines 216-217

**Change:** Replace the `"user"` fallback string with a neutral value:
- Line 216: `role: roleMap[p.id] || "—"` 
- Line 217: `roleAr: roleArMap[roleMap[p.id]] || "غير محدد"`

This ensures users without a role record display "غير محدد" instead of the deprecated "user" / "أفراد" label.

