import { Link } from "react-router-dom";
import hrsdLogo from "@/assets/logos/hrsd-white.png";
import visionLogo from "@/assets/logos/vision-2030-white.webp";

const quickLinks = [
  { title: "الرئيسية", href: "/" },
  { title: "الخدمات الإلكترونية", href: "#" },
  { title: "المنصات الرقمية", href: "#" },
  { title: "الأنظمة واللوائح", href: "#" },
];

const supportLinks = [
  { title: "تواصل معنا", href: "/contact-us" },
  { title: "الأسئلة الشائعة", href: "#" },
  { title: "حجز موعد", href: "#" },
  { title: "تقديم شكوى", href: "#" },
];

export default function GovFooter() {
  return (
    <footer className="bg-[#1D4D37] text-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={hrsdLogo}
                alt="وزارة الموارد البشرية والتنمية الاجتماعية"
                className="h-14"
              />
            </div>
            <p className="text-white/70 text-sm font-hrsd-regular leading-relaxed mb-6">
              وزارة الموارد البشرية والتنمية الاجتماعية - المملكة العربية السعودية
            </p>
            <img
              src={visionLogo}
              alt="رؤية 2030"
              className="h-12 opacity-80"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-hrsd-semibold mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm font-hrsd-regular"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-hrsd-semibold mb-6">الدعم والمساعدة</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm font-hrsd-regular"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-hrsd-semibold mb-6">تواصل معنا</h3>
            <div className="space-y-4 text-sm font-hrsd-regular">
              <p className="text-white/70">
                <span className="text-white block mb-1">مركز الاتصال:</span>
                <span dir="ltr">19911</span>
              </p>
              <p className="text-white/70">
                <span className="text-white block mb-1">البريد الإلكتروني:</span>
                info@hrsd.gov.sa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-white/60 text-sm font-hrsd-regular">
              © {new Date().getFullYear()} وزارة الموارد البشرية والتنمية الاجتماعية. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-white text-sm font-hrsd-regular transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm font-hrsd-regular transition-colors">
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
