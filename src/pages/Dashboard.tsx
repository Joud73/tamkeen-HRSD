import DashboardHeader from "@/components/DashboardHeader";
import heroBg from "@/assets/hero-bg.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#148287",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#148287]/40" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in text-center font-hrsd-title"
            style={{ color: "#f5961e" }}
          >
            أداة التقييم الفني
          </h1>

          {/* Decorative Lines */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="w-12 h-1 rounded" style={{ backgroundColor: "#148287" }} />
            <div className="w-24 h-1 rounded" style={{ backgroundColor: "#148287" }} />
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl font-hrsd-medium mb-10 text-white/90 animate-fade-in animation-delay-200">
            تعزيز القدرات الفنية للمنظمات غير الربحية حتى تتمكن من تحقيق أهدافها بفاعلية واستدامة
          </p>
        </div>

        {/* Side Badge */}
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 py-4 px-2 text-xs text-white z-50"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            backgroundColor: "#f5961e",
            borderRadius: "0 4px 4px 0",
          }}
        >
          نسخة تجريبية
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
