import { MessageCircle, Calendar, HelpCircle, FileText } from "lucide-react";

const supportOptions = [
  {
    id: 1,
    icon: Calendar,
    title: "حجز موعد",
    description: "احجز موعداً لزيارة أحد فروع الوزارة",
    href: "#",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "تقديم شكوى",
    description: "قدم شكوى أو ملاحظة للوزارة",
    href: "#",
  },
  {
    id: 3,
    icon: HelpCircle,
    title: "الأسئلة الشائعة",
    description: "إجابات على الأسئلة الأكثر شيوعاً",
    href: "#",
  },
  {
    id: 4,
    icon: FileText,
    title: "الاستفسارات",
    description: "تواصل معنا للاستفسارات العامة",
    href: "#",
  },
];

export default function ContactSupport() {
  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-right mb-10">
          <h2 className="text-2xl md:text-3xl font-hrsd-bold text-gray-900 mb-4">
            الدعم والمساعدة
          </h2>
          <p className="text-gray-600 font-hrsd-regular max-w-2xl leading-relaxed">
            نحن هنا لمساعدتك، اختر إحدى قنوات التواصل المتاحة
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportOptions.map((option) => (
            <a
              key={option.id}
              href={option.href}
              className="group bg-white rounded-lg border border-gray-100 p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200 text-center"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-xl mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <option.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-hrsd-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {option.title}
              </h3>
              <p className="text-sm text-gray-500 font-hrsd-regular">
                {option.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
