import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import KpiCard from "@/components/admin/KpiCard";
import StatusBadge from "@/components/admin/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Search, Plus, FileDown, MoreHorizontal, Users, UserCheck, UserX,
  Pencil, Ban, CheckCircle2, Trash2, KeyRound,
} from "lucide-react";

/* ── types ── */
type UserRole = "مدير النظام" | "مقيم" | "مفوض الجمعية" | "أفراد";
type UserStatus = "نشط" | "معطل";

interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  entity: string;
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
}

/* ── mock data ── */
const roles: UserRole[] = ["مدير النظام", "مقيم", "مفوض الجمعية", "أفراد"];

const initialUsers: AppUser[] = [
  { id: "u1", name: "عبدالله المطيري", email: "a.mutairi@hrsd.gov.sa", phone: "0551234567", role: "مدير النظام", entity: "—", status: "نشط", createdAt: "2025-01-10", lastLogin: "2026-02-25" },
  { id: "u2", name: "نورة الشمري", email: "n.shamri@hrsd.gov.sa", phone: "0559876543", role: "مدير النظام", entity: "—", status: "نشط", createdAt: "2025-02-01", lastLogin: "2026-02-24" },
  { id: "u3", name: "فهد العتيبي", email: "f.otaibi@eval.sa", phone: "0541112233", role: "مقيم", entity: "—", status: "نشط", createdAt: "2025-03-15", lastLogin: "2026-02-20" },
  { id: "u4", name: "سارة القحطاني", email: "s.qahtani@eval.sa", phone: "0547778899", role: "مقيم", entity: "—", status: "نشط", createdAt: "2025-04-01", lastLogin: "2026-02-18" },
  { id: "u5", name: "خالد الدوسري", email: "k.dosari@eval.sa", phone: "0533334444", role: "مقيم", entity: "—", status: "معطل", createdAt: "2025-05-20", lastLogin: "2025-12-10" },
  { id: "u6", name: "منى الحربي", email: "m.harbi@jam1.org", phone: "0562223344", role: "مفوض الجمعية", entity: "جمعية البر بالرياض", status: "نشط", createdAt: "2025-06-01", lastLogin: "2026-02-22" },
  { id: "u7", name: "أحمد الزهراني", email: "a.zahrani@jam2.org", phone: "0571112233", role: "مفوض الجمعية", entity: "جمعية إنسان", status: "نشط", createdAt: "2025-06-15", lastLogin: "2026-02-21" },
  { id: "u8", name: "هند السبيعي", email: "h.subai@jam3.org", phone: "0589998877", role: "مفوض الجمعية", entity: "جمعية نماء الأهلية", status: "معطل", createdAt: "2025-07-01", lastLogin: "2025-11-05" },
  { id: "u9", name: "عمر الغامدي", email: "o.ghamdi@jam4.org", phone: "0506665544", role: "مفوض الجمعية", entity: "جمعية بناء لرعاية الأيتام", status: "نشط", createdAt: "2025-08-10", lastLogin: "2026-01-30" },
  { id: "u10", name: "ريم العنزي", email: "r.anazi@ind.sa", phone: "0521114455", role: "أفراد", entity: "فرد مستقل", status: "نشط", createdAt: "2025-09-01", lastLogin: "2026-02-23" },
  { id: "u11", name: "سلطان الشهري", email: "s.shahri@ind.sa", phone: "0534447788", role: "أفراد", entity: "فرد مستقل", status: "نشط", createdAt: "2025-09-15", lastLogin: "2026-02-19" },
  { id: "u12", name: "لمياء الرشيدي", email: "l.rashidi@ind.sa", phone: "0567773322", role: "أفراد", entity: "فرد مستقل", status: "معطل", createdAt: "2025-10-01", lastLogin: "2025-10-20" },
  { id: "u13", name: "ماجد القرني", email: "m.qarni@eval.sa", phone: "0543332211", role: "مقيم", entity: "—", status: "نشط", createdAt: "2025-10-15", lastLogin: "2026-02-15" },
  { id: "u14", name: "عائشة البلوي", email: "a.balawi@jam5.org", phone: "0558889900", role: "مفوض الجمعية", entity: "جمعية عناية الصحية", status: "نشط", createdAt: "2025-11-01", lastLogin: "2026-02-10" },
  { id: "u15", name: "يوسف المالكي", email: "y.malki@ind.sa", phone: "0512224466", role: "أفراد", entity: "فرد مستقل", status: "نشط", createdAt: "2025-11-20", lastLogin: "2026-02-14" },
];

const emptyForm = {
  name: "", email: "", phone: "", role: "مقيم" as UserRole, entity: "", status: "نشط" as UserStatus,
};

