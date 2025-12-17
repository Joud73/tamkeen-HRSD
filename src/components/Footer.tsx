import hrsdWhiteLogo from '@/assets/logos/hrsd-white.png';

const FooterLogo = () => (
  <div className="flex items-center justify-center gap-3">
    <span className="text-lg font-hrsd-medium text-white/90">
      وزارة الموارد البشرية والتنمية الإجتماعية
    </span>
    <img src={hrsdWhiteLogo} alt="HRSD Logo" className="h-10 w-auto" />
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8" style={{ backgroundColor: '#148287' }}>
      <div className="container mx-auto px-4">
        {/* Logo and Ministry Name */}
        <div className="flex justify-center mb-6">
          <FooterLogo />
        </div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/80 text-sm font-hrsd">
            {currentYear} © جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
