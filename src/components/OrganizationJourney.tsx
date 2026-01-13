import { 
  UserPlus, 
  Video, 
  ClipboardCheck, 
  Route, 
  GraduationCap, 
  Upload, 
  Brain, 
  UserCheck, 
  Trophy 
} from "lucide-react";

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
    icon: <UserPlus className="w-6 h-6" />,
    position: "top",
  },
  {
    title: "الحصول على جلسة تعريفية",
    description: "شرح المسارات والمتطلبات وطريقة العمل",
    icon: <Video className="w-6 h-6" />,
    position: "bottom",
  },
  {
    title: "تقييم الأداء الفني ذاتيًا",
    description: "إجراء التقييم الذاتي وفق المعايير المعتمدة",
    icon: <ClipboardCheck className="w-6 h-6" />,
    position: "top",
  },
  {
    title: "اختيار المسار المناسب من الخمس مسارات",
    description: "تحديد المسار الأنسب لرحلة المنظمة",
    icon: <Route className="w-6 h-6" />,
    position: "bottom",
  },
  {
    title: "التأهيل والتدريب والتواصل مع المشرف عبر المنصة",
    description: "العمل على إعداد الأنشطة والمتطلبات بإشراف المختص",
    icon: <GraduationCap className="w-6 h-6" />,
    position: "top",
  },
  {
    title: "رفع المتطلبات المحددة من قبل الجمعية",
    description: "رفع الوثائق والأدلة المطلوبة بشكل كامل",
    icon: <Upload className="w-6 h-6" />,
    position: "bottom",
  },
  {
    title: "التقييم باستخدام أداة التقييم الذكي",
    description: "مراجعة آلية للمستندات ومعالجة الملاحظات",
    icon: <Brain className="w-6 h-6" />,
    position: "top",
  },
  {
    title: "المراجعة العشوائية من موظف الإدارة",
    description: "تحقق بشري لضمان الجودة والالتزام بالمعايير",
    icon: <UserCheck className="w-6 h-6" />,
    position: "bottom",
  },
  {
    title: "النتيجة النهائية",
    description: "تقرير بالدرجة وخطة تحسين مستقبلية",
    icon: <Trophy className="w-6 h-6" />,
    position: "top",
  },
];

const OrganizationJourney = () => {
  return (
    <section className="w-full py-12 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-hrsd-bold text-center mb-16" style={{ color: "#148287" }}>
          رحلة المنظمة
        </h2>

        {/* Journey Timeline */}
        <div className="relative overflow-x-auto pb-8">
          <div className="min-w-[1200px] mx-auto px-8">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 right-8 left-8 h-1 -translate-y-1/2" style={{ backgroundColor: "#148287" }}>
              {/* Dots on the line */}
              {journeySteps.map((_, index) => (
                <div
                  key={`dot-${index}`}
                  className="absolute w-2 h-2 rounded-full -translate-y-1/2 top-1/2"
                  style={{
                    backgroundColor: "#148287",
                    right: `${(index / (journeySteps.length - 1)) * 100}%`,
                    transform: "translate(50%, -50%)",
                  }}
                />
              ))}
            </div>

            {/* Steps Container */}
            <div className="relative flex justify-between items-center" style={{ height: "400px" }}>
              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center relative"
                  style={{ width: `${100 / journeySteps.length}%` }}
                >
                  {/* Top positioned text */}
                  {step.position === "top" && (
                    <div className="absolute bottom-[calc(50%+50px)] text-center px-2 w-36">
                      <p className="text-sm font-hrsd-semibold leading-tight mb-1" style={{ color: "#148287" }}>
                        {step.title}
                      </p>
                      <p className="text-xs font-hrsd-regular leading-tight" style={{ color: "#f5961e" }}>
                        {step.description}
                      </p>
                    </div>
                  )}

                  {/* Vertical connector line */}
                  <div
                    className="absolute w-0.5 h-8"
                    style={{
                      backgroundColor: "#148287",
                      top: step.position === "top" ? "calc(50% - 40px)" : "calc(50% + 8px)",
                    }}
                  />

                  {/* Circle Icon */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-lg border-4 border-white"
                    style={{ backgroundColor: "#148287" }}
                  >
                    <span className="text-white">{step.icon}</span>
                  </div>

                  {/* Bottom positioned text */}
                  {step.position === "bottom" && (
                    <div className="absolute top-[calc(50%+50px)] text-center px-2 w-36">
                      <p className="text-sm font-hrsd-semibold leading-tight mb-1" style={{ color: "#148287" }}>
                        {step.title}
                      </p>
                      <p className="text-xs font-hrsd-regular leading-tight" style={{ color: "#f5961e" }}>
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
