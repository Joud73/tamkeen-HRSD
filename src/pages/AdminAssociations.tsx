import { useState, useMemo } from "react";
import {
  Building2,
  ClipboardList,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
  MoreHorizontal,
  Eye,
  FolderOpen,
  RotateCcw,
  UserCog,
  PauseCircle,
  Archive,
  Download,
  History,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatusBadge from "@/components/admin/StatusBadge";

/* ── Types ── */
interface AssociationRow {
  id: string;
  name: string;
  type: "جمعية" | "مؤسسة";
  year: number;
  progress: number;
  status: string;
  evaluator: string;
  date: string;
  score: number | null;
}

/* ── Mock data ── */
const rows2026: AssociationRow[] = [
  { id: "a1", name: "جمعية البر الخيرية", type: "جمعية", year: 2026, progress: 60, status: "قيد التقييم", evaluator: "أحمد محمد", date: "2026-01-15", score: 72 },
  { id: "a2", name: "جمعية إنسان", type: "جمعية", year: 2026, progress: 100, status: "تسليم كامل", evaluator: "سارة علي", date: "2026-01-12", score: 91 },
  { id: "a3", name: "جمعية تكافل", type: "جمعية", year: 2026, progress: 45, status: "تسليم جزئي", evaluator: "خالد عمر", date: "2026-01-10", score: 55 },
  { id: "a4", name: "مؤسسة العطاء", type: "مؤسسة", year: 2026, progress: 0, status: "لم تبدأ", evaluator: "نورة سعد", date: "2026-01-08", score: null },
  { id: "a5", name: "جمعية رعاية", type: "جمعية", year: 2026, progress: 35, status: "قيد التقييم", evaluator: "فهد ناصر", date: "2026-01-05", score: 40 },
  { id: "a6", name: "مؤسسة الأمل", type: "مؤسسة", year: 2026, progress: 80, status: "تسليم جزئي", evaluator: "ليلى أحمد", date: "2026-01-20", score: 78 },
  { id: "a7", name: "جمعية الوفاء", type: "جمعية", year: 2026, progress: 100, status: "تسليم كامل", evaluator: "عبدالله سالم", date: "2026-02-01", score: 88 },
  { id: "a8", name: "جمعية نماء", type: "جمعية", year: 2026, progress: 20, status: "قيد التقييم", evaluator: "هند خالد", date: "2026-02-05", score: 25 },
  { id: "a9", name: "مؤسسة بناء", type: "مؤسسة", year: 2026, progress: 0, status: "لم تبدأ", evaluator: "محمد سعيد", date: "2026-02-10", score: null },
  { id: "a10", name: "جمعية إحسان", type: "جمعية", year: 2026, progress: 55, status: "قيد التقييم", evaluator: "ريم عمر", date: "2026-02-12", score: 60 },
];

const rows2025: AssociationRow[] = [
  { id: "b1", name: "جمعية البر الخيرية", type: "جمعية", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "أحمد محمد", date: "2025-11-20", score: 90 },
  { id: "b2", name: "جمعية إنسان", type: "جمعية", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "سارة علي", date: "2025-11-18", score: 95 },
  { id: "b3", name: "جمعية تكافل", type: "جمعية", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "خالد عمر", date: "2025-10-30", score: 82 },
  { id: "b4", name: "مؤسسة العطاء", type: "مؤسسة", year: 2025, progress: 78, status: "تسليم جزئي", evaluator: "نورة سعد", date: "2025-10-25", score: 70 },
  { id: "b5", name: "جمعية رعاية", type: "جمعية", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "فهد ناصر", date: "2025-10-20", score: 87 },
  { id: "b6", name: "مؤسسة الأمل", type: "مؤسسة", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "ليلى أحمد", date: "2025-09-15", score: 93 },
  { id: "b7", name: "جمعية الوفاء", type: "جمعية", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "عبدالله سالم", date: "2025-09-10", score: 85 },
  { id: "b8", name: "جمعية نماء", type: "جمعية", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "هند خالد", date: "2025-08-20", score: 79 },
  { id: "b9", name: "مؤسسة بناء", type: "مؤسسة", year: 2025, progress: 60, status: "تسليم جزئي", evaluator: "محمد سعيد", date: "2025-08-15", score: 58 },
  { id: "b10", name: "جمعية إحسان", type: "جمعية", year: 2025, progress: 100, status: "تسليم كامل", evaluator: "ريم عمر", date: "2025-07-28", score: 91 },
];

const datasets: Record<number, AssociationRow[]> = { 2026: rows2026, 2025: rows2025 };

/* ── Component ── */
const AdminAssociations = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [year, setYear] = useState<number>(2026);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const rows = datasets[year];

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (search && !r.name.includes(search)) return false;
      return true;
    });
  }, [rows, typeFilter, statusFilter, search]);

  const totalOrgs = filtered.length;
  const ongoing = filtered.filter((r) => r.status === "قيد التقييم").length;
  const complete = filtered.filter((r) => r.status === "تسليم كامل").length;
  const avgProgress = totalOrgs > 0 ? Math.round(filtered.reduce((s, r) => s + r.progress, 0) / totalOrgs) : 0;

  const comingSoon = () =>
    toast({ title: "قريبًا", description: "سيتم توفير هذه الميزة لاحقًا" });

  const actions = [
    { label: "الاطلاع على جميع الشواهد", icon: FolderOpen },
    { label: "إعادة فتح التقييم", icon: RotateCcw },
    { label: "تغيير المقيم", icon: UserCog },
    { label: "إيقاف تقييم", icon: PauseCircle },
    { label: "أرشفة جهة", icon: Archive },
    { label: "تصدير بيانات جمعية", icon: Download },
    { label: "عرض سجل العمليات", icon: History },
  ];

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-[hsl(220,20%,97%)]">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-7">
          {/* Title */}
          <div>
            <h1 className="text-xl font-hrsd-title text-foreground">إدارة الجمعيات</h1>
            <p className="text-sm font-hrsd text-muted-foreground mt-1">
              نظرة شاملة على أداء الجهات وحالة التقييم
            </p>
          </div>

          {/* Filters + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
                <SelectTrigger className="w-32 text-sm font-hrsd-medium">
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-36 text-sm font-hrsd-medium">
                  <SelectValue placeholder="نوع الجهة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="جمعية">جمعية</SelectItem>
                  <SelectItem value="مؤسسة">مؤسسة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 text-sm font-hrsd-medium">
                  <SelectValue placeholder="حالة التقييم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="لم تبدأ">لم تبدأ</SelectItem>
                  <SelectItem value="قيد التقييم">قيد التقييم</SelectItem>
                  <SelectItem value="تسليم جزئي">تسليم جزئي</SelectItem>
                  <SelectItem value="تسليم كامل">تسليم كامل</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن جمعية..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="ps-9 w-52 text-sm font-hrsd"
                />
              </div>
            </div>

            <div className="flex items-center gap-0 rounded-[10px] border border-border overflow-hidden">
              <Button variant="ghost" size="sm" onClick={comingSoon} className="rounded-none border-e border-border gap-2 text-xs font-hrsd-medium px-4 h-9">
                تصدير Excel <FileSpreadsheet className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={comingSoon} className="rounded-none border-e border-border gap-2 text-xs font-hrsd-medium px-4 h-9">
                تصدير PDF <FileText className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={comingSoon} className="rounded-none gap-2 text-xs font-hrsd-medium px-4 h-9">
                طباعة <Printer className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "إجمالي الجهات", value: totalOrgs, icon: Building2 },
              { label: "قيد التقييم", value: ongoing, icon: ClipboardList },
              { label: "تسليم كامل", value: complete, icon: CheckCircle2 },
              { label: "متوسط نسبة الإنجاز", value: `${avgProgress}%`, icon: TrendingUp },
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
              <h3 className="text-sm font-hrsd-semibold text-foreground">قائمة الجمعيات</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-start font-hrsd-medium text-xs">اسم الجمعية</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">نوع الجهة</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">السنة</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">نسبة الإنجاز</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">حالة التقييم</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">اسم المقيم</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">تاريخ التقديم</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">الدرجة الحالية</TableHead>
                  <TableHead className="text-start font-hrsd-medium text-xs">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="text-sm font-hrsd">
                    <TableCell className="font-hrsd-medium">{r.name}</TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{r.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-10">{r.progress}%</span>
                        <Progress value={r.progress} className="h-1.5 w-20" />
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell>{r.evaluator}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.score !== null ? `${r.score}%` : "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 font-hrsd text-sm">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => navigate(`/admin/associations/${r.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                            عرض تفاصيل الجمعية
                          </DropdownMenuItem>
                          {actions.map((a) => (
                            <DropdownMenuItem key={a.label} className="gap-2" onClick={comingSoon}>
                              <a.icon className="h-4 w-4" />
                              {a.label}
                            </DropdownMenuItem>
                          ))}
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
    </div>
  );
};

export default AdminAssociations;
