import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  highlight?: boolean;
  showProgress?: boolean;
  progressValue?: number;
}

const KpiCard = ({ title, value, icon, highlight, showProgress, progressValue = 0 }: KpiCardProps) => (
  <div
    className={cn(
      "rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md",
      highlight ? "border-primary/40 bg-primary/5" : "border-border"
    )}
  >
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-hrsd text-muted-foreground">{title}</span>
        <span className="text-2xl font-hrsd-bold text-foreground">{value}</span>
      </div>
      <div className={cn("rounded-lg p-2", highlight ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
        {icon}
      </div>
    </div>
    {showProgress && (
      <Progress value={progressValue} className="mt-3 h-2 bg-muted [&>div]:bg-primary" />
    )}
  </div>
);

export default KpiCard;
