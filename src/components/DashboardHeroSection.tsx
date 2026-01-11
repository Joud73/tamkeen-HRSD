import { Link } from "react-router-dom";

// Donut Chart Component
interface DonutChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const DonutChart = ({ percentage, size = 100, strokeWidth = 10 }: DonutChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-hrsd-bold text-primary">{percentage}%</span>
      </div>
    </div>
  );
};

// Status colors mapping
const statusColors = {
  incomplete: "#9ca3af", // gray
  needsMajorImprovement: "#f5961e", // orange
  needsMinorImprovement: "#86efac", // light green
  complete: "#148287", // teal
};

// Course card data
interface CourseCard {
  title: string;
  percentage: number;
  statuses: {
    incomplete: number;
    needsMajorImprovement: number;
    needsMinorImprovement: number;
    complete: number;
  };
  newNotes: number;
}

const courseCards: CourseCard[] = [
  {
    title: "التوجه",
    percentage: 65,
    statuses: { incomplete: 2, needsMajorImprovement: 1, needsMinorImprovement: 3, complete: 5 },
    newNotes: 3,
  },
  {
    title: "الفريق",
    percentage: 45,
    statuses: { incomplete: 4, needsMajorImprovement: 2, needsMinorImprovement: 2, complete: 3 },
    newNotes: 5,
  },
  {
    title: "الشراكات",
    percentage: 80,
    statuses: { incomplete: 1, needsMajorImprovement: 0, needsMinorImprovement: 2, complete: 8 },
    newNotes: 1,
  },
  {
    title: "التأثير",
    percentage: 30,
    statuses: { incomplete: 5, needsMajorImprovement: 3, needsMinorImprovement: 1, complete: 2 },
    newNotes: 7,
  },
  {
    title: "البرامج",
    percentage: 55,
    statuses: { incomplete: 3, needsMajorImprovement: 2, needsMinorImprovement: 3, complete: 4 },
    newNotes: 2,
  },
];

// Summary data
const summaryData = {
  incomplete: 15,
  needsMajorImprovement: 8,
  needsMinorImprovement: 11,
  complete: 22,
};

const totalItems = summaryData.incomplete + summaryData.needsMajorImprovement + summaryData.needsMinorImprovement + summaryData.complete;

const DashboardHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white py-8">
      {/* Side Patterns */}
      <div className="side-pattern-left" />
      <div className="side-pattern-right" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Title and Breadcrumb */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-hrsd-bold text-foreground mb-2">
            مساقات التقييم الفني
          </h1>
          <nav className="flex items-center gap-2 text-sm text-muted-foreground font-hrsd mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              العودة لصفحة الرئيسية
            </Link>
            <span>&gt;</span>
            <span className="text-foreground">مساقات التقييم الفني</span>
          </nav>
          {/* Green horizontal line */}
          <div className="h-0.5 bg-primary w-full" />
        </div>

        {/* إجمالي التقييم Summary Block */}
        <div className="bg-section-light rounded-lg p-6 mb-8">
          <h2 className="text-xl font-hrsd-bold mb-4" style={{ color: "hsl(var(--accent-orange))" }}>
            إجمالي التقييم
          </h2>

          <div className="space-y-3">
            {/* غير مكتمل */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-hrsd-medium text-foreground w-36 text-right">غير مكتمل</span>
              <div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(summaryData.incomplete / totalItems) * 100}%`,
                    backgroundColor: statusColors.incomplete,
                  }}
                />
              </div>
              <span className="text-sm font-hrsd-semibold w-8 text-left">{summaryData.incomplete}</span>
            </div>

            {/* بحاجة إلى تحسين كبير */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-hrsd-medium text-foreground w-36 text-right">بحاجة إلى تحسين كبير</span>
              <div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(summaryData.needsMajorImprovement / totalItems) * 100}%`,
                    backgroundColor: statusColors.needsMajorImprovement,
                  }}
                />
              </div>
              <span className="text-sm font-hrsd-semibold w-8 text-left">{summaryData.needsMajorImprovement}</span>
            </div>

            {/* بحاجة إلى تحسين بسيط */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-hrsd-medium text-foreground w-36 text-right">بحاجة إلى تحسين بسيط</span>
              <div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(summaryData.needsMinorImprovement / totalItems) * 100}%`,
                    backgroundColor: statusColors.needsMinorImprovement,
                  }}
                />
              </div>
              <span className="text-sm font-hrsd-semibold w-8 text-left">{summaryData.needsMinorImprovement}</span>
            </div>

            {/* مكتمل */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-hrsd-medium text-foreground w-36 text-right">مكتمل</span>
              <div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(summaryData.complete / totalItems) * 100}%`,
                    backgroundColor: statusColors.complete,
                  }}
                />
              </div>
              <span className="text-sm font-hrsd-semibold w-8 text-left">{summaryData.complete}</span>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseCards.map((card, index) => (
            <div
              key={index}
              className="rounded-lg p-6"
              style={{ backgroundColor: "hsl(163, 55%, 95%)" }}
            >
              {/* Card Title */}
              <h3 className="text-xl font-hrsd-bold text-foreground mb-4">{card.title}</h3>

              {/* Chart and Status Section */}
              <div className="flex items-start gap-6 mb-4">
                {/* Donut Chart */}
                <DonutChart percentage={card.percentage} size={90} strokeWidth={8} />

                {/* Status Lines */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: statusColors.incomplete }}
                      />
                      <span className="text-xs font-hrsd text-muted-foreground">غير مكتمل</span>
                    </div>
                    <span className="text-sm font-hrsd-semibold">{card.statuses.incomplete}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: statusColors.needsMajorImprovement }}
                      />
                      <span className="text-xs font-hrsd text-muted-foreground">بحاجة إلى تحسين كبير</span>
                    </div>
                    <span className="text-sm font-hrsd-semibold">{card.statuses.needsMajorImprovement}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: statusColors.needsMinorImprovement }}
                      />
                      <span className="text-xs font-hrsd text-muted-foreground">بحاجة إلى تحسين بسيط</span>
                    </div>
                    <span className="text-sm font-hrsd-semibold">{card.statuses.needsMinorImprovement}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: statusColors.complete }}
                      />
                      <span className="text-xs font-hrsd text-muted-foreground">مكتمل</span>
                    </div>
                    <span className="text-sm font-hrsd-semibold">{card.statuses.complete}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-primary/20 mb-4" />

              {/* Footer: Button and Notes */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => console.log(`Navigate to course: ${card.title}`)}
                  className="px-6 py-2 rounded-md text-sm font-hrsd-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "hsl(var(--primary))" }}
                >
                  تقييم المساق
                </button>

                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-hrsd-medium"
                    style={{ color: "hsl(var(--accent-orange))" }}
                  >
                    ملاحظات جديدة
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-hrsd-bold text-white"
                    style={{ backgroundColor: "hsl(var(--accent-orange))" }}
                  >
                    {card.newNotes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardHeroSection;
