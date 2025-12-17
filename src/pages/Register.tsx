import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Headphones, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import loginBg from "@/assets/login-bg.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [organizationName, setOrganizationName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("1000");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  
  // Step 3 fields
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4); // Go to success screen
  };

  // Step indicator component
  const StepIndicator = () => {
    const getStepStyle = (step: number) => {
      // On success screen (step 4), all steps are completed (grey)
      if (currentStep === 4) {
        return {
          bg: "#e5e7eb",
          text: "#6b7280",
          labelColor: "#6b7280"
        };
      }
      
      if (step === currentStep) {
        // Active step - strong orange
        return {
          bg: "hsl(35, 91%, 54%)",
          text: "white",
          labelColor: "white"
        };
      } else if (step < currentStep) {
        // Completed step - lighter orange
        return {
          bg: "hsl(35, 91%, 70%)",
          text: "white",
          labelColor: "white"
        };
      } else {
        // Inactive step - gray
        return {
          bg: "#e5e7eb",
          text: "#9ca3af",
          labelColor: "#9ca3af"
        };
      }
    };

    return (
      <div className="relative mb-8">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />
        
        {/* Steps - RTL order: Step 1 on right, Step 3 on left */}
        <div className="relative flex items-center justify-between flex-row-reverse">
          {/* Step 1 - بيانات المنظمة (rightmost in RTL) */}
          <div className="flex flex-col items-center">
            <div
              className="px-6 py-3 rounded-lg flex flex-col items-center min-w-[120px]"
              style={{ backgroundColor: getStepStyle(1).bg }}
            >
              <span 
                className="font-hrsd-bold text-lg"
                style={{ color: getStepStyle(1).text }}
              >
                1
              </span>
              <span 
                className="font-hrsd-medium text-sm"
                style={{ color: getStepStyle(1).labelColor }}
              >
                بيانات المنظمة
              </span>
            </div>
          </div>

          {/* Step 2 - بيانات التحقق (middle) */}
          <div className="flex flex-col items-center">
            <div
              className="px-6 py-3 rounded-lg flex flex-col items-center min-w-[120px]"
              style={{ backgroundColor: getStepStyle(2).bg }}
            >
              <span 
                className="font-hrsd-bold text-lg"
                style={{ color: getStepStyle(2).text }}
              >
                2
              </span>
              <span 
                className="font-hrsd-medium text-sm"
                style={{ color: getStepStyle(2).labelColor }}
              >
                بيانات التحقق
              </span>
            </div>
          </div>

          {/* Step 3 - بيانات المفوض (leftmost in RTL) */}
          <div className="flex flex-col items-center">
            <div
              className="px-6 py-3 rounded-lg flex flex-col items-center min-w-[120px]"
              style={{ backgroundColor: getStepStyle(3).bg }}
            >
              <span 
                className="font-hrsd-bold text-lg"
                style={{ color: getStepStyle(3).text }}
              >
                3
              </span>
              <span 
                className="font-hrsd-medium text-sm"
                style={{ color: getStepStyle(3).labelColor }}
              >
                بيانات المفوض
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Step 1 Form
  const Step1Form = () => (
    <form onSubmit={handleStep1Submit} className="space-y-6">
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
  );

  // Step 2 Form - Verification
  const Step2Form = () => (
    <form onSubmit={handleStep2Submit} className="space-y-6">
      {/* Info message */}
      <p className="text-right font-hrsd text-gray-600 text-sm">
        تم ارسال كود التحقق الى البريد <span dir="ltr" className="inline-block">aq****@ngotamkeen.com</span>
      </p>

      {/* Verification Code Field */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          كود التحقق
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="يرجى إدخال كود التحقق الذي تم إرساله إلى بريد المفوض عن المنظمة"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 placeholder:text-sm"
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
  );

  // Step 3 Form - Authorized Person Details
  const Step3Form = () => (
    <form onSubmit={handleStep3Submit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          الاسم الكامل
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="اسم ممثل المنظمة"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
        />
      </div>

      {/* ID Number */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          رقم الهوية
        </label>
        <input
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          placeholder="رقم الهوية الخاصة بممثل المنظمة"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
        />
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          الجوال
        </label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="9665XXXXXXXX"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
          dir="ltr"
          style={{ textAlign: "right" }}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@domain.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400 bg-gray-50"
          dir="ltr"
          style={{ textAlign: "right" }}
        />
      </div>

      {/* Login Name */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          اسم تسجيل الدخول
        </label>
        <input
          type="text"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-gray-50"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          كلمة المرور
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-gray-50"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-right text-sm font-hrsd-medium mb-2 text-gray-700">
          تأكيد كلمة المرور
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-right font-hrsd focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-gray-50"
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
        حفظ
      </button>
    </form>
  );

  // Success Screen
  const SuccessScreen = () => (
    <div className="flex flex-col items-center py-8">
      {/* Success Icon */}
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
      >
        <Check className="w-10 h-10 text-white" strokeWidth={3} />
      </div>

      {/* Success Message */}
      <h2 className="font-hrsd-bold text-2xl text-gray-800 mb-4 text-center">
        تم تفعيل حسابك بنجاح
      </h2>
      
      <p className="font-hrsd text-gray-600 text-center mb-8 leading-relaxed max-w-md">
        لقد قمت بإنشاء حساب ضمن أداة التقييم الفني. يمكنك الآن تسجيل الدخول باستخدام رقم الهوية وكلمة المرور.
      </p>

      {/* Login Button */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full py-3 rounded-lg text-white font-hrsd-semibold text-lg transition-colors hover:opacity-90"
        style={{
          backgroundColor: "hsl(175, 75%, 30%)",
        }}
      >
        تسجيل الدخول
      </button>
    </div>
  );

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
          <div className="max-w-3xl mx-auto">
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
              <StepIndicator />

              {/* Form Content based on current step */}
              {currentStep === 1 && <Step1Form />}
              {currentStep === 2 && <Step2Form />}
              {currentStep === 3 && <Step3Form />}
              {currentStep === 4 && <SuccessScreen />}
            </div>

            {/* Contact Info Bar - hide on success screen */}
            {currentStep !== 4 && (
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
            )}
          </div>
        </div>
      </main>

      {/* Footer - reused from homepage */}
      <Footer />
    </div>
  );
};

export default Register;