/* ── component ── */
const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AppUser[]>(initialUsers);

  /* filters */
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");

  /* dialogs */
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<AppUser | null>(null);
  const [formFields, setFormFields] = useState(emptyForm);

  const [toggleTarget, setToggleTarget] = useState<AppUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AppUser | null>(null);
  const [resetTarget, setResetTarget] = useState<AppUser | null>(null);

  /* filtered list */
  const filtered = useMemo(() =>
    users.filter((u) => {
      if (roleFilter !== "الكل" && u.role !== roleFilter) return false;
      if (statusFilter !== "الكل" && u.status !== statusFilter) return false;
      if (search && !u.name.includes(search) && !u.email.includes(search)) return false;
      return true;
    }), [users, roleFilter, statusFilter, search]);

  /* KPIs */
  const total = users.length;
  const active = users.filter((u) => u.status === "نشط").length;
  const disabled = users.filter((u) => u.status === "معطل").length;

  /* helpers */
  const openAdd = () => { setEditTarget(null); setFormFields(emptyForm); setFormOpen(true); };
  const openEdit = (u: AppUser) => {
    setEditTarget(u);
    setFormFields({ name: u.name, email: u.email, phone: u.phone, role: u.role, entity: u.entity === "—" ? "" : u.entity, status: u.status });
    setFormOpen(true);
  };

  const saveForm = () => {
    if (!formFields.name || !formFields.email) {
      toast({ title: "يرجى تعبئة الحقول المطلوبة", variant: "destructive" }); return;
    }
    if (editTarget) {
      setUsers((prev) => prev.map((u) => u.id === editTarget.id ? {
        ...u, name: formFields.name, email: formFields.email, phone: formFields.phone,
        role: formFields.role, entity: (formFields.role === "مفوض الجمعية" || formFields.role === "أفراد") ? (formFields.entity || "—") : "—",
        status: formFields.status,
      } : u));
      toast({ title: "تم تحديث بيانات المستخدم (تجريبيًا)" });
    } else {
      const newUser: AppUser = {
        id: `u${Date.now()}`, name: formFields.name, email: formFields.email, phone: formFields.phone,
        role: formFields.role, entity: (formFields.role === "مفوض الجمعية" || formFields.role === "أفراد") ? (formFields.entity || "—") : "—",
        status: formFields.status, createdAt: new Date().toISOString().slice(0, 10), lastLogin: "—",
      };
      setUsers((prev) => [newUser, ...prev]);
      toast({ title: "تم إنشاء المستخدم (تجريبيًا)" });
    }
    setFormOpen(false);
  };

  const confirmToggle = () => {
    if (!toggleTarget) return;
    setUsers((prev) => prev.map((u) => u.id === toggleTarget.id ? { ...u, status: u.status === "نشط" ? "معطل" : "نشط" } : u));
    toast({ title: toggleTarget.status === "نشط" ? "تم تعطيل المستخدم (تجريبيًا)" : "تم تفعيل المستخدم (تجريبيًا)" });
    setToggleTarget(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    toast({ title: "تم حذف المستخدم (تجريبيًا)" });
    setDeleteTarget(null);
  };

  const confirmReset = () => {
    toast({ title: "تم إرسال رابط إعادة التعيين (تجريبيًا)" });
    setResetTarget(null);
  };

  const needsEntity = formFields.role === "مفوض الجمعية" || formFields.role === "أفراد";

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: "hsl(220,20%,97%)" }}>
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-6">
          {/* header */}
          <div>
            <h1 className="text-2xl font-hrsd-bold text-foreground">إدارة المستخدمين</h1>
            <p className="text-sm text-muted-foreground font-hrsd mt-1">إضافة المستخدمين وإدارة بياناتهم وصلاحياتهم</p>
          </div>

          {/* toolbar */}
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="ابحث بالاسم أو البريد..." className="pr-9 w-56 text-sm font-hrsd" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40 text-sm font-hrsd"><SelectValue /></SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="الكل">الدور: الكل</SelectItem>
                  {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 text-sm font-hrsd"><SelectValue /></SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="الكل">الحالة: الكل</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="معطل">معطل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 font-hrsd-medium" onClick={() => toast({ title: "سيتم توفير هذه الميزة لاحقًا" })}>
                تصدير Excel <FileDown className="h-4 w-4" />
              </Button>
              <Button size="sm" className="gap-2 font-hrsd-medium" onClick={openAdd}>
                إنشاء مستخدم جديد <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <KpiCard title="إجمالي المستخدمين" value={total} icon={<Users className="h-5 w-5" />} />
            <KpiCard title="المستخدمون النشطون" value={active} icon={<UserCheck className="h-5 w-5" />} />
            <KpiCard title="المستخدمون المعطلون" value={disabled} icon={<UserX className="h-5 w-5" />} />
          </div>

          {/* table */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base font-hrsd-semibold">قائمة المستخدمين</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {["الاسم", "البريد الإلكتروني", "الدور", "الجهة / الجمعية", "الحالة", "تاريخ الإنشاء", "آخر دخول", "الإجراءات"].map((h) => (
                      <TableHead key={h} className="text-right text-xs font-hrsd-medium whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={8} className="text-center py-10 text-muted-foreground font-hrsd">لا توجد نتائج</TableCell></TableRow>
                  )}
                  {filtered.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-hrsd-medium text-sm whitespace-nowrap">{u.name}</TableCell>
                      <TableCell className="text-sm font-hrsd ltr text-right" dir="ltr">{u.email}</TableCell>
                      <TableCell className="text-sm font-hrsd">{u.role}</TableCell>
                      <TableCell className="text-sm font-hrsd text-muted-foreground">{u.entity}</TableCell>
                      <TableCell><StatusBadge status={u.status === "نشط" ? "مكتمل" : "لم تبدأ"} /><span className="sr-only">{u.status}</span></TableCell>
                      <TableCell className="text-sm font-hrsd text-muted-foreground whitespace-nowrap">{u.createdAt}</TableCell>
                      <TableCell className="text-sm font-hrsd text-muted-foreground whitespace-nowrap">{u.lastLogin}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="font-hrsd text-sm min-w-[180px]">
                            <DropdownMenuItem className="gap-2" onClick={() => openEdit(u)}><Pencil className="h-3.5 w-3.5" /> تعديل البيانات</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => setToggleTarget(u)}>
                              {u.status === "نشط" ? <><Ban className="h-3.5 w-3.5" /> تعطيل المستخدم</> : <><CheckCircle2 className="h-3.5 w-3.5" /> تفعيل المستخدم</>}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => setDeleteTarget(u)}><Trash2 className="h-3.5 w-3.5" /> حذف المستخدم</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => setResetTarget(u)}><KeyRound className="h-3.5 w-3.5" /> إعادة تعيين كلمة المرور</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* ── Create / Edit Dialog ── */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg font-hrsd" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-hrsd-bold">{editTarget ? "تعديل بيانات المستخدم" : "إنشاء مستخدم جديد"}</DialogTitle>
            <DialogDescription>{editTarget ? "قم بتعديل البيانات ثم اضغط حفظ" : "أدخل بيانات المستخدم الجديد"}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label className="font-hrsd-medium text-sm">الاسم الكامل *</Label>
              <Input className="font-hrsd text-sm" value={formFields.name} onChange={(e) => setFormFields((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="grid gap-1.5">
              <Label className="font-hrsd-medium text-sm">البريد الإلكتروني *</Label>
              <Input className="font-hrsd text-sm" type="email" dir="ltr" value={formFields.email} onChange={(e) => setFormFields((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="grid gap-1.5">
              <Label className="font-hrsd-medium text-sm">رقم الجوال</Label>
              <Input className="font-hrsd text-sm" dir="ltr" value={formFields.phone} onChange={(e) => setFormFields((p) => ({ ...p, phone: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label className="font-hrsd-medium text-sm">الدور</Label>
                <Select value={formFields.role} onValueChange={(v) => setFormFields((p) => ({ ...p, role: v as UserRole }))}>
                  <SelectTrigger className="font-hrsd text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent align="end">{roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="font-hrsd-medium text-sm">الحالة</Label>
                <Select value={formFields.status} onValueChange={(v) => setFormFields((p) => ({ ...p, status: v as UserStatus }))}>
                  <SelectTrigger className="font-hrsd text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="نشط">نشط</SelectItem>
                    <SelectItem value="معطل">معطل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {needsEntity && (
              <div className="grid gap-1.5">
                <Label className="font-hrsd-medium text-sm">الجهة / الجمعية</Label>
                <Input className="font-hrsd text-sm" value={formFields.entity} onChange={(e) => setFormFields((p) => ({ ...p, entity: e.target.value }))} />
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setFormOpen(false)} className="font-hrsd-medium">إلغاء</Button>
            <Button onClick={saveForm} className="font-hrsd-medium">حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Toggle AlertDialog ── */}
      <AlertDialog open={!!toggleTarget} onOpenChange={() => setToggleTarget(null)}>
        <AlertDialogContent dir="rtl" className="font-hrsd">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-hrsd-bold">{toggleTarget?.status === "نشط" ? "تعطيل المستخدم" : "تفعيل المستخدم"}</AlertDialogTitle>
            <AlertDialogDescription>{toggleTarget?.status === "نشط" ? "هل أنت متأكد من تعطيل المستخدم؟" : "هل تريد تفعيل المستخدم؟"}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="font-hrsd-medium">إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle} className="font-hrsd-medium">تأكيد</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Delete AlertDialog ── */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent dir="rtl" className="font-hrsd">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-hrsd-bold">حذف المستخدم</AlertDialogTitle>
            <AlertDialogDescription>سيتم حذف المستخدم نهائيًا. هل تريد المتابعة؟</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="font-hrsd-medium">إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-hrsd-medium">حذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Reset Password Dialog ── */}
      <Dialog open={!!resetTarget} onOpenChange={() => setResetTarget(null)}>
        <DialogContent className="sm:max-w-md font-hrsd" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-hrsd-bold">إعادة تعيين كلمة المرور</DialogTitle>
            <DialogDescription>سيتم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني.</DialogDescription>
          </DialogHeader>
          <p className="text-sm font-hrsd-medium py-2">{resetTarget?.email}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setResetTarget(null)} className="font-hrsd-medium">إلغاء</Button>
            <Button onClick={confirmReset} className="font-hrsd-medium">إرسال الرابط</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
