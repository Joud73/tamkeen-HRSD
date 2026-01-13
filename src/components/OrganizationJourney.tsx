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
  const currentStep = 1; // الخطوة الحالية

  return (
    <section className="py-8 px-4 md:px-8 bg-white" dir="rtl">
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; box-shadow: 0 0 0 4px hsla(35, 91%, 54%, 0.2); }
            50% { opacity: 0.6; box-shadow: 0 0 10px 6px hsla(35, 91%, 54%, 0.4); }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: "hsl(175, 75%, 30%)" }}>
          رحلة المنظمة
        </h2>

        <div className="relative">
          <div className="absolute top-6 right-0 left-0 h-1" style={{ backgroundColor: "hsl(175, 75%, 85%)" }} />

          <div className="flex justify-between items-start relative">
            {steps.map((step, index) => {
              const isCurrent = step.id === currentStep;
              const isTop = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  {isTop ? (
                    <div className="mb-3 text-center min-h-[48px]">
                      <p
                        className="text-xs md:text-sm font-semibold"
                        style={{ color: isCurrent ? "hsl(35, 91%, 54%)" : "hsl(175, 75%, 30%)" }}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500">{step.description}</p>
                    </div>
                  ) : (
                    <div className="mb-3 min-h-[48px]" />
                  )}

                  {/* الدائرة مع تأثير التومض */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: isCurrent ? "hsl(35, 91%, 54%)" : "hsl(175, 75%, 30%)",
                      color: "white",
                      animation: isCurrent ? "blink 1.2s infinite" : "none",
                    }}
                  >
                    {step.id}
                  </div>

                  {isTop ? (
                    <div className="mt-3 min-h-[48px]" />
                  ) : (
                    <div className="mt-3 text-center min-h-[48px]">
                      <p
                        className="text-xs md:text-sm font-semibold"
                        style={{ color: isCurrent ? "hsl(35, 91%, 54%)" : "hsl(175, 75%, 30%)" }}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500">{step.description}</p>
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
