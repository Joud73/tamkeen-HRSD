import { Clock, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TrainingCardProps {
  title: string;
  description: string;
  duration: string;
  type: string;
  isEnrolled?: boolean;
  onEnroll: () => void;
  onDetails: () => void;
}

const TrainingCard = ({
  title,
  description,
  duration,
  type,
  isEnrolled = false,
  onEnroll,
  onDetails,
}: TrainingCardProps) => {
  return (
    <div
      className="bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 flex flex-col h-full border border-border"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-lg md:text-xl font-hrsd-bold text-foreground leading-relaxed flex-1">
          {title}
        </h3>
        {isEnrolled && (
          <Badge className="bg-primary/10 text-primary border-0 flex items-center gap-1 shrink-0">
            <CheckCircle size={14} />
            <span>ملتحق</span>
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 flex-1 font-hrsd-medium line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge
          variant="secondary"
          className="flex items-center gap-1 bg-section-light text-foreground font-hrsd-medium"
        >
          <Clock size={14} />
          <span>{duration}</span>
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-1 bg-section-tealLight text-primary font-hrsd-medium"
        >
          <BookOpen size={14} />
          <span>{type}</span>
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        <Button
          onClick={onEnroll}
          disabled={isEnrolled}
          className={`h-11 flex-1 font-hrsd-semibold rounded-lg ${
            isEnrolled
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 text-white"
          }`}
          aria-label={isEnrolled ? "أنت ملتحق بهذا البرنامج" : `الالتحاق ببرنامج ${title}`}
        >
          {isEnrolled ? "ملتحق ✓" : "الالتحاق بالبرنامج"}
        </Button>
        <Button
          onClick={onDetails}
          variant="outline"
          className="h-11 flex-1 font-hrsd-medium border-primary text-primary hover:bg-primary/5 rounded-lg"
          aria-label={`عرض تفاصيل برنامج ${title}`}
        >
          تفاصيل
        </Button>
      </div>
    </div>
  );
};

export default TrainingCard;
