const TrainingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-navy py-8 px-4" dir="rtl">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-hrsd-bold text-lg">ط</span>
            </div>
            <span className="font-hrsd-title text-white text-lg">طموحي</span>
          </div>

          {/* Copyright */}
          <p className="text-white/70 text-sm font-hrsd-medium text-center">
            جميع الحقوق محفوظة © {currentYear} منصة طموحي
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/70 hover:text-white text-sm font-hrsd-medium transition-colors"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white text-sm font-hrsd-medium transition-colors"
            >
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrainingFooter;
