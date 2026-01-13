import { UserPlus, Video, ClipboardCheck, Route, GraduationCap, Upload, Brain, UserCheck, Trophy } from "lucide-react";
import React from "react";

interface JourneyStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "top" | "bottom";
}

const journeySteps: JourneyStep[] = [
  {
    title: "تسجيل المنظمة في المركز الافتراضي",
    description: "بدء رحلة المنظمة عبر التسجيل الأولي",
    icon: <UserPlus className="w-4 h-4" />,
    position: "top",
  },
  {
    title: "الحصول على جلسة تعريفية",
    description: "شرح المسارات والمتطلبات وطريقة العمل",
    icon: <Video className="w-4 h-4" />,
    position: "bottom",
  },
  {
    title: "تقييم الأداء الفني ذاتيًا",
    description: "إجراء التقييم الذاتي وفق المعايير المعتمدة",
    icon: <ClipboardCheck className="w-4 h-4" />,
    position: "top",
  },
  {
    title: "اختيار المسار المناسب من الخمس مسارات",
    description: "تحديد المسار الأنسب لرحلة المنظمة",
    icon: <Route className="w-4 h-4" />,
    position: "bottom",
  },
  {
    title: "التأهيل والتدريب والتواصل مع المشرف عبر المنصة",
    description: "العمل على إعداد الأنشطة والمتطلبات بإشراف المختص",
    icon: <GraduationCap className="w-4 h-4" />,
    position: "top",
  },
  {
    title: "رفع المتطلبات المحددة من قبل الجمعية",
    description: "رفع الوثائق والأدلة المطلوبة بشكل كامل",
    icon: <Upload className="w-4 h-4" />,
    position: "bottom",
  },
  {
    title: "التقييم باستخدام أداة التقييم الذكي",
    description: "مراجعة آلية للمستندات ومعالجة الملاحظات",
    icon: <Brain className="w-4 h-4" />,
    position: "top",
  },
];

const OrganizationJourney = () => {
  return (
    <section className="w-full py-12 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-hrsd-bold text-center mb-16" style={{ color: "#148287" }}>
          رحلة المنظمة
        </h2>

        <div className="relative overflow-x-auto pb-8">
          <div className="mx-auto px-0">
            {/* الخط الأفقي */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5" style={{ backgroundColor: "#148287" }}>
              {journeySteps.map((_, index) => (
                <div
                  key={`dot-${index}`}
                  className="absolute w-1.5 h-1.5 rounded-full -translate-y-1/2 top-1/2"
                  style={{
                    backgroundColor: "#148287",
                    left: `${(index / (journeySteps.length - 1)) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            {/* الحاوية */}
            <div
              className="relative grid place-items-center"
              style={{
                gridTemplateColumns: `repeat(${journeySteps.length}, minmax(0, 1fr))`,
                height: "300px",
              }}
            >
              {journeySteps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  {step.position === "top" && (
                    <div className="absolute bottom-[calc(50%+40px)] text-center px-2 w-32">
                      <p className="text-xs font-hrsd-semibold mb-1" style={{ color: "#148287" }}>
                        {step.title}
                      </p>
                      <p className="text-[10px] font-hrsd-regular" style={{ color: "#f5961e" }}>
                        {step.description}
                      </p>
                    </div>
                  )}

                  {/* الخط العمودي */}
                  <div
                    className="absolute w-0.5 h-6"
                    style={{
                      backgroundColor: "#148287",
                      top: step.position === "top" ? "calc(50% - 30px)" : "calc(50% + 6px)",
                    }}
                  />

                  {/* الدائرة */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg border-4 border-white"
                    style={{ backgroundColor: "#148287" }}
                  >
                    <span className="text-white">{step.icon}</span>
                  </div>

                  {step.position === "bottom" && (
                    <div className="absolute top-[calc(50%+40px)] text-center px-2 w-32">
                      <p className="text-xs font-hrsd-semibold mb-1" style={{ color: "#148287" }}>
                        {step.title}
                      </p>
                      <p className="text-[10px] font-hrsd-regular" style={{ color: "#f5961e" }}>
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationJourney;
