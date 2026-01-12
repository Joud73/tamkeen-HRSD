import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Upload, Check, FileText, Eye, MessageSquare, Trash2, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";

// Types for the data structure
interface VerificationItem {
  id: string;
  text: string;
}

interface Indicator {
  id: string;
  title: string;
  items: VerificationItem[];
}

interface Criterion {
  id: string;
  number: number;
  name: string;
  indicators: Indicator[];
}

interface Course {
  slug: string;
  name: string;
  criteria: Criterion[];
}

// Evidence record type
interface EvidenceRecord {
  id: string;
  indicatorId: string;
  itemId: string;
  itemLabel: string;
  fileName: string;
  uploadedAt: string;
  status: string;
  hidden: boolean;
}

// Course data with placeholders
const coursesData: Course[] = [
  {
    slug: "altawajuh",
    name: "التوجه",
    criteria: [
      {
        id: "c1",
        number: 1,
        name: "المعيار الأول: تحليل السياق",
        indicators: [
          {
            id: "i1",
            title: "المؤشر الأول: تجمع المنظمة بانتظام معلومات عن احتياجات المستفيدين وتوقعاتهم من البرامج والخدمات، وتقوم بتحليلها والاستفادة من نتائجها.",
            items: [
              { id: "item1", text: "لدى الجمعية نظام لجمع البيانات بانتظام مثل استبيانات أو لقاءات مخططة مع المستفيدين." },
              { id: "item2", text: "قامت الجمعية بجمع معلومات عن احتياجات المستفيدين وتوقعاتهم." },
              { id: "item3", text: "حللت الجمعية البيانات لتحديد توقعات المستفيدين ومدى رضاهم." },
              { id: "item4", text: "لدى الجمعية تقرير أو سجل موثق عن توقعات واحتياجات المستفيدين." },
              { id: "item5", text: "التقرير أو السجل حديث ومتاح." },
              { id: "item6", text: "تمت مناقشة التقرير ويوجد توثيق للمناقشة مثل محضر اجتماع أو تقرير ورشة عمل داخلية." },
              { id: "item7", text: "استخدمت الجمعية المعلومات في تحسين وتطوير البرامج والخدمات ويوجد دليل موثق يظهر ذلك." },
            ],
          },
          {
            id: "i2",
            title: "المؤشر الثاني: [Placeholder]",
            items: [
              { id: "item2-1", text: "البند الأول: [Placeholder]" },
              { id: "item2-2", text: "البند الثاني: [Placeholder]" },
            ],
          },
          {
            id: "i3",
            title: "المؤشر الثالث: [Placeholder]",
            items: [
              { id: "item3-1", text: "البند الأول: [Placeholder]" },
              { id: "item3-2", text: "البند الثاني: [Placeholder]" },
            ],
          },
          {
            id: "i4",
            title: "المؤشر الرابع: [Placeholder]",
            items: [
              { id: "item4-1", text: "البند الأول: [Placeholder]" },
              { id: "item4-2", text: "البند الثاني: [Placeholder]" },
            ],
          },
          {
            id: "i5",
            title: "المؤشر الخامس: [Placeholder]",
            items: [
              { id: "item5-1", text: "البند الأول: [Placeholder]" },
              { id: "item5-2", text: "البند الثاني: [Placeholder]" },
            ],
          },
          {
            id: "i6",
            title: "المؤشر السادس: [Placeholder]",
            items: [
              { id: "item6-1", text: "البند الأول: [Placeholder]" },
              { id: "item6-2", text: "البند الثاني: [Placeholder]" },
            ],
          },
        ],
      },
      {
        id: "c2",
        number: 2,
        name: "المعيار الثاني: [Placeholder]",
        indicators: [
          {
            id: "c2-i1",
            title: "المؤشر الأول: [Placeholder]",
            items: [
              { id: "c2-item1", text: "البند الأول: [Placeholder]" },
              { id: "c2-item2", text: "البند الثاني: [Placeholder]" },
            ],
          },
        ],
      },
      {
        id: "c3",
        number: 3,
        name: "المعيار الثالث: [Placeholder]",
        indicators: [
          {
            id: "c3-i1",
            title: "المؤشر الأول: [Placeholder]",
            items: [
              { id: "c3-item1", text: "البند الأول: [Placeholder]" },
              { id: "c3-item2", text: "البند الثاني: [Placeholder]" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "alfariq",
    name: "الفريق",
    criteria: [
      {
        id: "team-c1",
        number: 1,
        name: "المعيار الأول: [Placeholder]",
        indicators: [
          {
            id: "team-i1",
            title: "المؤشر الأول: [Placeholder]",
            items: [
              { id: "team-item1", text: "البند الأول: [Placeholder]" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "alsharakat",
    name: "الشراكات",
    criteria: [
      {
        id: "part-c1",
        number: 1,
        name: "المعيار الأول: [Placeholder]",
        indicators: [
          {
            id: "part-i1",
            title: "المؤشر الأول: [Placeholder]",
            items: [
              { id: "part-item1", text: "البند الأول: [Placeholder]" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "altaathir",
    name: "التأثير",
    criteria: [
      {
        id: "impact-c1",
        number: 1,
        name: "المعيار الأول: [Placeholder]",
        indicators: [
          {
            id: "impact-i1",
            title: "المؤشر الأول: [Placeholder]",
            items: [
              { id: "impact-item1", text: "البند الأول: [Placeholder]" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "albaramij",
    name: "البرامج",
    criteria: [
      {
        id: "prog-c1",
        number: 1,
        name: "المعيار الأول: [Placeholder]",
        indicators: [
          {
            id: "prog-i1",
            title: "المؤشر الأول: [Placeholder]",
            items: [
              { id: "prog-item1", text: "البند الأول: [Placeholder]" },
            ],
          },
        ],
      },
    ],
  },
];

// Result calculation helper
type ResultType = "pending" | "needs_minor" | "needs_major" | "complete" | "incomplete";

const getResultLabel = (result: ResultType): string => {
  switch (result) {
    case "needs_minor":
      return "بحاجة إلى تحسين بسيط";
    case "needs_major":
      return "بحاجة إلى تحسين كبير";
    case "complete":
      return "مكتمل";
    case "incomplete":
      return "غير مكتمل";
    default:
      return "—";
  }
};

const getResultColor = (result: ResultType): string => {
  switch (result) {
    case "needs_minor":
      return "#22c55e";
    case "needs_major":
      return "#f5961e";
    case "complete":
      return "#148287";
    case "incomplete":
      return "#9ca3af";
    default:
      return "#9ca3af";
  }
};

const TechnicalEvaluationIndicators = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  
  // Find the current course
  const currentCourse = coursesData.find((c) => c.slug === courseSlug) || coursesData[0];
  
  // State for checkboxes: { [itemId]: boolean }
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // State for uploaded files: { [itemId]: File | null }
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  
  // State for indicator results: { [indicatorId]: ResultType }
  const [indicatorResults, setIndicatorResults] = useState<Record<string, ResultType>>({});
  
  // State for active button per indicator: { [indicatorId]: "plan" | "evidence" | "notes" | null }
  const [activeButtons, setActiveButtons] = useState<Record<string, "plan" | "evidence" | "notes" | null>>({});
  
  // Evidence records state with localStorage persistence
  const [evidenceRecords, setEvidenceRecords] = useState<EvidenceRecord[]>(() => {
    const saved = localStorage.getItem(`evidence-${courseSlug}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist evidence to localStorage
  useEffect(() => {
    localStorage.setItem(`evidence-${courseSlug}`, JSON.stringify(evidenceRecords));
  }, [evidenceRecords, courseSlug]);
  
  // File input refs
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  
  // General evidence upload ref
  const generalEvidenceInputRef = useRef<Record<string, HTMLInputElement | null>>({});

  // Helper to get item label from item index
  const getItemLabel = (index: number): string => {
    const labels = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر"];
    return `البند ${labels[index] || (index + 1)}`;
  };

  // Helper to format date as DD-MM
  const formatDate = (): string => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}`;
  };

  // Check if item has evidence
  const hasEvidence = (itemId: string): boolean => {
    return evidenceRecords.some((e) => e.itemId === itemId && !e.hidden);
  };

  // Get evidence count for an indicator
  const getEvidenceCount = (indicatorId: string): number => {
    return evidenceRecords.filter((e) => e.indicatorId === indicatorId && !e.hidden).length;
  };
  
  const handleButtonClick = (indicatorId: string, button: "plan" | "evidence" | "notes") => {
    setActiveButtons((prev) => ({
      ...prev,
      [indicatorId]: prev[indicatorId] === button ? null : button,
    }));
  };

  const handleCheckChange = (itemId: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [itemId]: checked }));
  };

  const handleUploadClick = (itemId: string) => {
    fileInputRefs.current[itemId]?.click();
  };

  const handleFileChange = (itemId: string, indicatorId: string, itemIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploadedFiles((prev) => ({ ...prev, [itemId]: file }));
    
    // Create evidence record
    const newEvidence: EvidenceRecord = {
      id: `${itemId}-${Date.now()}`,
      indicatorId,
      itemId,
      itemLabel: getItemLabel(itemIndex),
      fileName: file.name,
      uploadedAt: formatDate(),
      status: "غير معتمد",
      hidden: false,
    };
    
    setEvidenceRecords((prev) => [...prev, newEvidence]);
  };

  const handleGeneralEvidenceUpload = (indicatorId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const newEvidence: EvidenceRecord = {
      id: `general-${indicatorId}-${Date.now()}`,
      indicatorId,
      itemId: `general-${indicatorId}`,
      itemLabel: "بند غير محدد",
      fileName: file.name,
      uploadedAt: formatDate(),
      status: "غير معتمد",
      hidden: false,
    };
    
    setEvidenceRecords((prev) => [...prev, newEvidence]);
  };

  const toggleEvidenceVisibility = (evidenceId: string) => {
    setEvidenceRecords((prev) =>
      prev.map((e) => (e.id === evidenceId ? { ...e, hidden: !e.hidden } : e))
    );
  };

  const deleteEvidence = (evidenceId: string) => {
    setEvidenceRecords((prev) => prev.filter((e) => e.id !== evidenceId));
  };

  const calculateIndicatorResult = (indicator: Indicator) => {
    const checkedCount = indicator.items.filter((item) => checkedItems[item.id]).length;
    const totalItems = indicator.items.length;
    const percentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

    let result: ResultType;
    if (percentage === 0) {
      result = "incomplete";
    } else if (percentage < 50) {
      result = "needs_major";
    } else if (percentage < 100) {
      result = "needs_minor";
    } else {
      result = "complete";
    }

    setIndicatorResults((prev) => ({ ...prev, [indicator.id]: result }));
  };

  // Render evidence panel for an indicator
  const renderEvidencePanel = (indicatorId: string) => {
    const indicatorEvidence = evidenceRecords.filter((e) => e.indicatorId === indicatorId);
    
    return (
      <div className="mt-4 rounded-lg overflow-hidden" style={{ backgroundColor: "#e8f5f3" }}>
        <div className="p-4">
          {/* Panel Title */}
          <h4 className="text-lg font-hrsd-semibold mb-2" style={{ color: "#f5961e" }}>
            الشواهد
          </h4>
          <div className="h-px bg-gray-300 mb-4" />
          
          {indicatorEvidence.length === 0 ? (
            <p className="text-sm font-hrsd text-gray-500 text-center py-6">
              لا توجد شواهد مضافة
            </p>
          ) : (
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
              {/* Table Header */}
              <div 
                className="flex items-center text-sm font-hrsd-semibold text-white"
                style={{ backgroundColor: "#148287" }}
              >
                <div className="flex-1 py-3 px-4 border-l border-white/20">
                  الشاهد
                </div>
                <div className="w-24 py-3 text-center border-l border-white/20">
                  التاريخ
                </div>
                <div className="w-28 py-3 text-center border-l border-white/20">
                  الحالة
                </div>
                <div className="w-24 py-3 text-center">
                  العمليات
                </div>
              </div>
              
              {/* Table Rows */}
              {indicatorEvidence.map((evidence, index) => (
                <div 
                  key={evidence.id}
                  className={`flex items-center text-sm ${
                    evidence.hidden ? "opacity-50" : ""
                  } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <div className="flex-1 py-3 px-4 font-hrsd text-foreground border-l border-gray-100">
                    {evidence.itemLabel} - {evidence.fileName}
                  </div>
                  <div className="w-24 py-3 text-center font-hrsd text-gray-600 border-l border-gray-100">
                    {evidence.uploadedAt}
                  </div>
                  <div className="w-28 py-3 text-center font-hrsd text-gray-600 border-l border-gray-100">
                    {evidence.status}
                  </div>
                  <div className="w-24 py-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => toggleEvidenceVisibility(evidence.id)}
                      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      title={evidence.hidden ? "إظهار" : "إخفاء"}
                    >
                      {evidence.hidden ? (
                        <EyeOff className="w-4 h-4" style={{ color: "#148287" }} />
                      ) : (
                        <Eye className="w-4 h-4" style={{ color: "#148287" }} />
                      )}
                    </button>
                    <button
                      onClick={() => deleteEvidence(evidence.id)}
                      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: "#148287" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Evidence Button */}
          <div className="mt-4 flex justify-start">
            <button
              onClick={() => generalEvidenceInputRef.current[indicatorId]?.click()}
              className="px-6 py-2 rounded-md text-sm font-hrsd-medium text-white transition-all duration-200 hover:shadow-md hover:brightness-110"
              style={{ backgroundColor: "#148287" }}
            >
              إضافة شاهد
            </button>
            <input
              type="file"
              ref={(el) => (generalEvidenceInputRef.current[indicatorId] = el)}
              onChange={(e) => handleGeneralEvidenceUpload(indicatorId, e)}
              className="hidden"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        {/* Side Patterns - Curved Lines */}
        <div 
          className="fixed left-0 top-0 bottom-0 w-24 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 80 0 Q 20 100 80 200 Q 20 300 80 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.15'/%3E%3Cpath d='M 60 0 Q 0 100 60 200 Q 0 300 60 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.12'/%3E%3Cpath d='M 40 0 Q -20 100 40 200 Q -20 300 40 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'left center',
          }}
        />
        <div 
          className="fixed right-0 top-0 bottom-0 w-24 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 Q 80 100 20 200 Q 80 300 20 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.15'/%3E%3Cpath d='M 40 0 Q 100 100 40 200 Q 100 300 40 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.12'/%3E%3Cpath d='M 60 0 Q 120 100 60 200 Q 120 300 60 400' stroke='%23148287' stroke-width='1' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'right center',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Constrained width container */}
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm font-hrsd mb-3">
              <Link to="/dashboard" className="text-primary hover:underline transition-colors">
                العودة إلى لوحة التحكم
              </Link>
              <span className="text-primary">&gt;</span>
              <span className="text-primary font-hrsd-semibold">مؤشرات التقييم الفني</span>
            </nav>
            
            {/* Green horizontal line */}
            <div className="h-0.5 bg-primary w-full mb-6" />

            {/* Course Title (Orange) */}
            <h1 
              className="text-2xl font-hrsd-bold mb-6"
              style={{ color: "#f5961e" }}
            >
              مساق: {currentCourse.name}
            </h1>

            {/* White content container */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-border">
              {/* Criteria Loop */}
              {currentCourse.criteria.map((criterion) => (
                <div key={criterion.id} className="mb-8 last:mb-0">
                  {/* Criterion Header */}
                  <div className="flex items-center gap-3 mb-6">
                    {/* Circle with number */}
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e8f5f3" }}
                    >
                      <span className="text-sm font-hrsd-bold" style={{ color: "#f5961e" }}>
                        {criterion.number}
                      </span>
                    </div>
                    {/* Criterion name badge */}
                    <div 
                      className="px-4 py-2 rounded-md"
                      style={{ backgroundColor: "#e8f5f3" }}
                    >
                      <span className="text-sm font-hrsd-semibold" style={{ color: "#f5961e" }}>
                        {criterion.name}
                      </span>
                    </div>
                  </div>

                  {/* Indicators Loop */}
                  {criterion.indicators.map((indicator) => (
                    <div 
                      key={indicator.id} 
                      className="mb-6 last:mb-0 bg-white rounded-lg shadow-md border border-border p-5"
                    >
                      {/* Indicator Title (Blue) */}
                      <h3 
                        className="text-base font-hrsd-medium mb-4"
                        style={{ color: "#148287" }}
                      >
                        {indicator.title}
                      </h3>

                      {/* Verification Items Table */}
                      <div className="border border-border rounded-lg overflow-hidden mb-4">
                        {/* Table Header */}
                        <div 
                          className="flex items-center text-sm font-hrsd-semibold text-white"
                          style={{ backgroundColor: "#148287" }}
                        >
                          <div className="w-16 py-3 text-center border-l border-white/20">
                            اختر
                          </div>
                          <div className="flex-1 py-3 px-4 border-l border-white/20">
                            بنود التحقق
                          </div>
                          <div className="w-20 py-3 text-center">
                            الشواهد
                          </div>
                        </div>

                        {/* Table Rows */}
                        {indicator.items.map((item, itemIndex) => (
                          <div 
                            key={item.id}
                            className={`flex items-center transition-all duration-200 hover:bg-gray-50 ${
                              itemIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }`}
                          >
                            {/* Checkbox cell */}
                            <div className="w-16 py-3 flex justify-center border-l border-border">
                              <Checkbox
                                id={item.id}
                                checked={checkedItems[item.id] || false}
                                onCheckedChange={(checked) => handleCheckChange(item.id, checked as boolean)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </div>
                            
                            {/* Item text cell */}
                            <div className="flex-1 py-3 px-4 text-sm font-hrsd text-foreground">
                              {item.text}
                            </div>

                            {/* Upload button cell (الشواهد column) */}
                            <div className="w-20 py-3 flex justify-center">
                              <button
                                onClick={() => handleUploadClick(item.id)}
                                className={`w-8 h-8 rounded flex items-center justify-center transition-all duration-200 hover:bg-gray-200 ${
                                  uploadedFiles[item.id] ? "bg-green-100" : "bg-gray-100"
                                }`}
                                title="رفع الشاهد"
                              >
                                {uploadedFiles[item.id] ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Upload className="w-4 h-4 text-gray-600" />
                                )}
                              </button>
                              <input
                                type="file"
                                ref={(el) => (fileInputRefs.current[item.id] = el)}
                                onChange={(e) => handleFileChange(item.id, indicator.id, itemIndex, e)}
                                className="hidden"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Indicator Actions Row */}
                      <div className="flex items-center justify-between mb-4">
                        {/* Right side - Calculate button (GREEN) */}
                        <button
                          onClick={() => calculateIndicatorResult(indicator)}
                          className="flex items-center gap-2 px-6 py-2 rounded-md text-sm font-hrsd-medium text-white transition-all duration-200 hover:shadow-md hover:brightness-110"
                          style={{ backgroundColor: "#22c55e" }}
                        >
                          احتساب نتيجة المؤشر
                        </button>

                        {/* Left side - Result badge */}
                        <div 
                          className="px-4 py-2 rounded-md text-sm font-hrsd-medium text-white transition-all duration-200"
                          style={{ 
                            backgroundColor: getResultColor(indicatorResults[indicator.id] || "pending"),
                          }}
                        >
                          {getResultLabel(indicatorResults[indicator.id] || "pending")}
                        </div>
                      </div>

                      {/* Thin grey divider line */}
                      <div className="h-px bg-gray-200 mb-4" />

                      {/* Bottom Action Buttons (3 buttons with active state) */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleButtonClick(indicator.id, "plan")}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-hrsd-medium text-white transition-all duration-200 hover:shadow-md hover:brightness-110"
                          style={{ 
                            backgroundColor: activeButtons[indicator.id] === "plan" ? "#f5961e" : "#148287" 
                          }}
                        >
                          <FileText className="w-4 h-4" />
                          خطة التحسين
                        </button>
                        <button
                          onClick={() => handleButtonClick(indicator.id, "evidence")}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-hrsd-medium text-white transition-all duration-200 hover:shadow-md hover:brightness-110"
                          style={{ 
                            backgroundColor: activeButtons[indicator.id] === "evidence" ? "#f5961e" : "#148287" 
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          الشواهد
                          {getEvidenceCount(indicator.id) > 0 && (
                            <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                              {getEvidenceCount(indicator.id)}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => handleButtonClick(indicator.id, "notes")}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-hrsd-medium text-white transition-all duration-200 hover:shadow-md hover:brightness-110"
                          style={{ 
                            backgroundColor: activeButtons[indicator.id] === "notes" ? "#f5961e" : "#148287" 
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          الملاحظات
                        </button>
                      </div>

                      {/* Tab Content: الشواهد panel */}
                      {activeButtons[indicator.id] === "evidence" && renderEvidencePanel(indicator.id)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TechnicalEvaluationIndicators;
