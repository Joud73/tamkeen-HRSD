// Placeholder logo for footer - will be replaced with actual white logo
const FooterLogo = () => (
  <div className="flex items-center justify-center gap-3">
    <span className="text-lg font-hrsd-medium text-white/90">
      وزارة الموارد البشرية والتنمية الإجتماعية
    </span>
    <div className="w-10 h-10 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35" 
          fill="rgba(255,255,255,0.8)"
        />
        <polygon 
          points="50,20 56,38 75,38 60,50 66,68 50,56 34,68 40,50 25,38 44,38" 
          fill="rgba(255,255,255,0.6)"
        />
      </svg>
    </div>
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
