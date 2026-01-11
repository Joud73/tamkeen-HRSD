import { Compass, Users, Handshake, LayoutGrid, TrendingUp, Award } from "lucide-react";

interface JourneyStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const journeySteps: JourneyStep[] = [
  {
    icon: <Compass className="w-6 h-6" />,
    title: "التوجه",
    description: "الرؤية والرسالة والقيم",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "الفريق",
    description: "الهيكل التنظيمي والكفاءات",
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "الشراكات",
    description: "العلاقات والتعاون المؤسسي",
  },
  {
    icon: <LayoutGrid className="w-6 h-6" />,
    title: "البرامج",
    description: "الأنشطة والمشاريع التنفيذية",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "التأثير",
    description: "قياس الأثر والنتائج",
  },
];

const DashboardHeroSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-hrsd-title text-accent mb-4">
            رحلة التقييم الفني لمنظمتكم
          </h1>
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-12 h-1 rounded bg-primary" />
            <div className="w-24 h-1 rounded bg-muted" />
          </div>
        </div>

        {/* Supporting Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-lg md:text-xl text-muted-foreground font-hrsd-medium leading-relaxed">
            ستمر منظمتكم برحلة تقييم منظمة ومتدرجة، مقسمة إلى مراحل واضحة تهدف إلى تطوير الأداء وتعزيز القدرات.
          </p>
        </div>

        {/* Journey Visualization */}
        <div className="relative mb-16">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-12 right-[10%] left-[10%] h-0.5 bg-gradient-to-l from-primary via-primary/50 to-accent" />

          {/* Steps */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative z-10">
                {/* Circle Node */}
                <div className="w-24 h-24 rounded-full bg-section-light border-2 border-primary/20 flex items-center justify-center mb-4 transition-all hover:border-primary/40 hover:bg-primary/5">
                  <div className="text-primary">{step.icon}</div>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-hrsd-semibold text-foreground mb-1">{step.title}</h3>

                {/* Step Description */}
                <p className="text-sm text-muted-foreground font-hrsd max-w-[140px]">{step.description}</p>

                {/* Mobile Connection Line */}
                {index < journeySteps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-primary/50 to-primary/20 mt-4" />
                )}
              </div>
            ))}

            {/* Final Outcome Node */}
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Highlighted Circle */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/40 flex items-center justify-center mb-4 shadow-sm">
                <Award className="w-8 h-8 text-accent" />
              </div>

              {/* Step Title */}
              <h3 className="text-lg font-hrsd-bold text-accent mb-1">النتيجة النهائية</h3>

              {/* Step Description */}
              <p className="text-sm text-muted-foreground font-hrsd max-w-[160px]">تقييم شامل وخطة تطوير مخصصة</p>
            </div>
          </div>
        </div>

        {/* Complexity Explanation */}
        <div className="bg-section-light rounded-lg p-6 md:p-8 max-w-4xl mx-auto mb-12">
          <p className="text-center text-muted-foreground font-hrsd-medium mb-6">هيكلة التقييم</p>

          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-sm md:text-base">
            <span className="font-hrsd-semibold text-primary">المساق</span>
            <span className="text-muted-foreground">←</span>
            <span className="font-hrsd-medium text-foreground/80">المعايير</span>
            <span className="text-muted-foreground">←</span>
            <span className="font-hrsd-medium text-foreground/80">المؤشرات</span>
            <span className="text-muted-foreground">←</span>
            <span className="font-hrsd-medium text-foreground/80">البنود</span>
            <span className="text-muted-foreground">←</span>
            <span className="font-hrsd text-foreground/60">رفع الشواهد</span>
          </div>

          <p className="text-center text-sm text-muted-foreground font-hrsd mt-4 max-w-2xl mx-auto">
            كل مساق يتضمن معايير، وكل معيار يحتوي على مؤشرات، وكل مؤشر يشمل بنوداً تتطلب رفع شواهد داعمة.
          </p>
        </div>

        {/* Final Outcome Highlight */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-6 md:p-8 border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="hidden md:flex w-14 h-14 rounded-full bg-accent/10 items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-accent" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-hrsd-semibold text-foreground mb-3">ماذا ستحصلون عليه؟</h3>

                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-muted-foreground font-hrsd">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>تقييم تفصيلي شامل لكفاءة المنظمة الفنية</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground font-hrsd">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>خطة تطوير مخصصة بناءً على نتائج التقييم</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground font-hrsd">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>توصيات ببرامج ودورات تدريبية ملائمة</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeroSection;
