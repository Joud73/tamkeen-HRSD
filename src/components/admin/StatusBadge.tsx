import { cn } from "@/lib/utils";

const colorMap: Record<string, { dot: string; bg: string; text: string }> = {
  "لم تبدأ": { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600" },
  "قيد التقييم": { dot: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-700" },
  "تسليم جزئي": { dot: "bg-blue-400", bg: "bg-blue-50", text: "text-blue-700" },
  "تسليم كامل": { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
};

interface StatusBadgeProps {
  status: string;
  count?: number;
}

const StatusBadge = ({ status, count }: StatusBadgeProps) => {
  const colors = colorMap[status] ?? colorMap["لم تبدأ"];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-hrsd-medium", colors.bg, colors.text)}>
      <span className={cn("h-2 w-2 rounded-full", colors.dot)} />
      {status}
      {count !== undefined && <span className="font-hrsd-bold mr-1">({count})</span>}
    </span>
  );
};

export default StatusBadge;
