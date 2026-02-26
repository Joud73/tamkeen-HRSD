import { useState, useMemo } from "react";
import {
  Users,
  UserPlus,
  Shuffle,
  FileSpreadsheet,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Ban,
  ArrowLeftRight,
  Clock,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatusBadge from "@/components/admin/StatusBadge";

/* ── Types ── */
interface Reviewer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "نشط" | "موقوف";
  assignedCount: number;
  avgDurationDays: number;
  avgScorePercent: number;
  lastActiveDate: string;
}

/* ── Mock data ── */
const initialReviewers: Reviewer[] = [
  { id: "r1", name: "أحمد محمد العتيبي", email: "ahmed@hrsd.gov.sa", phone: "0501234567", status: "نشط", assignedCount: 12, avgDurationDays: 5, avgScorePercent: 85, lastActiveDate: "2026-02-20" },
  { id: "r2", name: "سارة علي القحطاني", email: "sara@hrsd.gov.sa", phone: "0559876543", status: "نشط", assignedCount: 9, avgDurationDays: 4, avgScorePercent: 91, lastActiveDate: "2026-02-18" },
  { id: "r3", name: "خالد عمر الشهري", email: "khaled@hrsd.gov.sa", phone: "0541112233", status: "نشط", assignedCount: 7, avgDurationDays: 6, avgScorePercent: 78, lastActiveDate: "2026-02-15" },
  { id: "r4", name: "نورة سعد المالكي", email: "noura@hrsd.gov.sa", phone: "0533344556", status: "موقوف", assignedCount: 3, avgDurationDays: 8, avgScorePercent: 65, lastActiveDate: "2025-12-10" },
  { id: "r5", name: "فهد ناصر الدوسري", email: "fahad@hrsd.gov.sa", phone: "0567788990", status: "نشط", assignedCount: 15, avgDurationDays: 3, avgScorePercent: 92, lastActiveDate: "2026-02-22" },
  { id: "r6", name: "ليلى أحمد الغامدي", email: "layla@hrsd.gov.sa", phone: "0522334455", status: "نشط", assignedCount: 10, avgDurationDays: 5, avgScorePercent: 88, lastActiveDate: "2026-02-19" },
  { id: "r7", name: "عبدالله سالم الحربي", email: "abdullah@hrsd.gov.sa", phone: "0511223344", status: "نشط", assignedCount: 8, avgDurationDays: 7, avgScorePercent: 74, lastActiveDate: "2026-02-14" },
  { id: "r8", name: "هند خالد الزهراني", email: "hind@hrsd.gov.sa", phone: "0544556677", status: "موقوف", assignedCount: 2, avgDurationDays: 10, avgScorePercent: 60, lastActiveDate: "2025-11-25" },
  { id: "r9", name: "محمد سعيد العنزي", email: "mohameds@hrsd.gov.sa", phone: "0577889900", status: "نشط", assignedCount: 11, avgDurationDays: 4, avgScorePercent: 82, lastActiveDate: "2026-02-21" },
  { id: "r10", name: "ريم عمر السبيعي", email: "reem@hrsd.gov.sa", phone: "0588990011", status: "نشط", assignedCount: 6, avgDurationDays: 5, avgScorePercent: 87, lastActiveDate: "2026-02-17" },
  { id: "r11", name: "ياسر عبدالرحمن", email: "yaser@hrsd.gov.sa", phone: "0512345678", status: "نشط", assignedCount: 14, avgDurationDays: 3, avgScorePercent: 90, lastActiveDate: "2026-02-23" },
  { id: "r12", name: "منى حسن البقمي", email: "mona@hrsd.gov.sa", phone: "0598765432", status: "نشط", assignedCount: 5, avgDurationDays: 6, avgScorePercent: 76, lastActiveDate: "2026-02-16" },
];

const emptyForm = { name: "", email: "", phone: "", status: "نشط" as "نشط" | "موقوف" };

