import { useState } from "react";
import { Link } from "react-router-dom";
import SettingsHeader from "@/components/SettingsHeader";
import Footer from "@/components/Footer";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"organization" | "representative">("organization");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SettingsHeader />

      {/* Side Hexagon Patterns */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 w-20 h-96 opacity-20 z-0">
        <svg viewBox="0 0 80 400" fill="none" className="w-full h-full">
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"
              stroke="#148287"
              strokeWidth="1"
              fill="none"
              transform={`translate(0, ${i * 50})`}
            />
          ))}
        </svg>
      </div>
      <div className="fixed left-0 top-1/2 -translate-y-1/2 w-20 h-96 opacity-20 z-0">
        <svg viewBox="0 0 80 400" fill="none" className="w-full h-full">
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"
              stroke="#148287"
              strokeWidth="1"
              fill="none"
              transform={`translate(0, ${i * 50})`}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <p className="text-sm font-hrsd-medium text-muted-foreground">
              <Link to="/dashboard" className="hover:text-primary transition-colors">
                العودة إلى لوحة التحكم
              </Link>
              <span className="mx-2">&gt;</span>
              <span style={{ color: "#f5961e" }}>بيانات المنظمة</span>
            </p>
            <div className="mt-3 h-0.5 w-full" style={{ backgroundColor: "#148287" }} />
          </div>

          {/* Two Column Layout */}
          <div className="flex gap-6">
            {/* Right Sidebar - Tab Navigation */}
            <div className="w-64 flex-shrink-0">
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("organization")}
                  className={`w-full text-right px-4 py-3 rounded-lg font-hrsd-medium text-sm transition-all ${
                    activeTab === "organization"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                >
                  بيانات المنظمة
                </button>
                <button
                  onClick={() => setActiveTab("representative")}
                  className={`w-full text-right px-4 py-3 rounded-lg font-hrsd-medium text-sm transition-all ${
                    activeTab === "representative"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                >
                  بيانات ممثل المنظمة
                </button>
              </div>
            </div>

            {/* Left Content - Form Panel */}
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-8">
                {activeTab === "organization" ? (
                  <OrganizationForm />
                ) : (
                  <RepresentativeForm />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const OrganizationForm = () => {
  return (
    <div className="space-y-6">
      {/* Organization Name */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">اسم المنظمة</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="اسم المنظمة"
          defaultValue="جمعية التنمية الأهلية"
        />
      </div>

      {/* Registration Number */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">رقم التسجيل</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="رقم التسجيل"
          defaultValue="1000"
        />
      </div>

      {/* Region */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">المنطقة</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
          <option>الرياض</option>
          <option>مكة المكرمة</option>
          <option>المدينة المنورة</option>
          <option>الشرقية</option>
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">المدينة</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
          <option>الرياض</option>
          <option>جدة</option>
          <option>الدمام</option>
        </select>
      </div>

      {/* Organization Type */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">نوع المنظمة</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
          <option>جمعية أهلية</option>
          <option>مؤسسة أهلية</option>
          <option>اتحاد</option>
        </select>
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">التخصص</label>
        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none">
          <option>تنمية اجتماعية</option>
          <option>صحية</option>
          <option>تعليمية</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          className="px-8 py-3 rounded-lg font-hrsd-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: "#148287" }}
        >
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

const RepresentativeForm = () => {
  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">الاسم الكامل</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="الاسم الكامل"
          defaultValue="محمد أحمد العبدالله"
        />
      </div>

      {/* ID Number */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">رقم الهوية</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="رقم الهوية"
          defaultValue="1234567890"
        />
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">الجوال</label>
        <input
          type="tel"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="الجوال"
          defaultValue="0501234567"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">البريد الإلكتروني</label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="البريد الإلكتروني"
          defaultValue="email@example.com"
        />
      </div>

      {/* Login Name */}
      <div>
        <label className="block text-sm font-hrsd-medium text-foreground mb-2">اسم تسجيل الدخول</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          placeholder="اسم تسجيل الدخول"
          defaultValue="username"
        />
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          className="px-8 py-3 rounded-lg font-hrsd-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: "#148287" }}
        >
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

export default Settings;
