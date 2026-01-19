import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, HelpCircle, FileText, Video, Headphones, Menu, X } from "lucide-react";
import hrsdColoredLogo from "@/assets/logos/hrsd-colored.png";
import vision2030Colored from "@/assets/logos/vision-2030-colored.png";
import { useAuth } from "@/context/AuthContext";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const location = useLocation();
  const [isGuideDropdownOpen, setIsGuideDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user, loading } = useAuth();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsGuideDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm" dir="rtl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Right side - Logos */}
          <div className="flex items-center gap-3 md:gap-6">
            <img 
              src={hrsdColoredLogo} 
              alt="وزارة الموارد البشرية والتنمية الاجتماعية" 
              className="h-10 md:h-14 w-auto" 
            />
            <div className="h-8 md:h-12 w-px bg-border hidden sm:block" />
            <img 
              src={vision2030Colored} 
              alt="رؤية 2030" 
              className="h-8 md:h-12 w-auto hidden sm:block" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-sm font-hrsd-medium text-foreground hover:text-primary transition-colors">
              <FileText className="w-5 h-5" />
              دليل الكفاءة الفنية
            </a>

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
                  <Link to="/contact-us" className="dropdown-item" onClick={() => setIsGuideDropdownOpen(false)}>
                    <Headphones className="w-5 h-5 text-primary" />
                    <span>تواصل معنا</span>
                  </Link>
                </div>
              )}
            </div>

            {!loading && (
              user ? (
                <UserDropdown isScrolled={true} />
              ) : (
                <Link to="/login" className="login-button">
                  تسجيل الدخول
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border mt-3 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a 
                href="#" 
                className="flex items-center gap-2 text-sm font-hrsd-medium text-foreground hover:text-primary transition-colors py-2"
              >
                <FileText className="w-5 h-5" />
                دليل الكفاءة الفنية
              </a>

              <div>
                <button 
                  onClick={() => setIsGuideDropdownOpen(!isGuideDropdownOpen)} 
                  className="flex items-center gap-2 text-sm font-hrsd-medium text-foreground hover:text-primary transition-colors py-2 w-full"
                >
                  <HelpCircle className="w-5 h-5 text-primary" />
                  دليل استخدام الأداة
                  <ChevronDown className={`w-4 h-4 transition-transform mr-auto ${isGuideDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isGuideDropdownOpen && (
                  <div className="flex flex-col gap-2 pr-7 mt-2">
                    <a href="#" className="flex items-center gap-2 text-sm text-foreground hover:text-primary py-2">
                      <Video className="w-4 h-4 text-primary" />
                      <span>الفيديو التعريفي</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm text-foreground hover:text-primary py-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>دليل المستخدم</span>
                    </a>
                    <Link 
                      to="/contact-us" 
                      className="flex items-center gap-2 text-sm text-foreground hover:text-primary py-2"
                      onClick={closeMobileMenu}
                    >
                      <Headphones className="w-4 h-4 text-primary" />
                      <span>تواصل معنا</span>
                    </Link>
                  </div>
                )}
              </div>

              {!loading && (
                user ? (
                  <div className="pt-2 border-t border-border">
                    <UserDropdown isScrolled={true} />
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="login-button w-full text-center mt-2"
                    onClick={closeMobileMenu}
                  >
                    تسجيل الدخول
                  </Link>
                )
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