/* ── Component ── */
const AdminReviewers = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [reviewers, setReviewers] = useState<Reviewer[]>(initialReviewers);
  const [year, setYear] = useState<string>("2026");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Dialogs
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Reviewer | null>(null);
  const [toggleTarget, setToggleTarget] = useState<Reviewer | null>(null);
  const [distOpen, setDistOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [distCount, setDistCount] = useState("5");
  const [distReviewer, setDistReviewer] = useState("");
  const [distAuto, setDistAuto] = useState(false);
  const [reassignEval, setReassignEval] = useState("");
  const [reassignTo, setReassignTo] = useState("");

  const filtered = useMemo(() => {
    return reviewers.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (search && !r.name.includes(search) && !r.email.includes(search)) return false;
      return true;
    });
  }, [reviewers, statusFilter, search]);

  const totalReviewers = filtered.length;
  const activeReviewers = filtered.filter((r) => r.status === "نشط").length;
  const avgDuration = totalReviewers > 0 ? Math.round(filtered.reduce((s, r) => s + r.avgDurationDays, 0) / totalReviewers) : 0;
  const avgScore = totalReviewers > 0 ? Math.round(filtered.reduce((s, r) => s + r.avgScorePercent, 0) / totalReviewers) : 0;

  const comingSoon = () => toast({ title: "قريبًا", description: "سيتم توفير هذه الميزة لاحقًا" });

  const openAdd = () => { setForm(emptyForm); setAddOpen(true); };
  const openEdit = (r: Reviewer) => { setForm({ name: r.name, email: r.email, phone: r.phone, status: r.status }); setEditTarget(r); };

  const saveAdd = () => {
    if (!form.name || !form.email) return;
    const newR: Reviewer = {
      id: `r${Date.now()}`, name: form.name, email: form.email, phone: form.phone,
      status: form.status, assignedCount: 0, avgDurationDays: 0, avgScorePercent: 0,
      lastActiveDate: new Date().toISOString().slice(0, 10),
    };
    setReviewers((prev) => [newR, ...prev]);
    setAddOpen(false);
    toast({ title: "تمت الإضافة (تجريبيًا)" });
  };

  const saveEdit = () => {
    if (!editTarget) return;
    setReviewers((prev) => prev.map((r) => r.id === editTarget.id ? { ...r, name: form.name, email: form.email, phone: form.phone, status: form.status } : r));
    setEditTarget(null);
    toast({ title: "تم التعديل (تجريبيًا)" });
  };

  const confirmToggle = () => {
    if (!toggleTarget) return;
    setReviewers((prev) => prev.map((r) => r.id === toggleTarget.id ? { ...r, status: r.status === "نشط" ? "موقوف" : "نشط" } : r));
    setToggleTarget(null);
    toast({ title: "تم التحديث (تجريبيًا)" });
  };

  const saveDist = () => { setDistOpen(false); toast({ title: "تمت العملية (تجريبيًا)" }); };
  const saveReassign = () => { setReassignOpen(false); toast({ title: "تمت العملية (تجريبيًا)" }); };

  /* ── Form dialog shared content ── */
  const formFields = (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label className="font-hrsd-medium text-sm">الاسم</Label>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="font-hrsd text-sm" />
      </div>
      <div className="space-y-2">
        <Label className="font-hrsd-medium text-sm">البريد الإلكتروني</Label>
        <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="font-hrsd text-sm" type="email" />
      </div>
      <div className="space-y-2">
        <Label className="font-hrsd-medium text-sm">رقم الجوال</Label>
        <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="font-hrsd text-sm" />
      </div>
      <div className="space-y-2">
        <Label className="font-hrsd-medium text-sm">الحالة</Label>
        <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as "نشط" | "موقوف" })}>
          <SelectTrigger className="font-hrsd text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="نشط">نشط</SelectItem>
            <SelectItem value="موقوف">موقوف</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-[hsl(220,20%,97%)]">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-7">
          {/* Title */}
          <div>
            <h1 className="text-xl font-hrsd-title text-foreground">إدارة المقيمين</h1>
            <p className="text-sm font-hrsd text-muted-foreground mt-1">متابعة أداء المقيمين وتوزيع التقييمات بكفاءة</p>
          </div>

          {/* Filters + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-32 text-sm font-hrsd-medium"><SelectValue placeholder="السنة" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 text-sm font-hrsd-medium"><SelectValue placeholder="الحالة" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="موقوف">موقوف</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="ابحث عن مقيم..." value={search} onChange={(e) => setSearch(e.target.value)} className="ps-9 w-52 text-sm font-hrsd" />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" className="gap-2 text-xs font-hrsd-medium h-9" onClick={openAdd}>
                إضافة مقيم <UserPlus className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-xs font-hrsd-medium h-9" onClick={() => setDistOpen(true)}>
                توزيع التقييمات <Shuffle className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-xs font-hrsd-medium h-9" onClick={comingSoon}>
                تصدير Excel <FileSpreadsheet className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "إجمالي المقيمين", value: totalReviewers, icon: Users },
              { label: "المقيمون النشطون", value: activeReviewers, icon: UserCheck },
              { label: "متوسط مدة التقييم", value: `${avgDuration} يوم`, icon: Clock },
              { label: "متوسط الدرجات", value: `${avgScore}%`, icon: TrendingUp },
            ].map((kpi) => (
              <div key={kpi.label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <kpi.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs font-hrsd text-muted-foreground">{kpi.label}</p>
                  <p className="text-base font-hrsd-bold text-foreground">{kpi.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-hrsd-semibold text-foreground">قائمة المقيمين</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  {["اسم المقيم", "البريد الإلكتروني", "الحالة", "عدد التقييمات", "متوسط المدة", "متوسط الدرجات", "آخر نشاط", "الإجراءات"].map((h) => (
                    <TableHead key={h} className="text-start font-hrsd-medium text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="text-sm font-hrsd">
                    <TableCell className="font-hrsd-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">{r.email}</TableCell>
                    <TableCell><StatusBadge status={r.status === "نشط" ? "مكتمل" : "لم تبدأ"} /><span className="sr-only">{r.status}</span></TableCell>
                    <TableCell>{r.assignedCount}</TableCell>
                    <TableCell>{r.avgDurationDays} يوم</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-10">{r.avgScorePercent}%</span>
                        <Progress value={r.avgScorePercent} className="h-1.5 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>{r.lastActiveDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 font-hrsd text-sm">
                          <DropdownMenuItem className="gap-2" onClick={() => navigate(`/admin/reviewers/${r.id}`)}>
                            <Eye className="h-4 w-4" /> عرض أداء المقيم
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => openEdit(r)}>
                            <Pencil className="h-4 w-4" /> تعديل بيانات مقيم
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => setToggleTarget(r)}>
                            <Ban className="h-4 w-4" /> {r.status === "نشط" ? "إيقاف مقيم" : "تفعيل مقيم"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => setDistOpen(true)}>
                            <Shuffle className="h-4 w-4" /> توزيع التقييمات
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => setReassignOpen(true)}>
                            <ArrowLeftRight className="h-4 w-4" /> إعادة إسناد تقييم
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* ── Add Dialog ── */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent dir="rtl" className="sm:max-w-md font-hrsd">
          <DialogHeader><DialogTitle className="font-hrsd-semibold">إضافة مقيم</DialogTitle></DialogHeader>
          {formFields}
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild><Button variant="outline" className="font-hrsd-medium text-sm">إلغاء</Button></DialogClose>
            <Button className="font-hrsd-medium text-sm" onClick={saveAdd}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ── */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent dir="rtl" className="sm:max-w-md font-hrsd">
          <DialogHeader><DialogTitle className="font-hrsd-semibold">تعديل بيانات مقيم</DialogTitle></DialogHeader>
          {formFields}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="font-hrsd-medium text-sm" onClick={() => setEditTarget(null)}>إلغاء</Button>
            <Button className="font-hrsd-medium text-sm" onClick={saveEdit}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Toggle Alert ── */}
      <AlertDialog open={!!toggleTarget} onOpenChange={(o) => !o && setToggleTarget(null)}>
        <AlertDialogContent dir="rtl" className="font-hrsd">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-hrsd-semibold">
              {toggleTarget?.status === "نشط" ? "إيقاف المقيم" : "تفعيل المقيم"}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-hrsd text-sm">
              هل أنت متأكد من {toggleTarget?.status === "نشط" ? "إيقاف" : "تفعيل"} المقيم "{toggleTarget?.name}"؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-hrsd-medium">إلغاء</AlertDialogCancel>
            <AlertDialogAction className="font-hrsd-medium" onClick={confirmToggle}>تأكيد</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Distribution Dialog ── */}
      <Dialog open={distOpen} onOpenChange={setDistOpen}>
        <DialogContent dir="rtl" className="sm:max-w-md font-hrsd">
          <DialogHeader><DialogTitle className="font-hrsd-semibold">توزيع التقييمات</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="font-hrsd-medium text-sm">المقيم</Label>
              <Select value={distReviewer} onValueChange={setDistReviewer}>
                <SelectTrigger className="font-hrsd text-sm"><SelectValue placeholder="اختر مقيمًا" /></SelectTrigger>
                <SelectContent>
                  {reviewers.filter((r) => r.status === "نشط").map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-hrsd-medium text-sm">عدد التقييمات</Label>
              <Input type="number" value={distCount} onChange={(e) => setDistCount(e.target.value)} className="font-hrsd text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="auto" checked={distAuto} onCheckedChange={(v) => setDistAuto(!!v)} />
              <Label htmlFor="auto" className="font-hrsd text-sm cursor-pointer">توزيع تلقائي بالتساوي</Label>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild><Button variant="outline" className="font-hrsd-medium text-sm">إلغاء</Button></DialogClose>
            <Button className="font-hrsd-medium text-sm" onClick={saveDist}>تنفيذ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Reassign Dialog ── */}
      <Dialog open={reassignOpen} onOpenChange={setReassignOpen}>
        <DialogContent dir="rtl" className="sm:max-w-md font-hrsd">
          <DialogHeader><DialogTitle className="font-hrsd-semibold">إعادة إسناد تقييم</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="font-hrsd-medium text-sm">التقييم</Label>
              <Select value={reassignEval} onValueChange={setReassignEval}>
                <SelectTrigger className="font-hrsd text-sm"><SelectValue placeholder="اختر تقييمًا" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="e1">جمعية البر الخيرية - 2026</SelectItem>
                  <SelectItem value="e2">جمعية إنسان - 2026</SelectItem>
                  <SelectItem value="e3">جمعية تكافل - 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-hrsd-medium text-sm">المقيم الجديد</Label>
              <Select value={reassignTo} onValueChange={setReassignTo}>
                <SelectTrigger className="font-hrsd text-sm"><SelectValue placeholder="اختر مقيمًا" /></SelectTrigger>
                <SelectContent>
                  {reviewers.filter((r) => r.status === "نشط").map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild><Button variant="outline" className="font-hrsd-medium text-sm">إلغاء</Button></DialogClose>
            <Button className="font-hrsd-medium text-sm" onClick={saveReassign}>تنفيذ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReviewers;
