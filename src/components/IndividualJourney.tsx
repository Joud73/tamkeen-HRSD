import { LogIn, ClipboardCheck, BookOpen, GraduationCap } from "lucide-react";
const steps = [{
  id: 1,
  title: "التسجيل / تسجيل الدخول",
  description: "تسجيل الدخول الفردي",
  icon: LogIn
}, {
  id: 2,
  title: "التقييم الذاتي",
  description: "تحليل الوضع الحالي",
  icon: ClipboardCheck
}, {
  id: 3,
  title: "الدورات المقترحة",
  description: "تحديد المسار التدريبي",
  icon: BookOpen
}, {
  id: 4,
  title: "التدريب وإصدار الشهادة",
  description: "حضور الدورات والحصول على الشهادة",
  icon: GraduationCap
}];
interface IndividualJourneyProps {
  currentStep?: number;
  onStepClick?: (stepId: number) => void;
}
const IndividualJourney = ({
  currentStep = 1,
  onStepClick
}: IndividualJourneyProps) => {
  return <section className="py-12 px-4 md:px-8 bg-white overflow-x-auto" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-hrsd-title text-center mb-12" style={{
        color: "hsl(35, 91%, 54%)"
      }}>
          رحلة الأفراد (العاملين والمستفيدين)
        </h2>

        <div className="relative min-w-[700px]">
          {/* Golden connecting line */}
          <div className="absolute h-1 rounded-full" style={{
          backgroundColor: "hsl(40, 50%, 65%)",
          top: "50%",
          right: "10%",
          left: "10%",
          transform: "translateY(-50%)"
        }} />

          
        </div>
      </div>
    </section>;
};
export default IndividualJourney;