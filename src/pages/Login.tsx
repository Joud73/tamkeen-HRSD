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

  const pageShell = (children: React.ReactNode) => (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(160deg, #F4F9F7 0%, #E6F2EE 40%, #F9FAFB 100%)' }}
    >
      <AppHeader variant="main" />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        {children}
      </main>
      <GovFooter />
    </div>
  );

  // Step A: Type Selection
  if (!accountType) {
    return pageShell(
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl p-10 md:p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100/60">
          <h1
            className="text-2xl font-hrsd-title text-center mb-2"
            style={{ color: '#1D4D37' }}
          >
            تسجيل الدخول
          </h1>
          <p className="text-center text-gray-400 font-hrsd-regular text-sm mb-10">
            اختر نوع الحساب للمتابعة
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Individuals */}
            <button
              type="button"
              onClick={() => navigate("/individual-auth")}
              className="group p-7 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-emerald-50 group-hover:scale-105 transition-transform duration-300">
                <Users size={26} className="text-emerald-600/70" />
              </div>
              <span className="text-base font-hrsd-semibold text-gray-800">أفراد</span>
              <span className="text-xs text-gray-400 font-hrsd-regular text-center leading-relaxed">
                تسجيل الدخول كفرد للوصول إلى خدمات الأفراد
              </span>
            </button>

            {/* Organizations */}
            <button
              type="button"
              onClick={() => handleSelectType("org")}
              className="group p-7 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-amber-50 group-hover:scale-105 transition-transform duration-300">
                <Building2 size={26} className="text-amber-600/70" />
              </div>
              <span className="text-base font-hrsd-semibold text-gray-800">منظمات</span>
              <span className="text-xs text-gray-400 font-hrsd-regular text-center leading-relaxed">
                تسجيل الدخول كمنظمة للوصول إلى خدمات المنظمات
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step B: Login Method Selection
  return pageShell(
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl p-10 md:p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100/60">
        <h1
          className="text-2xl font-hrsd-title text-center mb-2"
          style={{ color: '#1D4D37' }}
        >
          اختر طريقة تسجيل الدخول
        </h1>

        <div className="text-center mb-9">
          <button
            type="button"
            onClick={handleClearType}
            className="text-sm font-hrsd-medium text-gray-400 hover:text-emerald-700 transition-colors"
          >
            تغيير نوع الدخول
          </button>
        </div>

        {/* Nafath */}
        <button
          type="button"
          onClick={handleNafathLogin}
          className="w-full py-3.5 rounded-xl text-white font-hrsd-medium text-base transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300 mb-4"
          style={{ backgroundColor: '#1B8354' }}
        >
          <NafathIcon size={22} className="text-white" />
          <span>تسجيل الدخول عبر نفاذ</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-300 text-xs font-hrsd-medium">أو</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Local Login */}
        <button
          type="button"
          onClick={handleLocalLogin}
          className="w-full py-3.5 rounded-xl font-hrsd-medium text-base transition-all duration-300 flex items-center justify-center gap-3 border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/40 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <User size={20} />
          <span>اسم المستخدم وكلمة المرور</span>
        </button>

        {accountType === "individual" && (
          <div className="text-center mt-5">
            <Link
              to="/individuals-journey"
              className="text-sm font-hrsd-medium hover:underline"
              style={{ color: 'hsl(35, 91%, 50%)' }}
            >
              الدخول عبر رحلة الأفراد
            </Link>
          </div>
        )}

        <div className="flex items-center justify-center pt-7 mt-7 border-t border-gray-100">
          <Link
            to={`/register?type=${accountType}`}
            className="text-sm font-hrsd-medium text-gray-400 hover:text-emerald-700 transition-colors"
          >
            تسجيل جديد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
