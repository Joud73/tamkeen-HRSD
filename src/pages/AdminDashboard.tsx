import { useState, useMemo } from "react";
import {
  Building2,
  Users,
  ClipboardList,
  TrendingUp,
  FileSpreadsheet,
  FileText,
  Printer,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import KpiCard from "@/components/admin/KpiCard";
import StatusBadge from "@/components/admin/StatusBadge";
import RecentEvaluationsTable, {
  type EvaluationRow,
} from "@/components/admin/RecentEvaluationsTable";

/* ── Mock datasets keyed by year ── */

const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

interface YearData {
  kpis: { orgs: number; evaluators: number; ongoing: number; progress: number };
  statuses: { label: string; count: number }[];
  coursePerf: { name: string; value: number }[];
  monthly: { month: string; value: number }[];
  table: EvaluationRow[];
}

const datasets: Record<number, YearData> = {
  2026: {
    kpis: { orgs: 342, evaluators: 58, ongoing: 127, progress: 64 },
    statuses: [
      { label: "لم تبدأ", count: 85 },
      { label: "قيد التقييم", count: 127 },
      { label: "تسليم جزئي", count: 78 },
      { label: "تسليم كامل", count: 52 },
    ],
    coursePerf: [
      { name: "التوجه", value: 72 },
      { name: "الفريق", value: 65 },
      { name: "الشراكات", value: 58 },
      { name: "التأثير", value: 80 },
      { name: "البرامج", value: 45 },
    ],
    monthly: months.map((m, i) => ({ month: m, value: 30 + Math.round(Math.sin(i / 2) * 20 + i * 3) })),
    table: [
      { org: "جمعية البر الخيرية", year: 2026, course: "مساق التوجه", status: "قيد التقييم", progress: 60, evaluator: "أحمد محمد", date: "2026-01-15" },
      { org: "جمعية إنسان", year: 2026, course: "مساق الفريق", status: "تسليم كامل", progress: 100, evaluator: "سارة علي", date: "2026-01-12" },
      { org: "جمعية تكافل", year: 2026, course: "مساق الشراكات", status: "تسليم جزئي", progress: 45, evaluator: "خالد عمر", date: "2026-01-10" },
      { org: "مؤسسة العطاء", year: 2026, course: "مساق التأثير", status: "لم تبدأ", progress: 0, evaluator: "نورة سعد", date: "2026-01-08" },
      { org: "جمعية رعاية", year: 2026, course: "مساق البرامج", status: "قيد التقييم", progress: 35, evaluator: "فهد ناصر", date: "2026-01-05" },
    ],
  },
  2025: {
    kpis: { orgs: 298, evaluators: 45, ongoing: 0, progress: 91 },
    statuses: [
      { label: "لم تبدأ", count: 12 },
      { label: "قيد التقييم", count: 18 },
      { label: "تسليم جزئي", count: 40 },
      { label: "تسليم كامل", count: 228 },
    ],
    coursePerf: [
      { name: "التوجه", value: 88 },
      { name: "الفريق", value: 79 },
      { name: "الشراكات", value: 71 },
      { name: "التأثير", value: 92 },
      { name: "البرامج", value: 67 },
    ],
    monthly: months.map((m, i) => ({ month: m, value: 50 + Math.round(Math.cos(i / 3) * 15 + i * 3.5) })),
    table: [
      { org: "جمعية البر الخيرية", year: 2025, course: "مساق التوجه", status: "تسليم كامل", progress: 100, evaluator: "أحمد محمد", date: "2025-11-20" },
      { org: "جمعية إنسان", year: 2025, course: "مساق الفريق", status: "تسليم كامل", progress: 100, evaluator: "سارة علي", date: "2025-11-18" },
      { org: "جمعية تكافل", year: 2025, course: "مساق الشراكات", status: "تسليم كامل", progress: 100, evaluator: "خالد عمر", date: "2025-10-30" },
      { org: "مؤسسة العطاء", year: 2025, course: "مساق التأثير", status: "تسليم جزئي", progress: 78, evaluator: "نورة سعد", date: "2025-10-25" },
      { org: "جمعية رعاية", year: 2025, course: "مساق البرامج", status: "تسليم كامل", progress: 100, evaluator: "فهد ناصر", date: "2025-10-20" },
    ],
  },
};

const courseFilterOptions = [
  { value: "all", label: "الكل" },
  { value: "مساق التوجه", label: "مساق التوجه" },
  { value: "مساق الفريق", label: "مساق الفريق" },
  { value: "مساق الشراكات", label: "مساق الشراكات" },
  { value: "مساق التأثير", label: "مساق التأثير" },
  { value: "مساق البرامج", label: "مساق البرامج" },
];

/* ── Component ── */

const AdminDashboard = () => {
  const { toast } = useToast();
  const [year, setYear] = useState<number>(2026);
  const [courseFilter, setCourseFilter] = useState("all");

  const data = datasets[year];

  const filteredCoursePerf = useMemo(() => {
    if (courseFilter === "all") return data.coursePerf;
    const short = courseFilter.replace("مساق ", "");
    return data.coursePerf.map((c) => ({
      ...c,
      value: c.name === short ? c.value : c.value * 0.25,
    }));
  }, [data.coursePerf, courseFilter]);

  const filteredTable = useMemo(() => {
    if (courseFilter === "all") return data.table;
    return data.table.filter((r) => r.course === courseFilter);
  }, [data.table, courseFilter]);

  const comingSoon = () =>
    toast({ title: "قريبًا", description: "سيتم توفير هذه الميزة لاحقًا" });

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-[hsl(220,20%,97%)]">
      <AdminHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the RIGHT (naturally in RTL) */}
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-7">
          {/* Page title */}
          <div>
            <h1 className="text-xl font-hrsd-title text-foreground">لوحة التحكم</h1>
            <p className="text-sm font-hrsd text-muted-foreground mt-1">
              نظرة شاملة وفورية عن حالة المنصة
            </p>
          </div>

          {/* ── Filters / Actions ── */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filters on the right (start in RTL) */}
            <div className="flex items-center gap-3">
              <Select
                value={String(year)}
                onValueChange={(v) => setYear(Number(v))}
              >
                <SelectTrigger className="w-32 text-sm font-hrsd-medium">
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>

              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-44 text-sm font-hrsd-medium">
                  <SelectValue placeholder="المساق" />
                </SelectTrigger>
                <SelectContent>
                  {courseFilterOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action buttons on the left (end in RTL) */}
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

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KpiCard title="إجمالي الجمعيات المسجلة" value={data.kpis.orgs} icon={<Building2 className="h-5 w-5" />} />
            <KpiCard title="عدد المقيمين" value={data.kpis.evaluators} icon={<Users className="h-5 w-5" />} />
            <KpiCard title="عدد التقييمات الجارية" value={data.kpis.ongoing} icon={<ClipboardList className="h-5 w-5" />} />
            <KpiCard
              title="نسبة الإنجاز العامة"
              value={`${data.kpis.progress}%`}
              icon={<TrendingUp className="h-5 w-5" />}
              highlight
              showProgress
              progressValue={data.kpis.progress}
            />
          </div>

          {/* ── Status Distribution ── */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-hrsd-semibold text-foreground mb-4">حالة الجمعيات</h3>
            <div className="flex flex-wrap gap-3">
              {data.statuses.map((s) => (
                <StatusBadge key={s.label} status={s.label} count={s.count} />
              ))}
            </div>
          </div>

          {/* ── Charts ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Bar chart */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-hrsd-semibold text-foreground mb-5">الأداء حسب المساقات</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={filteredCoursePerf} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,15%,93%)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "HRSDGov-Regular" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontFamily: "HRSDGov-Medium", fontSize: 12, borderRadius: 10, border: "1px solid hsl(210,15%,90%)" }}
                    formatter={(v: number) => [`${v}%`, "الأداء"]}
                  />
                  <Bar dataKey="value" fill="hsl(175,75%,30%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Area chart */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-hrsd-semibold text-foreground mb-5">الأداء الشهري</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data.monthly}>
                  <defs>
                    <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(175,75%,30%)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="hsl(175,75%,30%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,15%,93%)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "HRSDGov-Regular" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontFamily: "HRSDGov-Medium", fontSize: 12, borderRadius: 10, border: "1px solid hsl(210,15%,90%)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(175,75%,30%)"
                    strokeWidth={2}
                    fill="url(#tealGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Recent evaluations table ── */}
          <RecentEvaluationsTable rows={filteredTable} />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
