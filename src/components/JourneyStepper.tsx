import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface CourseStep {
  title: string;
  percentage: number;
  isComplete: boolean;
}

const steps: CourseStep[] = [
  { title: "التوجه", percentage: 53, isComplete: false },
  { title: "الفريق", percentage: 87, isComplete: true },
  { title: "الشراكات", percentage: 47, isComplete: false },
  { title: "التأثير", percentage: 62, isComplete: false },
  { title: "البرامج", percentage: 67, isComplete: false },
];

const JourneyStepper = () => {
  const [animatedSteps, setAnimatedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Animate steps sequentially
    steps.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSteps((prev) => [...prev, index]);
      }, 150 * (index + 1));
    });
  }, []);

  return (
    <div className="w-full py-6 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Stepper Container */}
        <div className="relative flex items-center justify-between">
          {/* Connecting Line - Behind circles */}
          <div 
            className="absolute top-5 right-5 left-5 h-1 rounded-full z-0"
            style={{ backgroundColor: "#e5e7eb" }}
          />
          
          {/* Animated Progress Line */}
          <div 
            className="absolute top-5 right-5 h-1 rounded-full z-0 transition-all duration-1000 ease-out"
            style={{ 
              backgroundColor: "#148287",
              width: `${(animatedSteps.length / steps.length) * 90}%`,
            }}
          />

          {/* Steps */}
          {steps.map((step, index) => {
            const isAnimated = animatedSteps.includes(index);
            const isComplete = step.percentage >= 80;
            
            return (
              <div
                key={index}
                className={`relative z-10 flex flex-col items-center transition-all duration-500 ${
                  isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isComplete 
                      ? "bg-primary shadow-lg" 
                      : "bg-white border-2 border-gray-300"
                  }`}
                  style={isComplete ? { backgroundColor: "#148287" } : {}}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {/* Title */}
                <span 
                  className="mt-2 text-sm font-hrsd-semibold whitespace-nowrap"
                  style={{ color: isComplete ? "#148287" : "#6b7280" }}
                >
                  {step.title}
                </span>

                {/* Percentage Badge */}
                <span
                  className="mt-1 text-xs font-hrsd-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isComplete ? "#e8f5f3" : "#f3f4f6",
                    color: isComplete ? "#148287" : "#6b7280",
                  }}
                >
                  {step.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyStepper;
