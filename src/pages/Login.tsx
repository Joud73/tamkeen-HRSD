import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import GovFooter from "@/components/gov/GovFooter";
import NafathIcon from "@/components/icons/NafathIcon";
import { User, Building2, Users } from "lucide-react";

type AccountType = "individual" | "org";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const typeParam = searchParams.get("type");
  const accountType: AccountType | null = 
    typeParam === "individual" || typeParam === "org" ? typeParam : null;

  const handleSelectType = (type: AccountType) => {
    setSearchParams({ type });
  };

  const handleClearType = () => {
    setSearchParams({});
  };

  const handleNafathLogin = () => {
    navigate(`/nafath-auth?type=${accountType}`, { replace: false });
  };

  const handleLocalLogin = () => {
    navigate(`/login-local?type=${accountType}`, { replace: false });
  };

  // Step A: Type Selection Screen
  if (!accountType) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1D4D37' }}>
        <AppHeader variant="main" />

        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-2xl">
            {/* Glassmorphism Card */}
            <div
              className="rounded-2xl p-10 shadow-2xl border border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <h1 className="text-2xl font-hrsd-title text-center mb-3 text-white">
                تسجيل الدخول
              </h1>
              <p className="text-center text-white/60 font-hrsd-regular text-sm mb-10">
                اختر نوع الحساب للمتابعة
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Individuals Card */}
                <button
                  type="button"
                  onClick={() => navigate("/individual-auth")}
                  className="group p-8 rounded-xl border border-white/15 hover:border-white/30 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4"
                  style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  >
                    <Users size={30} className="text-white" />
                  </div>
                  <span className="text-lg font-hrsd-semibold text-white">
                    أفراد
                  </span>
                  <span className="text-sm text-white/50 font-hrsd-regular text-center">
                    تسجيل الدخول كفرد للوصول إلى خدمات الأفراد
                  </span>
                </button>

                {/* Organizations Card */}
                <button
                  type="button"
                  onClick={() => handleSelectType("org")}
                  className="group p-8 rounded-xl border border-white/15 hover:border-white/30 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4"
                  style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  >
                    <Building2 size={30} className="text-white" />
                  </div>
                  <span className="text-lg font-hrsd-semibold text-white">
                    منظمات
                  </span>
                  <span className="text-sm text-white/50 font-hrsd-regular text-center">
                    تسجيل الدخول كمنظمة للوصول إلى خدمات المنظمات
                  </span>
                </button>
              </div>
            </div>
          </div>
        </main>

        <GovFooter />
      </div>
    );
  }

  // Step B: Login Method Selection Screen
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1D4D37' }}>
      <AppHeader variant="main" />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div
            className="rounded-2xl p-10 shadow-2xl border border-white/10"
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <h1 className="text-2xl font-hrsd-title text-center mb-3 text-white">
              اختر طريقة تسجيل الدخول
            </h1>
            
            {/* Change type link */}
            <div className="text-center mb-8">
              <button
                type="button"
                onClick={handleClearType}
                className="text-sm font-hrsd-medium hover:underline text-white/50 hover:text-white/80 transition-colors"
              >
                تغيير نوع الدخول
              </button>
            </div>

            {/* Nafath Login Button - Primary */}
            <button
              type="button"
              onClick={handleNafathLogin}
              aria-label="تسجيل الدخول عبر نفاذ الوطني"
              className="w-full py-4 rounded-xl text-white font-hrsd-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/30 mb-4"
              style={{ backgroundColor: 'hsl(175, 75%, 30%)' }}
            >
              <NafathIcon size={24} className="text-white" />
              <span>تسجيل الدخول عبر نفاذ</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/15" />
              <span className="text-white/40 text-sm font-hrsd-medium">أو</span>
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {/* Local Login Button - Secondary */}
            <button
              type="button"
              onClick={handleLocalLogin}
              aria-label="تسجيل الدخول باستخدام اسم المستخدم وكلمة المرور"
              className="w-full py-4 rounded-xl font-hrsd-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20 text-white"
            >
              <User size={22} />
              <span>اسم المستخدم وكلمة المرور</span>
            </button>

            {/* Individuals Journey Link */}
            {accountType === "individual" && (
              <div className="text-center mt-4">
                <Link
                  to="/individuals-journey"
                  className="text-sm font-hrsd-medium hover:underline"
                  style={{ color: 'hsl(35, 91%, 54%)' }}
                >
                  الدخول عبر رحلة الأفراد
                </Link>
              </div>
            )}

            {/* Links */}
            <div className="flex items-center justify-center gap-4 pt-6 mt-6 border-t border-white/10">
              <Link
                to={`/register?type=${accountType}`}
                className="text-sm font-hrsd-medium hover:underline text-white/60 hover:text-white transition-colors"
              >
                تسجيل جديد
              </Link>
            </div>
          </div>
        </div>
      </main>

      <GovFooter />
    </div>
  );
};

export default Login;
