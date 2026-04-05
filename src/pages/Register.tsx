import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Headphones, Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import OrganizationJourney from "@/components/OrganizationJourney";
import { supabase } from "@/integrations/supabase/client";
import loginBg from "@/assets/hero-bg.png";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [organizationName, setOrganizationName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("1000");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 fields
  const [email, setEmail] = useState("");

  // Step 2 fields (delegate)
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [delegateEmail, setDelegateEmail] = useState("");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!organizationName) {
      setError("يرجى اختيار اسم المنظمة");
      return;
    }
    if (!email) {
      setError("يرجى إدخال البريد الإلكتروني");
      return;
    }

    setCurrentStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!fullName || !idNumber || !mobile || !delegateEmail) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      setIsLoading(false);
      return;
    }

    // Insert into organization_requests table (no auth user created)
    const { error: insertError } = await supabase
      .from("organization_requests" as any)
      .insert({
        organization_name: organizationName,
        registration_number: registrationNumber,
        email,
        delegate_name: fullName,
        delegate_id_number: idNumber,
        delegate_mobile: mobile,
        delegate_email: delegateEmail,
        request_status: "pending",
      } as any);

    if (insertError) {
      console.error("Organization request submission failed");
      if (insertError.message?.includes("duplicate") || insertError.code === "23505") {
        setError("يوجد طلب مسجل مسبقاً بهذا البريد الإلكتروني أو رقم التسجيل");
      } else {
        setError("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى");
      }
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setCurrentStep(3); // Success screen
  };

  // Step indicator component
  const StepIndicator = () => {
    const visualStep = currentStep >= 3 ? 2 : currentStep;

    const getStepStyle = (step: number) => {
      if (currentStep === 3) {
        return { bg: "#e5e7eb", text: "#6b7280", labelColor: "#6b7280" };
      }
      if (step === visualStep) {
        return { bg: "hsl(35, 91%, 54%)", text: "white", labelColor: "white" };
      } else if (step < visualStep) {
        return { bg: "hsl(35, 91%, 70%)", text: "white", labelColor: "white" };
      } else {
        return { bg: "#e5e7eb", text: "#9ca3af", labelColor: "#9ca3af" };
      }
    };

    return (
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />
        <div className="relative flex items-center justify-between flex-row-reverse">
          <div className="flex flex-col items-center">
            <div
              className="px-6 py-3 rounded-lg flex flex-col items-center min-w-[120px]"
              style={{ backgroundColor: getStepStyle(1).bg }}
            >
              <span className="font-hrsd-bold text-lg" style={{ color: getStepStyle(1).text }}>1</span>
              <span className="font-hrsd-medium text-sm" style={{ color: getStepStyle(1).labelColor }}>بيانات المنظمة</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="px-6 py-3 rounded-lg flex flex-col items-center min-w-[120px]"
              style={{ backgroundColor: getStepStyle(2).bg }}
            >
              <span className="font-hrsd-bold text-lg" style={{ color: getStepStyle(2).text }}>2</span>
              <span className="font-hrsd-medium text-sm" style={{ color: getStepStyle(2).labelColor }}>بيانات المفوض</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Step 1 Form — Organization data
  const Step1Form = () => (
    <form onSubmit={handleStep1Submit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-right">
          <p className="text-red-600 text-sm font-hrsd">{error}</p>
        </div>
      )}

      {/* Organization Name */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">اسم المنظمة</label>
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
              {["منظمة تجريبية 1", "منظمة تجريبية 2"].map((name) => (
                <button
                  key={name}
                  type="button"
                  className="w-full px-4 py-3 text-right font-hrsd hover:bg-gray-50 transition-colors"
                  onClick={() => { setOrganizationName(name); setIsDropdownOpen(false); }}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Registration Number */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">رقم التسجيل</label>
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          dir="ltr"
          style={{ textAlign: "right" }}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="example@domain.com"
          dir="ltr"
          style={{ textAlign: "right" }}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white font-hrsd-semibold text-lg transition-colors hover:opacity-90"
        style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
      >
        التالي
      </button>
    </form>
  );

  // Step 2 Form — Delegate data
  const Step2Form = () => (
    <form onSubmit={handleStep2Submit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-right">
          <p className="text-red-600 text-sm font-hrsd">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">الاسم الكامل</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
          placeholder="اسم ممثل المنظمة"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">رقم الهوية</label>
        <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)}
          placeholder="رقم الهوية الخاصة بممثل المنظمة"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">الجوال</label>
        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
          placeholder="9665XXXXXXXX"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
          dir="ltr" style={{ textAlign: "right" }}
        />
      </div>

      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">البريد الإلكتروني</label>
        <input type="email" value={delegateEmail} onChange={(e) => setDelegateEmail(e.target.value)}
          placeholder="example@domain.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
          dir="ltr" style={{ textAlign: "right" }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg text-white font-hrsd-semibold text-lg transition-colors hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
      >
        {isLoading ? "جاري الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );

  // Success Screen
  const SuccessScreen = () => (
    <div className="flex flex-col items-center py-8">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
      >
        <Check className="w-10 h-10 text-white" strokeWidth={3} />
      </div>

      <h2 className="font-hrsd-bold text-2xl text-gray-800 mb-4 text-center">
        تم استلام طلبك بنجاح
      </h2>

      <p className="font-hrsd text-gray-600 text-center mb-8 leading-relaxed max-w-md">
        تم تسجيل طلب إنشاء حساب المنظمة. سيقوم مدير النظام بمراجعة الطلب وإنشاء الحساب.
        ستصلك رسالة عند الموافقة على الطلب.
      </p>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full py-3 rounded-lg text-white font-hrsd-semibold text-lg transition-colors hover:opacity-90"
        style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
      >
        العودة إلى تسجيل الدخول
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="h-20" />

      <main
        className="flex-1 relative"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(20, 80, 85, 0.75) 0%, rgba(15, 60, 65, 0.85) 100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-8">
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

          <div className="w-full h-0.5 mb-8" style={{ backgroundColor: "hsl(35, 91%, 54%)" }} />

          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-xl p-8 shadow-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.97)" }}
            >
              <h1
                className="text-xl font-hrsd-title text-right mb-6"
                style={{ color: "hsl(35, 91%, 54%)" }}
              >
                بيانات إنشاء حساب المنظمة
              </h1>

              <StepIndicator />

              {currentStep === 1 && <Step1Form />}
              {currentStep === 2 && <Step2Form />}
              {currentStep === 3 && <SuccessScreen />}
            </div>

            {currentStep !== 3 && (
              <div
                className="mt-6 rounded-xl p-4 flex items-center justify-between"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-hrsd-medium text-white text-sm transition-colors hover:opacity-90"
                  style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
                >
                  <Headphones className="w-4 h-4" />
                  تواصل معنا
                </button>
                <span className="font-hrsd text-gray-600 text-sm">
                  للاستفسارات والدعم الفني، يرجى التواصل معنا
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
