import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrganizationJourney from "@/components/OrganizationJourney";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Award, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import hrsdLogo from "@/assets/logos/hrsd-colored.png";
import visionLogo from "@/assets/logos/vision-2030-colored.png";

const Certificate = () => {
  const { organizationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data - in production, this would come from the database
  const isCertified = true;
  const organizationName = "شركة التقنية المتقدمة";
  const certificationGrade = "أ";
  const issueDate = new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const certificateId = `CERT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
  const verificationCode = `VRF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  if (!isCertified) {
    return (
      <div dir="rtl" className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="max-w-md w-full shadow-lg">
            <CardContent className="p-8 text-center">
              <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-hrsd-bold text-foreground mb-2">
                الشهادة غير متاحة
              </h2>
              <p className="text-muted-foreground mb-6">
                لم يتم اعتماد المنظمة بعد. يرجى إكمال عملية التقييم أولاً.
              </p>
              <Button onClick={() => navigate("/dashboard")} className="bg-primary">
                العودة للوحة التحكم
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const certificateContent = `
شهادة الاعتماد
${organizationName}
درجة الاعتماد: ${certificationGrade}
تاريخ الإصدار: ${issueDate}
رقم الشهادة: ${certificateId}
    `;
    
    const blob = new Blob([certificateContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `certificate-${certificateId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "أ":
        return "from-emerald-500 to-emerald-600";
      case "ب":
        return "from-blue-500 to-blue-600";
      case "ج":
        return "from-amber-500 to-amber-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Fixed header spacer */}
      <div className="h-20" />
      
      {/* Organization Journey */}
      <div className="print:hidden">
        <OrganizationJourney />
      </div>

      <main className="flex-1 py-12 px-4 md:px-6 print:py-0">
        <div className="max-w-4xl mx-auto">
          {/* Certificate Card */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-amber-50/30 rounded-3xl" />
            
            <Card className="relative overflow-hidden border-2 border-[hsl(45,70%,65%)] shadow-2xl rounded-3xl print:shadow-none print:border">
              {/* Geometric pattern overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Top decorative border */}
              <div className="h-3 bg-gradient-to-r from-emerald-600 via-[hsl(45,70%,55%)] to-emerald-600" />

              <CardContent className="relative p-8 md:p-12 lg:p-16">
                {/* Header with logos */}
                <div className="flex items-start justify-between mb-10">
                  {/* Vision 2030 logo - left */}
                  <img
                    src={visionLogo}
                    alt="رؤية 2030"
                    className="h-16 md:h-20 object-contain"
                  />
                  
                  {/* Ministry logo - right */}
                  <img
                    src={hrsdLogo}
                    alt="شعار الوزارة"
                    className="h-16 md:h-20 object-contain"
                  />
                </div>

                {/* Certificate Title */}
                <div className="text-center mb-10">
                  <div className="inline-block">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-hrsd-title text-emerald-800 mb-4">
                      شهادة اعتماد
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-px w-16 bg-gradient-to-r from-transparent via-[hsl(45,70%,55%)] to-transparent" />
                      <div className="w-3 h-3 rotate-45 bg-[hsl(45,70%,55%)]" />
                      <div className="h-px w-16 bg-gradient-to-r from-transparent via-[hsl(45,70%,55%)] to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Granting text */}
                <p className="text-center text-lg md:text-xl text-muted-foreground mb-8 font-hrsd-medium">
                  تمنح وزارة الموارد البشرية والتنمية الاجتماعية هذه الشهادة إلى
                </p>

                {/* Organization Name */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-hrsd-bold text-emerald-800 leading-relaxed">
                    {organizationName}
                  </h2>
                </div>

                {/* Confirmation text */}
                <div className="text-center mb-10 max-w-2xl mx-auto">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed font-hrsd-regular">
                    قد استوفت جميع معايير ومتطلبات الاعتماد المهني للتدريب
                    <br />
                    وفقًا للمعايير المعتمدة.
                  </p>
                </div>

                {/* Grade Badge */}
                {certificationGrade && (
                  <div className="flex justify-center mb-12">
                    <div className={`relative bg-gradient-to-br ${getGradeColor(certificationGrade)} text-white rounded-2xl px-8 py-4 shadow-lg`}>
                      <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                      <div className="relative flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6" />
                        <div className="text-center">
                          <p className="text-sm opacity-90 font-hrsd-medium">درجة الاعتماد</p>
                          <p className="text-3xl font-hrsd-bold">{certificationGrade}</p>
                        </div>
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div className="w-2 h-2 rounded-full bg-[hsl(45,70%,55%)]" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
                </div>

                {/* Bottom Section - Three Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {/* Issue Date */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 mb-2">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground font-hrsd-medium">تاريخ الإصدار</p>
                    <p className="text-lg font-hrsd-semibold text-foreground">{issueDate}</p>
                  </div>

                  {/* Certificate ID */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(45,70%,92%)] mb-2">
                      <svg className="w-6 h-6 text-[hsl(45,70%,40%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground font-hrsd-medium">رقم الشهادة</p>
                    <p className="text-lg font-hrsd-semibold text-foreground font-mono tracking-wider">{certificateId}</p>
                  </div>

                  {/* Verification Code / QR */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 mb-2">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground font-hrsd-medium">كود التحقق</p>
                    <p className="text-lg font-hrsd-semibold text-foreground font-mono tracking-wider">{verificationCode}</p>
                  </div>
                </div>

                {/* Official seal placeholder */}
                <div className="flex justify-center mt-10">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground text-center px-2 font-hrsd-medium">
                      ختم الجهة
                      <br />
                      الرسمي
                    </span>
                  </div>
                </div>
              </CardContent>

              {/* Bottom decorative border */}
              <div className="h-3 bg-gradient-to-r from-emerald-600 via-[hsl(45,70%,55%)] to-emerald-600" />
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 print:hidden">
            <Button
              onClick={handleDownloadPDF}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-hrsd-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5 ml-3" />
              تحميل PDF
            </Button>
            <Button
              onClick={handlePrint}
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg font-hrsd-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Printer className="w-5 h-5 ml-3" />
              طباعة
            </Button>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none,
          .print\\:shadow-none * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Certificate;
