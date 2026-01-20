import { ExternalLink, Building, Briefcase, Users, Shield, GraduationCap, Heart } from "lucide-react";

const platforms = [
  {
    id: 1,
    icon: Briefcase,
    title: "منصة قوى",
    description: "منصة سوق العمل السعودي",
    href: "#",
  },
  {
    id: 2,
    icon: Building,
    title: "منصة مُدد",
    description: "إدارة الرواتب والأجور",
    href: "#",
  },
  {
    id: 3,
    icon: Shield,
    title: "منصة حماية الأجور",
    description: "نظام حماية الأجور",
    href: "#",
  },
  {
    id: 4,
    icon: Users,
    title: "منصة مسار",
    description: "الموارد البشرية الحكومية",
    href: "#",
  },
  {
    id: 5,
    icon: Heart,
    title: "منصة الضمان الاجتماعي",
    description: "خدمات الضمان الاجتماعي",
    href: "#",
  },
  {
    id: 6,
    icon: GraduationCap,
    title: "منصة هدف",
    description: "دعم التوظيف والتدريب",
    href: "#",
  },
];

export default function PlatformsGrid() {
  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-right mb-10">
          <h2 className="text-2xl md:text-3xl font-hrsd-bold text-gray-900 mb-4">
            المنصات الرقمية
          </h2>
          <p className="text-gray-600 font-hrsd-regular max-w-2xl leading-relaxed">
            مجموعة من المنصات الرقمية المتكاملة لخدمة المستفيدين
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.href}
              className="group flex items-center gap-4 bg-gray-50 rounded-lg border border-gray-100 p-5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg shrink-0">
                <platform.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-hrsd-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {platform.title}
                </h3>
                <p className="text-sm text-gray-500 font-hrsd-regular truncate">
                  {platform.description}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
