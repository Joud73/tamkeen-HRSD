import { Link } from "react-router-dom";
export default function HeroSection() {
  return <section dir="rtl" className="relative min-h-screen px-6 bg-primary">
      {/* هذا الفراغ هو المفتاح للمسافة بين الهيدر والعنوان */}
      <div className="h-28 md:h-36 lg:h-44" />

      {/* المحتوى */}
      <div className="max-w-5xl ms-auto text-right bg-primary">
        {/* العنوان */}
        <h1 className="text-white leading-tight
                     text-3xl md:text-4xl lg:text-5xl
                     mb-10" style={{
        fontFamily: "'DIN Next Arabic', system-ui, sans-serif",
        fontWeight: 700
      }}>
          مركز التمكين الفني للمنظمات غير الربحية تحت إشراف وزارة الموارد البشرية والتنمية الاجتماعية فنياً
        </h1>

        {/* الوصف */}
        <p className="text-white/90 text-lg md:text-xl mb-14 max-w-3xl" style={{
        fontFamily: "'DIN Next Arabic', system-ui, sans-serif",
        fontWeight: 400
      }}>
          تأهيل ، تدريب ، تمكين ، تقييم الأداء الفني
        </p>

        {/* الزر */}
        <Link to="/login" className="inline-flex items-center
                     bg-white text-[#1D4D37]
                     px-10 py-4 rounded-xl
                     text-base font-medium
                     border border-transparent
                     hover:border-gray-300
                     hover:shadow-md
                     transition" style={{
        fontFamily: "'DIN Next Arabic', system-ui, sans-serif",
        fontWeight: 500
      }}>
          المزيد
        </Link>
      </div>
    </section>;
}