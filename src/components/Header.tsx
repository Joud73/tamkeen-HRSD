import { useState } from "react";
import { ChevronDown, HelpCircle, FileText, Video, Headphones } from "lucide-react";

// Placeholder logos - will be replaced with actual logos from ZIP file
const HRSDLogo = () => (
  <div className="flex items-center gap-3">
    <div className="w-16 h-16 flex items-center justify-center">
      {/* Ministry Logo - Star shape placeholder */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35" 
          fill="#148287"
        />
        <polygon 
          points="50,20 56,38 75,38 60,50 66,68 50,56 34,68 40,50 25,38 44,38" 
          fill="#f5961e"
        />
        <polygon 
          points="50,30 53,40 62,40 55,47 58,57 50,50 42,57 45,47 38,40 47,40" 
          fill="#2db473"
        />
      </svg>
    </div>
    <div className="text-right leading-tight">
      <div className="text-lg font-hrsd-bold text-primary">الموارد البشرية</div>
      <div className="text-sm font-hrsd text-primary">والتنمية الاجتماعية</div>
    </div>
  </div>
);

const Vision2030Logo = () => (
  <div className="flex items-center gap-2 text-right">
    <div className="leading-tight">
      <div className="text-xs text-muted-foreground">VISION</div>
      <div className="text-2xl font-hrsd-bold text-primary">2030</div>
      <div className="text-[8px] text-muted-foreground leading-none">
        <div>المملكة العربية السعودية</div>
        <div>KINGDOM OF SAUDI ARABIA</div>
      </div>
    </div>
    <div className="text-xs text-muted-foreground">رؤيـــــة</div>
  </div>
);

const Header = () => {
  const [isGuideDropdownOpen, setIsGuideDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Right side - Logos */}
          <div className="flex items-center gap-6">
            <HRSDLogo />
            <div className="h-12 w-px bg-border" />
            <Vision2030Logo />
          </div>

          {/* Left side - Navigation */}
          <nav className="flex items-center gap-6">
            {/* Technical Guide Link */}
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm font-hrsd-medium text-foreground hover:text-primary transition-colors"
            >
              <FileText className="w-5 h-5" />
              دليل الكفاءة الفنية
            </a>

            {/* Usage Guide Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsGuideDropdownOpen(!isGuideDropdownOpen)}
                className="flex items-center gap-2 text-sm font-hrsd-medium text-foreground hover:text-primary transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-primary" />
                دليل استخدام الأداة
                <ChevronDown className={`w-4 h-4 transition-transform ${isGuideDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isGuideDropdownOpen && (
                <div className="dropdown-menu mt-2">
                  <a href="#" className="dropdown-item">
                    <Video className="w-5 h-5 text-primary" />
                    <span>الفيديو التعريفي</span>
                  </a>
                  <a href="#" className="dropdown-item">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>دليل المستخدم</span>
                  </a>
                  <a href="#" className="dropdown-item">
                    <Headphones className="w-5 h-5 text-primary" />
                    <span>تواصل معنا</span>
                  </a>
                </div>
              )}
            </div>

            {/* Login Button */}
            <a href="#" className="login-button">
              تسجيل الدخول
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
