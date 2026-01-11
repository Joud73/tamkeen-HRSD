import { Link } from "react-router-dom";
import { Info, CheckCircle2, Circle, AlertCircle, XCircle, ClipboardCheck } from "lucide-react";

// Donut Chart Component
interface DonutChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const DonutChart = ({ percentage, size = 120, strokeWidth = 12 }: DonutChartProps) => {
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
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#148287"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-hrsd-bold" style={{ color: "#148287" }}>{percentage}%</span>
      </div>
    </div>
  );
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
    percentage: 53,
    statuses: { incomplete: 5, needsMajorImprovement: 0, needsMinorImprovement: 2, complete: 6 },
    newNotes: 0,
  },
  {
    title: "الفريق",
    percentage: 87,
    statuses: { incomplete: 1, needsMajorImprovement: 1, needsMinorImprovement: 0, complete: 12 },
    newNotes: 0,
  },
  {
    title: "الشراكات",
    percentage: 47,
    statuses: { incomplete: 3, needsMajorImprovement: 1, needsMinorImprovement: 2, complete: 4 },
    newNotes: 0,
  },
  {
    title: "التأثير",
    percentage: 62,
    statuses: { incomplete: 2, needsMajorImprovement: 1, needsMinorImprovement: 1, complete: 5 },
    newNotes: 0,
  },
  {
    title: "البرامج",
    percentage: 67,
    statuses: { incomplete: 1, needsMajorImprovement: 4, needsMinorImprovement: 1, complete: 8 },
    newNotes: 0,
  },
];

// Summary data
const summaryData = {
  totalPercentage: 56,
  incomplete: 15,
  needsMajorImprovement: 11,
  needsMinorImprovement: 3,
  complete: 32,
};

const totalItems = summaryData.incomplete + summaryData.needsMajorImprovement + summaryData.needsMinorImprovement + summaryData.complete;

const DashboardHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white py-6">
      {/* Side Patterns - Curved Lines */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-24 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 80 0 Q 20 100 80 200 Q 20 300 80 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.15'/%3E%3Cpath d='M 60 0 Q 0 100 60 200 Q 0 300 60 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.12'/%3E%3Cpath d='M 40 0 Q -20 100 40 200 Q -20 300 40 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'left center',
        }}
      />
      <div 
        className="fixed right-0 top-0 bottom-0 w-24 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 Q 80 100 20 200 Q 80 300 20 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.15'/%3E%3Cpath d='M 40 0 Q 100 100 40 200 Q 100 300 40 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.12'/%3E%3Cpath d='M 60 0 Q 120 100 60 200 Q 120 300 60 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'right center',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Title and Breadcrumb */}
        <div className="mb-4">
          <nav className="flex items-center gap-2 text-sm font-hrsd mb-3">
            <Link to="/" className="text-primary hover:underline transition-colors">
              العودة الى الصفحة الرئيسية
            </Link>
            <span className="text-primary">&gt;</span>
            <span className="text-primary font-hrsd-semibold">مساقات التقييم الفني</span>
          </nav>
          {/* Green horizontal line */}
          <div className="h-0.5 bg-primary w-full" />
        </div>

        {/* Info Message Box */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <span className="text-sm font-hrsd text-muted-foreground">
            انت في مرحلة التقييم الذاتي ، عند الانتهاء من التقييم قم بالضغط على زر ارسال التقييم . . .
          </span>
          <Info className="w-5 h-5 text-primary flex-shrink-0" />
        </div>

        {/* إجمالي التقييم Summary Block */}
        <div 
          className="rounded-lg p-6 mb-8"
          style={{ backgroundColor: "#fef9e7" }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Right side - Title and status list */}
            <div className="flex-1 order-2 md:order-1">
              {/* Status rows */}
              <div className="space-y-3">
                {/* غير مكتمل */}
                <div className="flex items-center gap-3">
                  <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm font-hrsd-medium text-foreground w-32">غير مكتمل</span>
                  <div className="flex-1 h-5 bg-white rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(summaryData.incomplete / totalItems) * 100}%`,
                        backgroundColor: "#9ca3af",
                      }}
                    />
                  </div>
                  <span className="text-sm font-hrsd-semibold w-8 text-center">{summaryData.incomplete}</span>
                </div>

                {/* بحاجة إلى تحسين كبير */}
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#f5961e" }} />
                  <span className="text-sm font-hrsd-medium text-foreground w-32">بحاجة إلى تحسين كبير</span>
                  <div className="flex-1 h-5 bg-white rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(summaryData.needsMajorImprovement / totalItems) * 100}%`,
                        backgroundColor: "#f5961e",
                      }}
                    />
                  </div>
                  <span className="text-sm font-hrsd-semibold w-8 text-center">{summaryData.needsMajorImprovement}</span>
                </div>

                {/* بحاجة إلى تحسين بسيط */}
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#22c55e" }} />
                  <span className="text-sm font-hrsd-medium text-foreground w-32">بحاجة إلى تحسين بسيط</span>
                  <div className="flex-1 h-5 bg-white rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(summaryData.needsMinorImprovement / totalItems) * 100}%`,
                        backgroundColor: "#22c55e",
                      }}
                    />
                  </div>
                  <span className="text-sm font-hrsd-semibold w-8 text-center">{summaryData.needsMinorImprovement}</span>
                </div>

                {/* مكتمل */}
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#148287" }} />
                  <span className="text-sm font-hrsd-medium text-foreground w-32">مكتمل</span>
                  <div className="flex-1 h-5 bg-white rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(summaryData.complete / totalItems) * 100}%`,
                        backgroundColor: "#148287",
                      }}
                    />
                  </div>
                  <span className="text-sm font-hrsd-semibold w-8 text-center">{summaryData.complete}</span>
                </div>
              </div>
            </div>

            {/* Left side - Title and total percentage */}
            <div className="flex flex-col items-end order-1 md:order-2 md:w-48">
              <h2 className="text-xl font-hrsd-bold mb-3" style={{ color: "#f5961e" }}>
                إجمالي التقييم
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-hrsd-bold" style={{ color: "#148287" }}>
                  %{summaryData.totalPercentage}
                </span>
                <div className="flex-1 h-6 bg-white rounded overflow-hidden w-32">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${summaryData.totalPercentage}%`,
                      backgroundColor: "#f5961e",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseCards.map((card, index) => (
            <div
              key={index}
              className="rounded-lg p-5"
              style={{ backgroundColor: "#e8f5f3" }}
            >
              {/* Card Title */}
              <h3 
                className="text-lg font-hrsd-bold text-right mb-4"
                style={{ color: "#148287" }}
              >
                {card.title}
              </h3>

              {/* Chart and Status Section */}
              <div className="flex items-start gap-4 mb-4">
                {/* Status Lines - Right side */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-hrsd-semibold w-4">{card.statuses.incomplete}</span>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-xs font-hrsd text-muted-foreground">غير مكتمل</span>
                      <Circle className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-hrsd-semibold w-4">{card.statuses.needsMajorImprovement}</span>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-xs font-hrsd" style={{ color: "#f5961e" }}>بحاجة لتحسين كبير</span>
                      <AlertCircle className="w-3 h-3" style={{ color: "#f5961e" }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-hrsd-semibold w-4">{card.statuses.needsMinorImprovement}</span>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-xs font-hrsd" style={{ color: "#22c55e" }}>بحاجة لتحسين بسيط</span>
                      <CheckCircle2 className="w-3 h-3" style={{ color: "#22c55e" }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-hrsd-semibold w-4">{card.statuses.complete}</span>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-xs font-hrsd" style={{ color: "#148287" }}>مكتمل</span>
                      <CheckCircle2 className="w-3 h-3" style={{ color: "#148287" }} />
                    </div>
                  </div>
                </div>

                {/* Donut Chart - Left side */}
                <DonutChart percentage={card.percentage} size={100} strokeWidth={10} />
              </div>

              {/* Divider */}
              <div className="h-px bg-primary/30 mb-4" />

              {/* Footer: Button and Notes */}
              <div className="flex items-center justify-between">
                {/* Notes on left */}
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-hrsd-bold text-white"
                    style={{ backgroundColor: "#22c55e" }}
                  >
                    {card.newNotes}
                  </span>
                  <span
                    className="text-sm font-hrsd-medium"
                    style={{ color: "#22c55e" }}
                  >
                    ملاحظات جديدة
                  </span>
                </div>

                {/* Button on right */}
                <button
                  onClick={() => console.log(`Navigate to course: ${card.title}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-hrsd-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#148287" }}
                >
                  <ClipboardCheck className="w-4 h-4" />
                  تقييم المساق
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardHeroSection;
