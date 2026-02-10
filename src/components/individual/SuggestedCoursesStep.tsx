import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { trainingPrograms } from "@/data/trainingPrograms";

interface SuggestedCoursesStepProps {
  assessmentScore?: number;
  onEnroll: (courseId: number) => void;
}

const SuggestedCoursesStep = ({ assessmentScore, onEnroll }: SuggestedCoursesStepProps) => {
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleEnroll = (courseId: number) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      onEnroll(courseId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-hrsd-title mb-3 text-primary">
          الدورات المقترحة
        </h3>
        <p className="text-muted-foreground font-hrsd">
          {assessmentScore
            ? `بناءً على نتيجة تقييمك (${assessmentScore}%)، نقترح عليك الدورات التالية`
            : "اختر من الدورات المتاحة لتطوير مهاراتك"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {trainingPrograms.map((course) => {
          const isEnrolled = enrolledCourses.includes(course.id);

          return (
            <div
              key={course.id}
              className="bg-card rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl border border-border"
            >
              <div className="h-2 bg-primary" />

              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  {course.icon && (
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <course.icon size={20} className="text-primary" />
                    </div>
                  )}
                  <h4 className="text-lg font-hrsd-semibold text-foreground">
                    {course.title}
                  </h4>
                </div>

                <p className="text-muted-foreground text-sm mb-4 font-hrsd leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-hrsd">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-hrsd">{course.type}</span>
                  </div>
                </div>

                {isEnrolled ? (
                  <Button
                    disabled
                    className="w-full h-11 font-hrsd-semibold bg-primary/20 text-primary"
                  >
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                    تم الالتحاق
                  </Button>
                ) : (
                  <Button
                    className="w-full h-11 font-hrsd-semibold bg-primary hover:bg-primary/90 text-white"
                    onClick={() => {
                      handleEnroll(course.id);
                      navigate(`/individual-course/${course.id}`);
                    }}
                  >
                    الالتحاق بالدورة
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {enrolledCourses.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground font-hrsd mb-4">
            لقد التحقت بـ {enrolledCourses.length} دورة
          </p>
        </div>
      )}
    </div>
  );
};

export default SuggestedCoursesStep;
