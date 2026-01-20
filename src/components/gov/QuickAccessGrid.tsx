import { FileText, Users, Building2, Briefcase, Calendar, Shield, Heart, BookOpen } from "lucide-react";

const quickAccessItems = [
  { icon: FileText, title: "الخدمات الإلكترونية", href: "#" },
  { icon: Users, title: "خدمات الأفراد", href: "#" },
  { icon: Building2, title: "خدمات المنشآت", href: "#" },
  { icon: Briefcase, title: "سوق العمل", href: "#" },
  { icon: Calendar, title: "حجز موعد", href: "#" },
  { icon: Shield, title: "الحماية الاجتماعية", href: "#" },
  { icon: Heart, title: "التنمية الاجتماعية", href: "#" },
  { icon: BookOpen, title: "الأنظمة واللوائح", href: "#" },
];

export default function QuickAccessGrid() {
  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {quickAccessItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-3 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-hrsd-medium text-gray-700 text-center group-hover:text-primary transition-colors">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
