import { Link } from "react-router-dom";
const HeroSection = () => {
  return <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4" style={{
    backgroundColor: "#1D4D37"
  }}>
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl lg:text-5xl mb-6 animate-fade-in text-white leading-relaxed md:text-2xl text-center" style={{
        fontFamily: "'Cairo', 'Noto Kufi Arabic', system-ui, sans-serif",
        fontWeight: 700
      }}>مركز التمكين الفني للمنظمات غير الربحية تحت إشراف وزارة الموارد البشرية والتنمية الاجتماعية فنياً</h1>

        {/* Description */}
        <p className="text-base lg:text-xl mb-10 text-white/90 animate-fade-in animation-delay-200 leading-relaxed max-w-3xl mx-auto md:text-base text-right" style={{
        fontFamily: "'Cairo', 'Noto Kufi Arabic', system-ui, sans-serif",
        fontWeight: 400
      }}>تأهيل ، تدريب ، تمكين ، تقييم الأداء الفني</p>

        {/* CTA Button */}
        <Link to="/login" className="inline-block px-8 py-3 bg-white text-[#1D4D37] border border-gray-300 rounded-lg text-base font-medium transition-all hover:border-gray-400 hover:shadow-md animate-fade-in animation-delay-400" style={{
        fontFamily: "'Cairo', 'Noto Kufi Arabic', system-ui, sans-serif",
        fontWeight: 500
      }}>
          المزيد
        </Link>
      </div>
    </section>;
};
export default HeroSection;