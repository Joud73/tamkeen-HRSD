import { useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";

const tabs = [
  { id: "ministry", label: "خدمات الوزارة" },
  { id: "platforms", label: "المنصات الرقمية" },
];

const services = [
  {
    id: 1,
    title: "حجز موعد الكتروني",
    description: "تمكن خدمة حجز المواعيد الالكترونية المستفيدين من حجز موعد لزيارة فروع الوزارة",
    category: "ministry",
  },
  {
    id: 2,
    title: "خدمة تحديث بيانات الحاضن لذوي الإعاقة",
    description: "خدمة تتيح للمستفيد تحديث بيانات الحاضن لذوي الإعاقة",
    category: "ministry",
  },
  {
    id: 3,
    title: "الاعتراض على إيقاف الإعانة المالية لذوي الإعاقة",
    description: "خدمة تتيح للمستفيد الاعتراض على إيقاف الإعانة المالية",
    category: "ministry",
  },
  {
    id: 4,
    title: "انهاء العلاقة التعاقدية",
    description: "خدمة الكترونية تسمح للموظف بإنهاء العقد مع صاحب العمل",
    category: "ministry",
  },
  {
    id: 5,
    title: "منصة مُدد",
    description: "منصة رقمية لإدارة الرواتب والأجور",
    category: "platforms",
  },
  {
    id: 6,
    title: "منصة قوى",
    description: "منصة سوق العمل السعودي",
    category: "platforms",
  },
];

export default function ServicesExplorer() {
  const [activeTab, setActiveTab] = useState("ministry");

  const filteredServices = services.filter((s) => s.category === activeTab);

  return (
    <section className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-hrsd-bold text-gray-900 mb-4">
              خدمات الوزارة
            </h2>
            <p className="text-gray-600 font-hrsd-regular max-w-2xl leading-relaxed">
              تحول رقمي متكامل تقدمه وزارة الموارد البشرية والتنمية الاجتماعية عبر
              مجموعة من الخدمات والمنصات الرقمية، بهدف تسهيل الإجراءات على
              المستفيدين وتمكينهم من إنجاز معاملاتهم بسرعة وكفاءة.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-hrsd-medium"
          >
            تصفح الجميع
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-hrsd-medium text-base transition-colors relative ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredServices.map((service) => (
            <a
              key={service.id}
              href="#"
              className="group bg-white rounded-lg border border-gray-100 p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="text-base font-hrsd-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 font-hrsd-regular leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
