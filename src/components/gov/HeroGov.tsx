import { Link } from "react-router-dom";
export default function HeroGov() {
  return (
    <section dir="rtl" className="relative min-h-[85vh] bg-[#1D4D37]">
      {/* Content Container - Far right aligned */}
      <div className="h-full flex items-center justify-end">
        <div className="w-full max-w-[1200px] py-32 pr-8 text-right">
          <h1 className="text-white text-[56px] leading-[1.35] mb-6">
            مركز التمكين الفني للمنظمات غير الربحية تحت إشراف وزارة الموارد البشرية والتنمية الاجتماعية فنياً
          </h1>

          <p className="text-white/80 text-lg mb-8">تأهيل ، تدريب ، تمكين ، تقييم الأداء الفني</p>

          <Link to="/login" className="ml-auto inline-flex bg-white text-[#1D4D37] px-8 py-3 rounded-lg">
            المزيد
          </Link>
        </div>
      </div>
    </section>
  );
}
