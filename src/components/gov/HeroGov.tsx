import { Link } from "react-router-dom";
export default function HeroGov() {
  return <section dir="rtl" className="relative min-h-[85vh] bg-[#1D4D37]">
      {/* Content Container - Right aligned with left padding only */}
      <div className="h-full flex items-center">
        <div className="w-full pl-8 md:pl-24 lg:pl-48 xl:pl-64 pr-0">
          <div className="max-w-4xl mr-auto py-24 md:py-32 lg:py-40 text-right">
            {/* Main Headline */}
            <h1 className="text-white text-3xl lg:text-5xl xl:text-[56px] leading-[1.4] mb-8 md:text-3xl" style={{
            fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif",
            fontWeight: 700
          }}>مركز التمكين الفني للمنظمات غير الربحية تحت إشراف وزارة الموارد البشرية والتنمية الاجتماعية فنياً

          </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-3xl" style={{
            fontFamily: "'HRSDGov-Regular', 'Cairo', system-ui, sans-serif",
            fontWeight: 400
          }}>تأهيل ، تدريب ، تمكين ، تقييم الأداء الفني</p>

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
      </div>
    </section>;
}