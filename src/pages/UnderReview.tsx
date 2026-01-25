import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrganizationJourney from "@/components/OrganizationJourney";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const UnderReview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mock data - in production this would come from the database
  const organizationName = "اسم المنظمة";
  const submissionDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const isCertified = false; // This would come from the database

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-20" />
      
      <main className="flex-1" dir="rtl">
        <OrganizationJourney />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                
                {/* Title */}
                <h1 className="text-2xl font-hrsd-bold text-foreground mb-6">
                  تحت التدقيق
                </h1>
                
                {/* Message */}
                <p className="text-muted-foreground font-hrsd mb-4 leading-relaxed">
                  تم استلام التقييم الذاتي وجميع الشواهد بنجاح.
                </p>
                <p className="text-muted-foreground font-hrsd mb-8 leading-relaxed">
                  يجري حاليًا تدقيق البيانات من قبل الجهة المختصة.
                </p>
                
                {/* Organization Info */}
                <div className="bg-muted/50 rounded-lg p-6 mb-6 text-right">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-foreground font-hrsd-medium">{organizationName}</span>
                    <span className="text-muted-foreground font-hrsd text-sm">اسم المنظمة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-hrsd-medium">{submissionDate}</span>
                    <span className="text-muted-foreground font-hrsd text-sm">تاريخ الإرسال</span>
                  </div>
                </div>
                
                {/* Notice */}
                <div className="bg-accent-orange/10 border border-accent-orange/30 rounded-lg p-4 mb-8">
                  <p className="text-accent-orange font-hrsd-medium text-sm">
                    لا يمكن تعديل البيانات خلال مرحلة التدقيق.
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="font-hrsd-medium"
                    disabled={!isCertified}
                    title={!isCertified ? "غير متاح حتى اعتماد الشهادة" : ""}
                  >
                    <FileText className="w-4 h-4 ml-2" />
                    عرض الشهادة
                  </Button>
                  
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="font-hrsd-medium bg-primary hover:bg-primary/90"
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                    العودة للوحة التحكم
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Side Badge */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 py-4 px-2 text-xs text-white z-50"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          backgroundColor: "hsl(var(--accent-orange))",
          borderRadius: "0 4px 4px 0",
        }}
      >
        نسخة تجريبية
      </div>
    </div>
  );
};

export default UnderReview;
