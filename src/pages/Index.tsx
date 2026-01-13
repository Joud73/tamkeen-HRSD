import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import loginBg from "@/assets/login-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className="flex-1 relative flex items-center justify-center"
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
            background:
              "linear-gradient(to bottom, rgba(20, 80, 85, 0.75) 0%, rgba(15, 60, 65, 0.85) 100%)",
          }}
        />

        {/* Centered Content */}
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-4xl md:text-5xl font-hrsd-title mb-4"
            style={{ color: "hsl(35, 91%, 54%)" }}
          >
            مرحبًا بك في المنصة
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 font-hrsd mb-8 max-w-lg mx-auto">
            يرجى تسجيل الدخول للمتابعة والاستفادة من الخدمات المتاحة
          </p>

          <button
            type="button"
            onClick={handleLogin}
            aria-label="الانتقال إلى صفحة تسجيل الدخول"
            className="px-8 py-4 rounded-lg text-white font-hrsd-medium text-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
            style={{ backgroundColor: "hsl(175, 75%, 30%)" }}
          >
            تسجيل الدخول
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
