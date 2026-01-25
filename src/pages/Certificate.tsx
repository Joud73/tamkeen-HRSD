import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Award } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import hrsdLogo from "@/assets/logos/hrsd-colored.png";

const Certificate = () => {
  const { organizationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data - in production, this would come from the database
  const isCertified = true; // Should check assessment_status === 'certified'
  const organizationName = "شركة التقنية المتقدمة";
  const certificationGrade = "أ"; // A, B, C grades
  const issueDate = new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const certificateId = `CERT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;

  // Redirect if not certified
  if (!isCertified) {
    return (
      <div dir="rtl" className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="max-w-md w-full shadow-lg">
            <CardContent className="p-8 text-center">
              <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
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
    // Generate PDF certificate
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
        return "bg-emerald-500";
      case "ب":
        return "bg-blue-500";
      case "ج":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6 py-24">
        <div className="w-full max-w-2xl">
          {/* Certificate Card */}
          <Card className="shadow-xl border-2 border-emerald-500 print:shadow-none print:border">
            <CardContent className="p-8 md:p-12">
              {/* Header with Logo */}
              <div className="text-center mb-8">
                <img
                  src={hrsdLogo}
                  alt="شعار الوزارة"
                  className="h-20 mx-auto mb-6"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
                  شهادة الاعتماد
                </h1>
                <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full" />
              </div>

              {/* Organization Name */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground mb-2">تشهد الجهة المختصة بأن</p>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
                  {organizationName}
                </h2>
              </div>

              {/* Certification Grade Badge */}
              <div className="flex justify-center mb-8">
                <div className={`${getGradeColor(certificationGrade)} text-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg`}>
                  <div className="text-center">
                    <p className="text-xs opacity-90">درجة</p>
                    <p className="text-4xl font-bold">{certificationGrade}</p>
                  </div>
                </div>
              </div>

              {/* Formal Confirmation Text */}
              <div className="text-center mb-8 px-4">
                <p className="text-foreground leading-relaxed">
                  قد استوفت جميع معايير ومتطلبات الاعتماد المهني للتدريب وفقاً للمعايير
                  المعتمدة من وزارة الموارد البشرية والتنمية الاجتماعية، ويحق لها ممارسة
                  أنشطة التدريب والتأهيل المهني في نطاق التخصصات المعتمدة.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-300 my-8" />

              {/* Bottom Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {/* Issue Date */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">تاريخ الإصدار</p>
                  <p className="font-semibold text-foreground">{issueDate}</p>
                </div>

                {/* Authority Stamp Placeholder */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                    <p className="text-xs text-muted-foreground text-center px-2">
                      ختم الجهة
                    </p>
                  </div>
                </div>

                {/* Certificate ID */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">رقم الشهادة</p>
                  <p className="font-semibold text-foreground font-mono">{certificateId}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
            <Button
              onClick={handleDownloadPDF}
              className="bg-primary hover:bg-primary/90"
            >
              <Download className="w-4 h-4 ml-2" />
              تحميل PDF
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Printer className="w-4 h-4 ml-2" />
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
        }
      `}</style>
    </div>
  );
};

export default Certificate;
