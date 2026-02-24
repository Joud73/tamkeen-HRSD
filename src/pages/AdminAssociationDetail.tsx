import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminAssociationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-[hsl(220,20%,97%)]">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-7">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/associations")}
              className="rounded-xl"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-hrsd-title text-foreground">تفاصيل الجمعية</h1>
              <p className="text-sm font-hrsd text-muted-foreground mt-1">
                معرّف الجمعية: {id}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-10 shadow-sm flex items-center justify-center min-h-[300px]">
            <p className="text-sm font-hrsd text-muted-foreground">
              سيتم إضافة تفاصيل الجمعية هنا قريبًا
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAssociationDetail;
