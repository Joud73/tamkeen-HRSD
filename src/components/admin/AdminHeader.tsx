import { ChevronLeft, UserCircle } from "lucide-react";
import hrsdLogo from "@/assets/logos/hrsd-colored.png";

const AdminHeader = () => (
  <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-6">
    {/* Right (start in RTL): Logo */}
    <img src={hrsdLogo} alt="HRSD" className="h-9 object-contain" />

    {/* Left (end in RTL): User chip */}
    <button className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-hrsd-medium text-foreground hover:bg-muted transition-colors">
      <UserCircle className="h-5 w-5 text-primary" />
      <span>مدير النظام</span>
      <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
    </button>
  </header>
);

export default AdminHeader;
