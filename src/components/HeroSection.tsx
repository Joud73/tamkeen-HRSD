import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section dir="rtl" className="relative min-h-screen bg-[#1D4D37]">
      {/* Spacing from header */}
      <div className="h-28 md:h-36 lg:h-44" />

      {/* Content - positioned on the right side like HRSD website */}
      <div className="flex justify-end px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-2xl text-right">
          {/* Title - matching HRSD font style */}
          <h1 
            className="text-white leading-[1.3] text-3xl md:text-4xl lg:text-[52px] mb-8"
            style={{
              fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif",
              fontWeight: 700
            }}
          >
            مركز التمكين الفني للمنظمات غير الربحية تحت إشراف وزارة الموارد البشرية والتنمية الاجتماعية فنياً
          </h1>

          {/* Description */}
          <p 
            className="text-white/90 text-base md:text-lg mb-10"
            style={{
              fontFamily: "'HRSDGov-Regular', 'Cairo', system-ui, sans-serif",
              fontWeight: 400
            }}
          >
            تأهيل ، تدريب ، تمكين ، تقييم الأداء الفني
          </p>

          {/* Smaller button matching HRSD style */}
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center
                       bg-white text-[#1D4D37]
                       px-6 py-2.5 rounded-lg
                       text-sm font-medium
                       hover:bg-gray-100
                       transition-colors duration-200"
            style={{
              fontFamily: "'HRSDGov-Medium', 'Cairo', system-ui, sans-serif",
              fontWeight: 500
            }}
          >
            المزيد
          </Link>
        </div>
      </div>
    </section>
  );
}