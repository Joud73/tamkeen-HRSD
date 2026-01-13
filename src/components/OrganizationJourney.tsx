import { Check } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  { id: 1, title: "التسجيل", description: "إنشاء حساب المنظمة" },
  { id: 2, title: "التوجيه", description: "جلسة تعريفية" },
  { id: 3, title: "التقييم الذاتي", description: "تحليل الوضع الحالي" },
  { id: 4, title: "اختيار الدورات", description: "تحديد المسار التدريبي" },
  { id: 5, title: "التدريب", description: "حضور الدورات" },
  { id: 6, title: "رفع المتطلبات", description: "تقديم الوثائق" },
  { id: 7, title: "التقييم الذكي", description: "مراجعة آلية" },
  { id: 8, title: "مراجعة الإدارة", description: "اعتماد النتائج" },
  { id: 9, title: "النتيجة النهائية", description: "إصدار الشهادة" },
];

interface OrganizationJourneyProps {
  /** الخطوة الحالية (1..9) */
  currentStep?: number;
  /** إظهار شريط تقدّم على الخط الأفقي (اختياري) */
  showProgressLine?: boolean;
}

const OrganizationJourney = ({ currentStep = 1, showProgressLine = true }: OrganizationJourneyProps) => {
  // ألوان العلامة التجارية
  const brandTeal = "hsl(175, 75%, 30%)"; // تيفوي غامق
  const brandTealLight = "hsl(175, 75%, 85%)"; // تيفوي فاتح للخلفية والخط
  const brandOrange = "hsl(35, 91%, 54%)"; // برتقالي للخطوة الحالية

  // نسبة التقدّم (من 0% إلى 100%) حتى موضع الخطوة الحالية
  const progressPercent = steps.length > 1 ? ((currentStep - 1) / (steps.length - 1)) * 100 : 0;

  return (
    <section className="py-8 px-4 md:px-8 bg-white" dir="rtl" aria-label="رحلة المنظمة">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-hrsd-bold text-center mb-8" style={{ color: brandTeal }}>
          رحلة المنظمة
        </h2>

        {/* الحاوية العامة للمخطط */}
        <div className="relative">
          {/* الخط الأفقي الأساسي */}
          <div
            className="absolute top-6 right-0 left-0 h-0.5"
            style={{ backgroundColor: brandTealLight }}
            aria-hidden="true"
          />

          {/* شريط تقدّم اختياري (حتى موضع الخطوة الحالية) */}
          {showProgressLine && (
            <div
              className="absolute top-6 right-0 h-0.5"
              style={{
                backgroundColor: brandTeal,
                width: `${progressPercent}%`,
                transition: "width 300ms ease",
              }}
              aria-hidden="true"
            />
          )}

          {/* الدوائر + النصوص */}
          <div className="flex justify-between items-start relative">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const isTop = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  {/* نص أعلى (للمؤشرات الزوجية) */}
                  {isTop ? (
                    <div className="mb-3 text-center min-h-[48px] flex flex-col justify-end">
                      <p
                        className="text-xs md:text-sm font-hrsd-semibold"
                        style={{ color: isCurrent ? brandOrange : brandTeal }}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500 font-hrsd">{step.description}</p>
                    </div>
                  ) : (
                    <div className="mb-3 min-h-[48px]" />
                  )}

                  {/* الدائرة */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300"
                    style={{
                      // ✅ فقط الخطوة الحالية تصبح برتقالية
                      backgroundColor: isCurrent ? brandOrange : isCompleted ? brandTeal : brandTealLight,
                      // إطار توكيد خفيف للخطوة الحالية
                      border: isCurrent ? `3px solid ${brandOrange}` : "none",
                      boxShadow: isCurrent ? `0 0 0 4px ${brandOrange}33` : "none",
                    }}
                    role="group"
                    aria-label={`الخطوة ${step.id}: ${step.title}`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className="text-sm font-hrsd-bold"
                        style={{
                          color: isCurrent ? "white" : brandTeal,
                        }}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* نص أسفل (للمؤشرات الفردية) */}
                  {isTop ? (
                    <div className="mt-3 min-h-[48px]" />
                  ) : (
                    <div className="mt-3 text-center min-h-[48px] flex flex-col justify-start">
                      <p
                        className="text-xs md:text-sm font-hrsd-semibold"
                        style={{ color: isCurrent ? brandOrange : brandTeal }}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500 font-hrsd">{step.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationJourney;
