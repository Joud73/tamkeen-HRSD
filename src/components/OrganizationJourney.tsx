import { Check } from "lucide-react";

const steps = [
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

const OrganizationJourney = () => {
  const currentStep = 1; // This could be dynamic based on user progress

  return (
    <section className="py-8 px-4 md:px-8 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-hrsd-bold text-center mb-8"
          style={{ color: "hsl(175, 75%, 30%)" }}
        >
          رحلة المنظمة
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Line */}
          <div
            className="absolute top-6 right-0 left-0 h-0.5"
            style={{ backgroundColor: "hsl(175, 75%, 85%)" }}
          />

          {/* Steps */}
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
                  {/* Top Text (for even indices) */}
                  {isTop && (
                    <div className="mb-3 text-center min-h-[48px] flex flex-col justify-end">
                      <p
                        className="text-xs md:text-sm font-hrsd-semibold"
                        style={{
                          color: isCurrent
                            ? "hsl(35, 91%, 54%)"
                            : "hsl(175, 75%, 30%)",
                        }}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500 font-hrsd">
                        {step.description}
                      </p>
                    </div>
                  )}

                  {/* Spacer for bottom text items */}
                  {!isTop && <div className="mb-3 min-h-[48px]" />}

                  {/* Circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300"
                    style={{
                      backgroundColor: isCompleted
                        ? "hsl(175, 75%, 30%)"
                        : isCurrent
                        ? "hsl(35, 91%, 54%)"
                        : "hsl(175, 75%, 85%)",
                      border: isCurrent
                        ? "3px solid hsl(35, 91%, 54%)"
                        : "none",
                      boxShadow: isCurrent
                        ? "0 0 0 4px hsla(35, 91%, 54%, 0.2)"
                        : "none",
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className="text-sm font-hrsd-bold"
                        style={{
                          color: isCurrent ? "white" : "hsl(175, 75%, 30%)",
                        }}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Spacer for top text items */}
                  {isTop && <div className="mt-3 min-h-[48px]" />}

                  {/* Bottom Text (for odd indices) */}
                  {!isTop && (
                    <div className="mt-3 text-center min-h-[48px] flex flex-col justify-start">
                      <p
                        className="text-xs md:text-sm font-hrsd-semibold"
                        style={{
                          color: isCurrent
                            ? "hsl(35, 91%, 54%)"
                            : "hsl(175, 75%, 30%)",
                        }}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500 font-hrsd">
                        {step.description}
                      </p>
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
