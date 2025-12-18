import { useState } from "react";
import { Link } from "react-router-dom";
import SettingsHeader from "@/components/SettingsHeader";
import Footer from "@/components/Footer";
import { Building2, UserCircle } from "lucide-react";

// Inline SVG for hexagon pattern
const HexagonPattern = () => (
  <svg width="120" height="800" viewBox="0 0 120 800" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[...Array(12)].map((_, row) => (
      [...Array(2)].map((_, col) => {
        const offsetX = col * 52 + (row % 2 === 0 ? 0 : 26);
        const offsetY = row * 60;
        return (
          <polygon
            key={`${row}-${col}`}
            points={`${offsetX + 30},${offsetY} ${offsetX + 52},${offsetY + 13} ${offsetX + 52},${offsetY + 39} ${offsetX + 30},${offsetY + 52} ${offsetX + 8},${offsetY + 39} ${offsetX + 8},${offsetY + 13}`}
            fill="none"
            stroke="#5fbfbf"
            strokeWidth="1.5"
          />
        );
      })
    )).flat()}
  </svg>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"organization" | "representative">("organization");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SettingsHeader />

      {/* Side Hexagon Patterns - Fixed on sides */}
      <div className="fixed right-0 top-0 bottom-0 w-[120px] flex items-center justify-end overflow-hidden opacity-60 z-0 pointer-events-none">
        <HexagonPattern />
      </div>
      <div className="fixed left-0 top-0 bottom-0 w-[120px] flex items-center justify-start overflow-hidden opacity-60 z-0 pointer-events-none">
        <HexagonPattern />
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 relative z-10">
        <div className="max-w-[1100px] mx-auto px-8">
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

          {/* Two Column Layout - RTL */}
          <div className="flex gap-6">
            {/* Right Sidebar - Tab Navigation */}
            <div className="w-56 flex-shrink-0">
              <div className="bg-[#f5f5f5] rounded-lg p-2 space-y-2">
                <button
                  onClick={() => setActiveTab("organization")}
                  className={`w-full flex items-center justify-end gap-3 px-4 py-3 rounded-md font-hrsd-medium text-sm transition-all ${
                    activeTab === "organization"
                      ? "text-white"
                      : "bg-white text-foreground hover:bg-gray-100"
                  }`}
                  style={activeTab === "organization" ? { backgroundColor: "#148287" } : {}}
                >
                  <span>بيانات المنظمة</span>
                  <Building2 className="w-5 h-5" style={{ color: activeTab === "organization" ? "white" : "#f5961e" }} />
                </button>
                <button
                  onClick={() => setActiveTab("representative")}
                  className={`w-full flex items-center justify-end gap-3 px-4 py-3 rounded-md font-hrsd-medium text-sm transition-all ${
                    activeTab === "representative"
                      ? "text-white"
                      : "bg-white text-foreground hover:bg-gray-100"
                  }`}
                  style={activeTab === "representative" ? { backgroundColor: "#148287" } : {}}
                >
                  <span>بيانات ممثل المنظمة</span>
                  <UserCircle className="w-5 h-5" style={{ color: activeTab === "representative" ? "white" : "#f5961e" }} />
                </button>
              </div>
            </div>

            {/* Left Content - Form Panel */}
            <div className="flex-1">
              <div className="bg-[#f5f5f5] rounded-lg overflow-hidden">
                {/* Form Header */}
                <div className="px-6 py-4" style={{ backgroundColor: "#148287" }}>
                  <h2 className="text-white font-hrsd-semibold text-lg text-right">
                    {activeTab === "organization" ? "بيانات المنظمة" : "بيانات ممثل المنظمة"}
                  </h2>
                </div>
                <div className="p-6">
                  {activeTab === "organization" ? (
                    <OrganizationForm />
                  ) : (
                    <RepresentativeForm />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4 py-3 border-b border-gray-200">
    <div className="flex-1">{children}</div>
    <label className="w-40 text-sm font-hrsd-medium text-foreground text-right flex-shrink-0">{label}</label>
  </div>
);

const OrganizationForm = () => {
  return (
    <div>
      <FormField label="اسم المنظمة">
        <input
          type="text"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="اسم المنظمة"
        />
      </FormField>

      <FormField label="المدينة">
        <div className="flex gap-2">
          <button className="px-2 py-1 text-gray-400 text-xs">×</button>
          <select className="flex-1 px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none text-right appearance-none">
            <option>أختر ...</option>
          </select>
        </div>
      </FormField>

      <FormField label="عنوان المنظمة">
        <input
          type="text"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="يرجى كتابة العنوان الكامل"
        />
      </FormField>

      <FormField label="التخصص">
        <div className="flex gap-2">
          <button className="px-2 py-1 text-gray-400 text-xs">×</button>
          <select className="flex-1 px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none text-right appearance-none">
            <option>أختر ...</option>
          </select>
        </div>
      </FormField>

      <FormField label="عدد العاملين بالمنظمة">
        <div className="flex gap-2">
          <button className="px-2 py-1 text-gray-400 text-xs">×</button>
          <select className="flex-1 px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none text-right appearance-none">
            <option>أختر ...</option>
          </select>
        </div>
      </FormField>

      <FormField label="البريد الإلكتروني">
        <input
          type="email"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="البريد الخاص بالمنظمة"
        />
      </FormField>

      <FormField label="الموقع الإلكتروني">
        <input
          type="url"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="الموقع الخاص بالمنظمة"
        />
      </FormField>
    </div>
  );
};

const RepresentativeForm = () => {
  return (
    <div>
      <FormField label="الاسم الكامل">
        <input
          type="text"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="الاسم الكامل"
        />
      </FormField>

      <FormField label="رقم الهوية">
        <input
          type="text"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="رقم الهوية"
        />
      </FormField>

      <FormField label="الجوال">
        <input
          type="tel"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="الجوال"
        />
      </FormField>

      <FormField label="البريد الإلكتروني">
        <input
          type="email"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="البريد الإلكتروني"
        />
      </FormField>

      <FormField label="اسم تسجيل الدخول">
        <input
          type="text"
          className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white font-hrsd text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-right"
          placeholder="اسم تسجيل الدخول"
        />
      </FormField>
    </div>
  );
};

export default Settings;
