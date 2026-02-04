import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock,
  Calendar,
  Users,
  BookOpen,
  Monitor,
  FileText,
  CheckCircle,
  PlayCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { getProgramById, TrainingProgram } from "@/data/trainingPrograms";
import { toast } from "sonner";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<TrainingProgram | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const foundProgram = getProgramById(parseInt(courseId));
      if (foundProgram) {
        setProgram(foundProgram);
        // Check enrollment status from localStorage
        const enrolled = JSON.parse(localStorage.getItem("enrolledPrograms") || "[]");
        setIsEnrolled(enrolled.includes(parseInt(courseId)));
      }
      setIsLoading(false);
    }
  }, [courseId]);

  const handleEnroll = () => {
    if (program) {
      const enrolled = JSON.parse(localStorage.getItem("enrolledPrograms") || "[]");
      if (!enrolled.includes(program.id)) {
        enrolled.push(program.id);
        localStorage.setItem("enrolledPrograms", JSON.stringify(enrolled));
        setIsEnrolled(true);
        toast.success("تم الالتحاق بالبرنامج بنجاح!");
      }
    }
  };

  const handleBack = () => {
    navigate("/training-stage");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-hrsd-medium">جاري التحميل...</div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AppHeader variant="org" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center" dir="rtl">
            <h2 className="text-2xl font-hrsd-bold text-foreground mb-4">البرنامج غير موجود</h2>
            <Button onClick={handleBack} className="bg-primary hover:bg-primary/90">
              العودة إلى البرامج التدريبية
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = program.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader variant="org" />
      
      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="bg-primary py-10 md:py-16 px-4" dir="rtl">
        <div className="container mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-hrsd-medium"
          >
            <ArrowRight size={20} />
            <span>العودة إلى البرامج التدريبية</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Content */}
            <div className="flex-1 space-y-6">
              {/* Program Icon & Title */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Icon size={32} className="text-accent" />
                </div>
                <div>
                  <Badge className="bg-accent/20 text-accent border-0 mb-2 font-hrsd-medium">
                    {program.category}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-hrsd-title text-white leading-relaxed">
                    {program.title}
                  </h1>
                </div>
              </div>

              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl font-hrsd-medium">
                {program.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Clock size={18} className="text-accent" />
                  <span className="text-white font-hrsd-medium">{program.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <BookOpen size={18} className="text-accent" />
                  <span className="text-white font-hrsd-medium">{program.type}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Monitor size={18} className="text-accent" />
                  <span className="text-white font-hrsd-medium">{program.deliveryMode}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                  <Users size={18} className="text-accent" />
                  <span className="text-white font-hrsd-medium">{program.instructor}</span>
                </div>
              </div>

              {/* Enrollment Status */}
              {isEnrolled ? (
                <div className="flex items-center gap-2 bg-accent/20 rounded-lg px-4 py-3 w-fit">
                  <CheckCircle size={20} className="text-accent" />
                  <span className="text-accent font-hrsd-semibold">أنت ملتحق بهذا البرنامج</span>
                </div>
              ) : (
                <Button
                  onClick={handleEnroll}
                  className="h-14 px-8 text-lg font-hrsd-semibold bg-accent hover:bg-accent/90 text-white rounded-lg"
                >
                  الالتحاق بالبرنامج الآن
                </Button>
              )}
            </div>

            {/* Progress Circle */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-white/5 rounded-2xl p-8">
              <div className="w-40 h-40 rounded-full border-4 border-white/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-accent/50 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-hrsd-bold text-accent">
                      {isEnrolled ? "25%" : "0%"}
                    </span>
                    <p className="text-white/80 text-sm mt-1 font-hrsd-medium">مكتمل</p>
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-4 font-hrsd-medium">نسبة إتمام البرنامج</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="py-12 md:py-16 px-4 bg-section-light" dir="rtl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Bar */}
              {isEnrolled && (
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-hrsd-bold text-foreground mb-4">تقدمك في البرنامج</h3>
                  <Progress value={25} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground font-hrsd-medium">
                    أكملت 25% من البرنامج التدريبي
                  </p>
                </div>
              )}

              {/* Modules */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-hrsd-bold text-foreground">محتوى البرنامج</h3>
                  <p className="text-muted-foreground font-hrsd-medium mt-1">
                    {program.modules?.length || 0} وحدات تدريبية
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {program.modules?.map((module, index) => (
                    <div
                      key={index}
                      className={`p-6 cursor-pointer transition-colors ${
                        activeModule === index
                          ? "bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setActiveModule(index)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            activeModule === index
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isEnrolled && index === 0 ? (
                            <CheckCircle size={20} />
                          ) : (
                            <PlayCircle size={20} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-hrsd-semibold text-foreground">
                              {module.title}
                            </h4>
                            <Badge variant="secondary" className="font-hrsd-medium">
                              {module.duration}
                            </Badge>
                          </div>
                          {activeModule === index && (
                            <ul className="space-y-2 mt-4">
                              {module.topics.map((topic, topicIndex) => (
                                <li
                                  key={topicIndex}
                                  className="flex items-center gap-2 text-muted-foreground text-sm font-hrsd-medium"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-hrsd-bold text-foreground mb-4">أهداف البرنامج</h3>
                <ul className="space-y-3">
                  {program.objectives.map((objective, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground font-hrsd-medium"
                    >
                      <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Schedule Card */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-hrsd-bold text-foreground mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-primary" />
                  الجدول الزمني
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-hrsd-medium mb-1">تاريخ البدء</p>
                    <p className="font-hrsd-semibold text-foreground">{program.startDate}</p>
                  </div>
                  {program.schedule && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground font-hrsd-medium mb-1">أيام التدريب</p>
                        <div className="flex flex-wrap gap-2">
                          {program.schedule.days.map((day, index) => (
                            <Badge key={index} variant="secondary" className="font-hrsd-medium">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-hrsd-medium mb-1">وقت الجلسات</p>
                        <p className="font-hrsd-semibold text-foreground">{program.schedule.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-hrsd-medium mb-1">عدد الجلسات</p>
                        <p className="font-hrsd-semibold text-foreground">{program.schedule.sessions} جلسة</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Materials Card */}
              {program.materials && program.materials.length > 0 && (
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-hrsd-bold text-foreground mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    المواد التدريبية
                  </h3>
                  <div className="space-y-3">
                    {program.materials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-hrsd-medium text-foreground text-sm">{material.name}</p>
                            <p className="text-xs text-muted-foreground font-hrsd-medium">
                              {material.type} {material.size && `• ${material.size}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:bg-primary/10"
                          disabled={!isEnrolled}
                        >
                          <Download size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  {!isEnrolled && (
                    <p className="text-xs text-muted-foreground font-hrsd-medium mt-4 text-center">
                      التحق بالبرنامج لتحميل المواد التدريبية
                    </p>
                  )}
                </div>
              )}

              {/* Requirements Card */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-hrsd-bold text-foreground mb-4">المتطلبات</h3>
                <ul className="space-y-2">
                  {program.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground text-sm font-hrsd-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              {!isEnrolled && (
                <div className="bg-primary rounded-xl p-6 text-center">
                  <h3 className="text-lg font-hrsd-bold text-white mb-2">جاهز للبدء؟</h3>
                  <p className="text-white/80 text-sm font-hrsd-medium mb-4">
                    سجل الآن وابدأ رحلتك التعليمية
                  </p>
                  <Button
                    onClick={handleEnroll}
                    className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-hrsd-semibold"
                  >
                    الالتحاق بالبرنامج
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
