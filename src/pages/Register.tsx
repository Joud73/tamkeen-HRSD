import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Headphones } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import loginBg from "@/assets/login-bg.jpg";

const Register = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("1000");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", { organizationName, registrationNumber });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - reused from homepage */}
      <Header />

      {/* Main content with background */}
      <main
        className="flex-1 relative pt-20"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark teal overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(20, 80, 85, 0.75) 0%, rgba(15, 60, 65, 0.85) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center justify-end gap-2 mb-6 text-sm">
            <Link
              to="/login"
              className="text-primary hover:underline font-hrsd-medium"
              style={{ color: "hsl(175, 75%, 45%)" }}
            >
              العودة الى صفحة الدخول
            </Link>
            <span className="text-white/80">&gt;</span>
            <span className="text-white font-hrsd-medium">حساب منظمة جديد</span>
          </div>

          {/* Orange line under breadcrumb */}
          <div
            className="w-full h-0.5 mb-8"
            style={{ backgroundColor: "hsl(35, 91%, 54%)" }}
          />

          {/* Registration Card */}
          <div className="max-w-xl mx-auto">
            <div
              className="rounded-xl p-8 shadow-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.97)" }}
            >
              {/* Card Title */}
              <h1
                className="text-xl font-hrsd-title text-right mb-6"
                style={{ color: "hsl(35, 91%, 54%)" }}
              >
                بيانات إنشاء حساب المنظمة
              </h1>

              {/* Step Indicator */}
              <div className="relative mb-8">
                {/* Background line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />
                
                {/* Steps */}
                <div className="relative flex items-center justify-between">
                  {/* Step 3 - بيانات المفوض (leftmost in RTL) */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-hrsd-semibold text-sm mb-2">
                      3
                    </div>
                    <span className="text-gray-400 font-hrsd-medium text-sm">بيانات المفوض</span>
                  </div>

                  {/* Step 2 - بيانات التحقق */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-hrsd-semibold text-sm mb-2">
                      2
                    </div>
                    <span className="text-gray-400 font-hrsd-medium text-sm">بيانات التحقق</span>
                  </div>

                  {/* Step 1 - بيانات المنظمة (rightmost in RTL, active) */}
                  <div className="flex flex-col items-center">
                    <div
                      className="px-6 py-3 rounded-lg flex flex-col items-center"
                      style={{ backgroundColor: "hsl(35, 91%, 54%)" }}
                    >
                      <span className="text-white font-hrsd-bold text-lg">1</span>
                      <span className="text-white font-hrsd-medium text-sm">بيانات المنظمة</span>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Name Field (Dropdown) */}
                <div>
                  <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
                    اسم المنظمة
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary flex items-center justify-between"
                    >
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      <span className={organizationName ? 'text-gray-900' : 'text-gray-400'}>
                        {organizationName || 'اختر ...'}
                      </span>
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          type="button"
                          className="w-full px-4 py-3 text-right font-hrsd hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setOrganizationName("منظمة تجريبية 1");
                            setIsDropdownOpen(false);
                          }}
                        >
                          منظمة تجريبية 1
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-3 text-right font-hrsd hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setOrganizationName("منظمة تجريبية 2");
                            setIsDropdownOpen(false);
                          }}
                        >
                          منظمة تجريبية 2
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Registration Number Field */}
                <div>
                  <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
                    رقم التسجيل
                  </label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    dir="ltr"
                    style={{ textAlign: "right" }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-white font-hrsd-semibold text-lg transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: "hsl(175, 75%, 30%)",
                  }}
                >
                  التالي
                </button>
              </form>
            </div>

            {/* Contact Info Bar */}
            <div
              className="mt-6 rounded-xl p-4 flex items-center justify-between"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-hrsd-semibold transition-colors hover:opacity-90"
                style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
              >
                <Headphones className="w-5 h-5" />
                <span>تواصل معنا</span>
              </button>
              <p
                className="font-hrsd text-sm"
                style={{ color: "hsl(175, 75%, 35%)" }}
              >
                اذا كان لديكم أي استفسار او ملاحظة نسعد بتواصلكم معنا . . .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - reused from homepage */}
      <Footer />
    </div>
  );
};

export default Register;