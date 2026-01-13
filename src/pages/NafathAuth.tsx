import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import loginBg from "@/assets/login-bg.jpg";

const NafathAuth = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"pending" | "verifying" | "success" | "error">("pending");
  const [nafathCode] = useState(() => Math.floor(10 + Math.random() * 90)); // Random 2-digit code

  useEffect(() => {
    // Simulate Nafath verification flow
    const timer1 = setTimeout(() => setStatus("verifying"), 3000);
    const timer2 = setTimeout(() => {
      setStatus("success");
      localStorage.setItem("authRole", "nafath");
      setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className="flex-1 relative pt-20"
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
            background:
              "linear-gradient(to bottom, rgba(20, 80, 85, 0.75) 0%, rgba(15, 60, 65, 0.85) 100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center justify-end gap-2 mb-8 text-sm">
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-hrsd-medium"
              style={{ color: "hsl(175, 75%, 45%)" }}
            >
              العودة الى صفحة تسجيل الدخول
            </button>
            <span className="text-white/80">&gt;</span>
            <span className="text-white font-hrsd-medium">تسجيل الدخول عبر نفاذ</span>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 mb-8" style={{ backgroundColor: "hsl(35, 91%, 54%)" }} />

          {/* Card */}
          <div className="max-w-md mx-auto">
            <div
              className="rounded-xl p-8 shadow-lg text-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.97)" }}
            >
              {/* Nafath Icon */}
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "hsl(200, 70%, 35%)" }}
              >
                <Fingerprint className="w-10 h-10 text-white" />
              </div>

              <h1
                className="text-xl font-hrsd-title mb-4"
                style={{ color: "hsl(35, 91%, 54%)" }}
              >
                تسجيل الدخول عبر نفاذ
              </h1>

              {status === "pending" && (
                <>
                  <p className="text-gray-600 font-hrsd mb-6">
                    افتح تطبيق نفاذ على جوالك واختر الرقم التالي للمصادقة
                  </p>

                  {/* Nafath Code Display */}
                  <div
                    className="text-5xl font-hrsd-bold py-6 px-8 rounded-xl mb-6 inline-block"
                    style={{ 
                      backgroundColor: "hsl(200, 70%, 95%)",
                      color: "hsl(200, 70%, 35%)",
                    }}
                  >
                    {nafathCode}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-hrsd">في انتظار المصادقة...</span>
                  </div>
                </>
              )}

              {status === "verifying" && (
                <>
                  <p className="text-gray-600 font-hrsd mb-6">
                    جاري التحقق من هويتك...
                  </p>
                  <Loader2 
                    className="w-12 h-12 animate-spin mx-auto" 
                    style={{ color: "hsl(200, 70%, 35%)" }}
                  />
                </>
              )}

              {status === "success" && (
                <>
                  <p className="text-green-600 font-hrsd-semibold mb-4">
                    ✓ تم التحقق بنجاح
                  </p>
                  <p className="text-gray-500 font-hrsd">
                    جاري تحويلك إلى لوحة التحكم...
                  </p>
                </>
              )}

              {status === "error" && (
                <>
                  <p className="text-red-600 font-hrsd-semibold mb-4">
                    فشل التحقق، يرجى المحاولة مرة أخرى
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 rounded-lg text-white font-hrsd-medium transition-colors"
                    style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
                  >
                    العودة لصفحة الدخول
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NafathAuth;
