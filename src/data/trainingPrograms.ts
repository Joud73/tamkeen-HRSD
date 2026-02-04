import {
  GraduationCap,
  FileText,
  Award,
  Target,
  BookOpen,
  Users,
  Laptop,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

export interface TrainingProgram {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: string;
  deliveryMode: string;
  category: string;
  icon: LucideIcon;
  objectives: string[];
  requirements: string[];
  instructor: string;
  startDate: string;
  schedule?: {
    days: string[];
    time: string;
    sessions: number;
  };
  materials?: {
    name: string;
    type: string;
    size?: string;
  }[];
  modules?: {
    title: string;
    duration: string;
    topics: string[];
  }[];
}

export interface TrainingOutput {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isComingSoon: boolean;
}

// Categories for filtering
export const categories = [
  "جميع البرامج",
  "القيادة والإدارة",
  "المهارات المهنية",
  "التقنية والابتكار",
];

// Training programs data with categories
export const trainingPrograms: TrainingProgram[] = [
  {
    id: 1,
    title: "أساسيات القيادة الإدارية",
    description:
      "برنامج شامل يغطي المفاهيم الأساسية للقيادة الفعالة وإدارة الفرق في بيئة العمل الحديثة. يتضمن البرنامج تدريبات عملية ودراسات حالة.",
    duration: "4 أسابيع",
    type: "تفاعلي",
    deliveryMode: "عن بُعد",
    category: "القيادة والإدارة",
    icon: Users,
    objectives: [
      "فهم أساليب القيادة المختلفة",
      "تطوير مهارات اتخاذ القرار",
      "بناء فرق عمل فعالة",
      "إدارة التغيير في المؤسسات",
    ],
    requirements: ["إتمام مرحلة التسجيل", "الالتزام بالحضور"],
    instructor: "د. أحمد الفهد",
    startDate: "15 يناير 2026",
    schedule: {
      days: ["الأحد", "الثلاثاء", "الخميس"],
      time: "6:00 م - 8:00 م",
      sessions: 12,
    },
    materials: [
      { name: "دليل المتدرب", type: "PDF", size: "2.5 MB" },
      { name: "العروض التقديمية", type: "PPTX", size: "15 MB" },
      { name: "ملفات التمارين", type: "ZIP", size: "5 MB" },
    ],
    modules: [
      {
        title: "مقدمة في القيادة",
        duration: "أسبوع واحد",
        topics: ["تعريف القيادة", "أنماط القيادة", "الفرق بين القيادة والإدارة"],
      },
      {
        title: "مهارات اتخاذ القرار",
        duration: "أسبوع واحد",
        topics: ["عملية اتخاذ القرار", "التفكير النقدي", "إدارة المخاطر"],
      },
      {
        title: "بناء الفريق",
        duration: "أسبوعان",
        topics: ["ديناميكيات الفريق", "حل النزاعات", "تحفيز الفريق"],
      },
    ],
  },
  {
    id: 2,
    title: "مهارات التواصل المهني",
    description:
      "تعلم فنون التواصل الفعال في بيئة العمل، بما في ذلك العروض التقديمية والتفاوض وإدارة الاجتماعات بكفاءة عالية.",
    duration: "3 أسابيع",
    type: "تطبيقي",
    deliveryMode: "حضوري",
    category: "المهارات المهنية",
    icon: BookOpen,
    objectives: [
      "إتقان فن العرض والإلقاء",
      "تطوير مهارات الاستماع الفعال",
      "التفاوض وحل النزاعات",
    ],
    requirements: ["لا يوجد متطلبات مسبقة"],
    instructor: "أ. سارة المحمد",
    startDate: "22 يناير 2026",
    schedule: {
      days: ["الاثنين", "الأربعاء"],
      time: "4:00 م - 7:00 م",
      sessions: 9,
    },
    materials: [
      { name: "كتاب التواصل الفعال", type: "PDF", size: "3 MB" },
      { name: "تسجيلات الجلسات", type: "MP4", size: "500 MB" },
    ],
    modules: [
      {
        title: "أساسيات التواصل",
        duration: "أسبوع واحد",
        topics: ["عناصر التواصل", "الاستماع الفعال", "لغة الجسد"],
      },
      {
        title: "العروض التقديمية",
        duration: "أسبوع واحد",
        topics: ["تصميم العرض", "مهارات الإلقاء", "التعامل مع الأسئلة"],
      },
      {
        title: "التفاوض المهني",
        duration: "أسبوع واحد",
        topics: ["استراتيجيات التفاوض", "حل النزاعات", "بناء العلاقات"],
      },
    ],
  },
  {
    id: 3,
    title: "التخطيط الاستراتيجي",
    description:
      "برنامج متقدم في التخطيط الاستراتيجي وتحديد الأهداف وقياس مؤشرات الأداء الرئيسية للمؤسسات الحكومية والخاصة.",
    duration: "5 أسابيع",
    type: "تفاعلي",
    deliveryMode: "مدمج",
    category: "القيادة والإدارة",
    icon: Target,
    objectives: [
      "وضع الخطط الاستراتيجية",
      "تحديد مؤشرات الأداء الرئيسية",
      "تحليل البيئة الداخلية والخارجية",
    ],
    requirements: ["إتمام برنامج أساسيات القيادة"],
    instructor: "د. خالد العمري",
    startDate: "1 فبراير 2026",
    schedule: {
      days: ["السبت", "الثلاثاء"],
      time: "5:00 م - 8:00 م",
      sessions: 15,
    },
    materials: [
      { name: "نماذج التخطيط", type: "XLSX", size: "1 MB" },
      { name: "دراسات حالة", type: "PDF", size: "8 MB" },
    ],
    modules: [
      {
        title: "مقدمة في التخطيط الاستراتيجي",
        duration: "أسبوع واحد",
        topics: ["مفهوم الاستراتيجية", "الرؤية والرسالة", "التحليل البيئي"],
      },
      {
        title: "تحديد الأهداف",
        duration: "أسبوعان",
        topics: ["SMART Goals", "مؤشرات الأداء", "الأهداف التشغيلية"],
      },
      {
        title: "التنفيذ والمتابعة",
        duration: "أسبوعان",
        topics: ["خطط العمل", "المراجعة الدورية", "التحسين المستمر"],
      },
    ],
  },
  {
    id: 4,
    title: "إدارة المشاريع الاحترافية",
    description:
      "برنامج معتمد في إدارة المشاريع وفق أفضل الممارسات والمعايير العالمية مع شهادة معتمدة عند الإتمام.",
    duration: "6 أسابيع",
    type: "تطبيقي",
    deliveryMode: "عن بُعد",
    category: "المهارات المهنية",
    icon: TrendingUp,
    objectives: [
      "تخطيط وتنفيذ المشاريع",
      "إدارة الموارد والميزانيات",
      "متابعة وتقييم الأداء",
    ],
    requirements: ["خبرة سابقة في العمل المؤسسي"],
    instructor: "م. فاطمة الزهراني",
    startDate: "15 فبراير 2026",
    schedule: {
      days: ["الأحد", "الثلاثاء", "الخميس"],
      time: "7:00 م - 9:00 م",
      sessions: 18,
    },
    materials: [
      { name: "دليل PMBOK", type: "PDF", size: "12 MB" },
      { name: "قوالب المشاريع", type: "ZIP", size: "3 MB" },
      { name: "أدوات التخطيط", type: "XLSX", size: "2 MB" },
    ],
    modules: [
      {
        title: "أساسيات إدارة المشاريع",
        duration: "أسبوعان",
        topics: ["دورة حياة المشروع", "أصحاب المصلحة", "ميثاق المشروع"],
      },
      {
        title: "التخطيط والجدولة",
        duration: "أسبوعان",
        topics: ["هيكل تجزئة العمل", "مخطط جانت", "إدارة الموارد"],
      },
      {
        title: "التنفيذ والإغلاق",
        duration: "أسبوعان",
        topics: ["إدارة المخاطر", "ضبط الجودة", "إغلاق المشروع"],
      },
    ],
  },
  {
    id: 5,
    title: "الابتكار وريادة الأعمال",
    description:
      "اكتشف عالم الابتكار والريادة وتعلم كيفية تحويل الأفكار إلى مشاريع ناجحة ومستدامة في السوق.",
    duration: "4 أسابيع",
    type: "تفاعلي",
    deliveryMode: "حضوري",
    category: "التقنية والابتكار",
    icon: GraduationCap,
    objectives: [
      "توليد الأفكار الإبداعية",
      "بناء نموذج العمل",
      "جذب الاستثمارات",
    ],
    requirements: ["شغف بالابتكار والتطوير"],
    instructor: "أ. محمد الدوسري",
    startDate: "1 مارس 2026",
    schedule: {
      days: ["السبت", "الاثنين", "الأربعاء"],
      time: "5:00 م - 7:00 م",
      sessions: 12,
    },
    materials: [
      { name: "Business Model Canvas", type: "PDF", size: "1 MB" },
      { name: "ورشات العمل", type: "PDF", size: "5 MB" },
    ],
    modules: [
      {
        title: "التفكير الإبداعي",
        duration: "أسبوع واحد",
        topics: ["تقنيات العصف الذهني", "Design Thinking", "حل المشكلات"],
      },
      {
        title: "نموذج العمل",
        duration: "أسبوعان",
        topics: ["Canvas Model", "دراسة السوق", "التسعير"],
      },
      {
        title: "التمويل والنمو",
        duration: "أسبوع واحد",
        topics: ["مصادر التمويل", "عرض المستثمرين", "استراتيجيات النمو"],
      },
    ],
  },
  {
    id: 6,
    title: "التحول الرقمي",
    description:
      "برنامج متخصص في فهم التحول الرقمي وتطبيقاته في المؤسسات الحكومية والخاصة مع أمثلة عملية.",
    duration: "4 أسابيع",
    type: "نظري وتطبيقي",
    deliveryMode: "مدمج",
    category: "التقنية والابتكار",
    icon: Laptop,
    objectives: [
      "فهم استراتيجيات التحول الرقمي",
      "تطبيق التقنيات الحديثة",
      "إدارة التغيير التقني",
    ],
    requirements: ["معرفة أساسية بالتقنية"],
    instructor: "د. نورة السعيد",
    startDate: "15 مارس 2026",
    schedule: {
      days: ["الأحد", "الأربعاء"],
      time: "6:00 م - 9:00 م",
      sessions: 12,
    },
    materials: [
      { name: "استراتيجيات التحول", type: "PDF", size: "4 MB" },
      { name: "دراسات حالة رقمية", type: "PDF", size: "6 MB" },
      { name: "أدوات التقييم", type: "XLSX", size: "1 MB" },
    ],
    modules: [
      {
        title: "مقدمة في التحول الرقمي",
        duration: "أسبوع واحد",
        topics: ["مفهوم التحول الرقمي", "التقنيات الناشئة", "البنية التحتية"],
      },
      {
        title: "استراتيجيات التحول",
        duration: "أسبوعان",
        topics: ["خارطة الطريق", "إدارة التغيير", "قياس النجاح"],
      },
      {
        title: "التطبيق العملي",
        duration: "أسبوع واحد",
        topics: ["مشاريع التحول", "أفضل الممارسات", "الدروس المستفادة"],
      },
    ],
  },
];

// Outputs data
export const outputs: TrainingOutput[] = [
  {
    id: 1,
    title: "شهادة إتمام المرحلة",
    description: "شهادة رسمية معتمدة تثبت إتمامك لمرحلة التأهيل والتدريب بنجاح.",
    icon: Award,
    isComingSoon: false,
  },
  {
    id: 2,
    title: "الخطة التطويرية الشخصية",
    description: "خطة مفصلة لتطوير مهاراتك بناءً على نتائج التقييم والتدريب.",
    icon: Target,
    isComingSoon: false,
  },
  {
    id: 3,
    title: "تقرير الكفاءات",
    description: "تقرير شامل يوضح مستوى كفاءاتك ونقاط القوة والتحسين.",
    icon: FileText,
    isComingSoon: false,
  },
];

export const getProgramById = (id: number): TrainingProgram | undefined => {
  return trainingPrograms.find((p) => p.id === id);
};
