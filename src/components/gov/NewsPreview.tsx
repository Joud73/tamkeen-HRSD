import { ArrowLeft, Calendar } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "إطلاق مبادرة جديدة لدعم القطاع غير الربحي",
    date: "15 يناير 2026",
    category: "أخبار",
  },
  {
    id: 2,
    title: "تحديث لوائح العمل المرن في المملكة",
    date: "12 يناير 2026",
    category: "تحديثات",
  },
  {
    id: 3,
    title: "ورشة عمل حول التحول الرقمي في الموارد البشرية",
    date: "10 يناير 2026",
    category: "فعاليات",
  },
  {
    id: 4,
    title: "إعلان نتائج برنامج التأهيل والتدريب",
    date: "8 يناير 2026",
    category: "إعلانات",
  },
];

export default function NewsPreview() {
  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-hrsd-bold text-gray-900 mb-4 md:mb-0">
            آخر الأخبار والإعلانات
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-hrsd-medium"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group bg-white rounded-lg border border-gray-100 p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <Calendar className="w-4 h-4" />
                <span className="font-hrsd-regular">{item.date}</span>
              </div>
              <span className="inline-block bg-primary/10 text-primary text-xs font-hrsd-medium px-3 py-1 rounded-full mb-3">
                {item.category}
              </span>
              <h3 className="text-base font-hrsd-semibold text-gray-900 leading-relaxed group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
