import { Link } from "react-router-dom";
export default function HeroGov() {
  return (
    <section dir="rtl" className="relative min-h-[85vh] bg-[#1D4D37]">
      {/* Content Container - Far right aligned */}
      <div className="h-full flex items-center justify-end">
        <div className="w-full max-w-[900px] py-8 md:py-16 lg:py-24 pr-24 md:pr-32 lg:pr-40 xl:pr-32 text-right">
          {/* Main Headline */}
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-[56px] leading-[1.35] mb-6"
            style={{
              fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            مركز التمكين الفني للمنظمات غير الربحية تحت إشراف وزارة الموارد البشرية والتنمية الاجتماعية فنياً
          </h1>

          {/* Subtitle - two lines */}
          <p
            className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mr-0"
            style={{
              fontFamily: "'HRSDGov-Regular', 'Cairo', system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            تأهيل ، تدريب ، تمكين ، تقييم الأداء الفني
          </p>

          {/* CTA Button */}
          <Link
            to="/login"
            className="inline-flex items-center justify-center
                       bg-white text-[#1D4D37]
                       px-8 py-3 rounded-lg
                       text-base font-hrsd-medium
                       hover:bg-gray-100
                       transition-colors duration-200"
          >
            المزيد
          </Link>
        </div>
      </div>
    </section>
  );
}
