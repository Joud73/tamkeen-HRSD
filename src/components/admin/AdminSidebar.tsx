import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Building2,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileBarChart,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ElementType;
  active?: boolean;
  children?: { label: string; icon: React.ElementType }[];
}

const navItems: NavItem[] = [
  { label: "لوحة التحكم", icon: LayoutDashboard, active: true },
  {
    label: "الإدارة",
    icon: Users,
    children: [
      { label: "إدارة المستخدمين", icon: Users },
      { label: "إدارة الصلاحيات", icon: ShieldCheck },
    ],
  },
  {
    label: "تهيئة التقييم",
    icon: ClipboardCheck,
    children: [
      { label: "تعريف الجهات", icon: Building2 },
      { label: "تعريف المساقات", icon: BookOpen },
      { label: "إدارة سنوات التقييم", icon: CalendarDays },
      { label: "تقييم الجهات", icon: ClipboardCheck },
    ],
  },
  { label: "التقارير", icon: FileBarChart },
];

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="sticky top-0 h-[calc(100vh-3.5rem)] w-60 shrink-0 border-s border-border bg-card overflow-y-auto py-6 px-3">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.children && toggle(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-hrsd-medium transition-colors",
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-start">{item.label}</span>
              {item.children && (
                <ChevronLeft
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    expanded[item.label] && "-rotate-90"
                  )}
                />
              )}
            </button>

            {item.children && expanded[item.label] && (
              <div className="me-4 mt-1 flex flex-col gap-0.5 border-e-2 border-border pe-3">
                {item.children.map((child) => (
                  <button
                    key={child.label}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-hrsd text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <child.icon className="h-3.5 w-3.5" />
                    <span>{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
