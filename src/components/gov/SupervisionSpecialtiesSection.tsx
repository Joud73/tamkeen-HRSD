import { TrendingUp, BadgeCheck, Lightbulb, RefreshCw } from "lucide-react";
const specialties = [
  {
    id: 1,
    text: "رفع مساهمة القطاع غير الربحي في تلبية الاحتياجات التنموية المجتمعية ضمن نطاق الوزارة",
    icon: TrendingUp,
  },
  {
    id: 2,
    text: "تحسين كفاءة وفاعلية الإدارة في تنفيذ أعمالها ونشاطاتها الداخلية",
    icon: BadgeCheck,
  },
  {
    id: 3,
    text: "الإسهام بالارتقاء بمستوى التدخلات المقدمة من قبل منظمات القطاع غير الربحي للمجتمع",
    icon: RefreshCw,
  },
  {
    id: 4,
    text: "زيادة المساهمة المعرفية والابتكارية في مجال التنمية والعمل",
    icon: Lightbulb,
  },
];
export default function SupervisionSpecialtiesSection() {
  return (
    <section dir="rtl" className="relative bg-[#f8f9fa] py-16 overflow-hidden">
      {/* Subtle diagonal pattern on edges */}
      <div className="absolute inset-y-0 left-0 w-32 opacity-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 opacity-10"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-right text-black"
            style={{
              fontFamily: "'HRSDGov-Bold', 'Cairo', system-ui, sans-serif",
            }}
          >
            اختصاصات الإشراف الفني
          </h2>
          {/* Decorative lines */}
          <div className="flex justify-end gap-2"></div>
        </div>

        {/* Cards Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialties.map((item, index) => {
            const Icon = item.icon;
            // Determine icon position: right column (index 0, 2) = icon on right, left column (index 1, 3) = icon on left
            const isRightColumn = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="relative bg-white border border-gray-100 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-6 flex-row">
                  {/* Icon - always on the right in RTL */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Icon className="w-12 h-12" style={{ color: "#14573A" }} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text */}
                  <p
                    className="text-gray-700 text-base md:text-lg leading-relaxed text-right flex-1"
                    style={{
                      fontFamily: "'HRSDGov-Regular', 'Cairo', system-ui, sans-serif",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
