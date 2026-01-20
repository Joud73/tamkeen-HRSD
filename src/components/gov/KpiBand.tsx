import { CheckCircle, Users, Heart } from "lucide-react";

const stats = [
  {
    icon: CheckCircle,
    value: "36,687,106",
    label: "المعاملات المنجزة",
  },
  {
    icon: Users,
    value: "206,391,572",
    label: "زوار الموقع",
  },
  {
    icon: Heart,
    value: "855",
    label: "الخدمات المقدمة",
  },
];

export default function KpiBand() {
  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-right mb-12">
          <h2 className="text-2xl md:text-3xl font-hrsd-bold text-gray-900 mb-4">
            احصائيات حول الوزارة
          </h2>
          <p className="text-gray-600 font-hrsd-regular max-w-2xl mr-auto leading-relaxed">
            آخر الأرقام والإحصاءات المتعلقة بالخدمات الرقمية التي تقدمها وزارة
            الموارد البشرية والتنمية الاجتماعية.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl mb-6">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <span
                className="text-4xl md:text-5xl font-hrsd-bold text-gray-900 mb-3"
                style={{ direction: "ltr" }}
              >
                {stat.value}
              </span>
              <span className="text-gray-600 font-hrsd-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
