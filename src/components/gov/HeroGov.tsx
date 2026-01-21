import { Link } from "react-router-dom";
export default function HeroGov() {
  return <section dir="rtl" className="relative min-h-[85vh] bg-[#1D4D37]">
      {/* Content Container - Far right aligned */}
      <div className="h-full flex items-center justify-end">
        <div className="w-full max-w-[900px] py-24 md:py-32 lg:py-40 pr-8 md:pr-16 lg:pr-24 xl:pr-32 text-right">
          {/* Main Headline */}
          <h1 className="text-white text-3xl lg:text-5xl xl:text-[56px] leading-[1.35] mb-6 text-right md:text-3xl" style={{
          fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif",
          fontWeight: 700
        }}>
            مركز التمكين الفني للمنظمات غير الربحية تحت إشراف وزارة الموارد البشرية والتنمية الاجتماعية فنياً
          </h1>

          {/* Subtitle - two lines */}
          <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mr-0 text-right" style={{
          fontFamily: "'HRSDGov-Regular', 'Cairo', system-ui, sans-serif",
          fontWeight: 400
        }}>
            تأهيل ، تدريب ، تمكين ، تقييم الأداء الفني
          </p>

          {/* CTA Button */}
          <Link to="/login" className="inline-flex items-center justify-center
                       bg-white text-[#1D4D37]
                       px-8 py-3 rounded-lg
                       text-base font-hrsd-medium
                       hover:bg-gray-100
                       transition-colors duration-200">
            المزيد
          </Link>
        </div>
      </div>
    </section>;
}