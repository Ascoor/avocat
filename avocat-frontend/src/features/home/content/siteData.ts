import { Briefcase, Building2, FileText, Landmark, Scale, Shield, type LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  icon: LucideIcon;
}

export interface IndustryItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  areas: string[];
  areasEn: string[];
  bio: string;
  bioEn: string;
  languages: string[];
}

export interface ArticleItem {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  category: string;
  categoryEn: string;
  date: string;
  dateEn: string;
  readTime: string;
  readTimeEn: string;
}

export const services: ServiceItem[] = [
  {
    id: 'corporate-advisory',
    title: 'الاستشارات القانونية للشركات',
    titleEn: 'Corporate Legal Advisory',
    summary: 'دعم قانوني متكامل للشركات في التأسيس والحوكمة وإدارة المخاطر.',
    summaryEn: 'Comprehensive legal support for incorporation, governance, and risk management.',
    icon: Briefcase,
  },
  {
    id: 'litigation',
    title: 'التقاضي وتسوية المنازعات',
    titleEn: 'Litigation & Dispute Resolution',
    summary: 'تمثيل احترافي أمام المحاكم والجهات القضائية في مختلف الدعاوى.',
    summaryEn: 'Professional court representation across civil, commercial, and administrative disputes.',
    icon: Scale,
  },
  {
    id: 'contracts',
    title: 'العقود والصياغة القانونية',
    titleEn: 'Contracts & Legal Drafting',
    summary: 'صياغة ومراجعة العقود بما يحمي المصالح ويقلل النزاعات المستقبلية.',
    summaryEn: 'Drafting and reviewing contracts that protect interests and reduce future disputes.',
    icon: FileText,
  },
  {
    id: 'real-estate',
    title: 'القضايا العقارية',
    titleEn: 'Real Estate Matters',
    summary: 'دعم قانوني في التسجيل والنزاعات العقارية ونقل الملكية.',
    summaryEn: 'Legal support for registration, title transfer, and property-related disputes.',
    icon: Building2,
  },
  {
    id: 'compliance',
    title: 'الامتثال والحوكمة',
    titleEn: 'Compliance & Governance',
    summary: 'بناء سياسات وإجراءات امتثال فعالة وفق المتطلبات التنظيمية.',
    summaryEn: 'Building practical compliance frameworks aligned with regulatory obligations.',
    icon: Shield,
  },
  {
    id: 'administrative',
    title: 'القضايا الإدارية',
    titleEn: 'Administrative Law',
    summary: 'التعامل مع المنازعات الإدارية والطعن على القرارات أمام مجلس الدولة.',
    summaryEn: 'Handling administrative disputes and appeals before administrative courts.',
    icon: Landmark,
  },
];

export const industries: IndustryItem[] = [
  {
    id: 'technology',
    title: 'التقنية والشركات الناشئة',
    titleEn: 'Technology & Startups',
    description: 'حلول قانونية مرنة تناسب طبيعة النمو السريع للشركات التقنية.',
    descriptionEn: 'Agile legal support tailored to rapid-growth startup environments.',
  },
  {
    id: 'construction',
    title: 'المقاولات والتطوير العقاري',
    titleEn: 'Construction & Real Estate Development',
    description: 'إدارة عقود المشاريع وتسوية النزاعات المرتبطة بالأعمال الإنشائية.',
    descriptionEn: 'Project contract management and dispute support for construction operations.',
  },
  {
    id: 'healthcare',
    title: 'الرعاية الصحية',
    titleEn: 'Healthcare',
    description: 'دعم قانوني للمنشآت الصحية في الامتثال والتشغيل والعقود.',
    descriptionEn: 'Legal advisory for healthcare providers across compliance and operations.',
  },
  {
    id: 'manufacturing',
    title: 'الصناعة والتوريد',
    titleEn: 'Manufacturing & Supply Chain',
    description: 'معالجة قانونية لعقود التوريد والمسؤولية والنزاعات التجارية.',
    descriptionEn: 'End-to-end legal handling for supply contracts and commercial disputes.',
  },
  {
    id: 'fintech',
    title: 'الخدمات المالية والتقنية المالية',
    titleEn: 'Financial Services & FinTech',
    description: 'حلول قانونية تدعم الامتثال المالي والتحول الرقمي.',
    descriptionEn: 'Legal frameworks for financial compliance and digital transformation.',
  },
  {
    id: 'family-business',
    title: 'الشركات العائلية',
    titleEn: 'Family Businesses',
    description: 'هيكلة قانونية واضحة لحوكمة واستمرارية الأعمال العائلية.',
    descriptionEn: 'Clear legal structuring for governance and continuity of family enterprises.',
  },
];

export const teamMembers: TeamMemberItem[] = [
  {
    id: 'm1',
    name: 'أحمد السعيد',
    nameEn: 'Ahmed El-Sayed',
    role: 'شريك مؤسس',
    roleEn: 'Founding Partner',
    areas: ['قانون الشركات', 'الامتثال'],
    areasEn: ['Corporate Law', 'Compliance'],
    bio: 'يمتلك خبرة تتجاوز 15 عامًا في إدارة الملفات القانونية للشركات.',
    bioEn: '15+ years of experience advising businesses on strategic legal matters.',
    languages: ['AR', 'EN'],
  },
  {
    id: 'm2',
    name: 'سارة محمود',
    nameEn: 'Sara Mahmoud',
    role: 'محامية أولى - التقاضي',
    roleEn: 'Senior Litigation Lawyer',
    areas: ['التقاضي التجاري', 'التحكيم'],
    areasEn: ['Commercial Litigation', 'Arbitration'],
    bio: 'متخصصة في إدارة الدعاوى المعقدة وتمثيل العملاء أمام الجهات القضائية.',
    bioEn: 'Specialized in complex disputes and high-stakes courtroom representation.',
    languages: ['AR', 'EN'],
  },
  {
    id: 'm3',
    name: 'محمد نادر',
    nameEn: 'Mohamed Nader',
    role: 'محامي عقود',
    roleEn: 'Contracts Counsel',
    areas: ['العقود', 'المراجعة القانونية'],
    areasEn: ['Contracts', 'Legal Review'],
    bio: 'يركز على الصياغة الدقيقة للعقود بما يدعم مصالح العملاء التجارية.',
    bioEn: 'Focused on robust drafting and risk-balanced contract structures.',
    languages: ['AR', 'EN'],
  },
  {
    id: 'm4',
    name: 'نورهان علي',
    nameEn: 'Nourhan Ali',
    role: 'مستشارة قانونية',
    roleEn: 'Legal Advisor',
    areas: ['قانون العمل', 'شؤون الموظفين'],
    areasEn: ['Labor Law', 'HR Matters'],
    bio: 'تدعم الشركات في قضايا العمل والسياسات الداخلية وإدارة المخاطر.',
    bioEn: 'Supports employers on labor matters, internal policies, and legal risk.',
    languages: ['AR', 'EN'],
  },
];

export const articles: ArticleItem[] = [
  {
    id: 'contract-risk-management',
    title: 'كيف تقلل المخاطر القانونية في عقود الشركات؟',
    titleEn: 'How to Reduce Legal Risk in Corporate Contracts',
    summary: 'خطوات عملية لتحسين صياغة العقود وتجنب النزاعات المستقبلية.',
    summaryEn: 'Practical steps to strengthen contract drafting and prevent disputes.',
    category: 'العقود',
    categoryEn: 'Contracts',
    date: 'يناير 2026',
    dateEn: 'Jan 2026',
    readTime: '5 دقائق',
    readTimeEn: '5 min',
  },
  {
    id: 'startup-legal-basics',
    title: 'الأساس القانوني للشركات الناشئة في مصر',
    titleEn: 'Legal Basics for Startups in Egypt',
    summary: 'دليل مختصر للتأسيس الصحيح وحوكمة الكيان في المراحل الأولى.',
    summaryEn: 'A concise guide to proper setup and early-stage legal governance.',
    category: 'الشركات',
    categoryEn: 'Corporate',
    date: 'ديسمبر 2025',
    dateEn: 'Dec 2025',
    readTime: '7 دقائق',
    readTimeEn: '7 min',
  },
  {
    id: 'litigation-readiness',
    title: 'الاستعداد للتقاضي: ما الذي يجب توثيقه؟',
    titleEn: 'Litigation Readiness: What to Document',
    summary: 'أهم الوثائق والإجراءات التي تقوّي موقفك القانوني قبل النزاع.',
    summaryEn: 'Key records and internal practices that strengthen your legal position.',
    category: 'التقاضي',
    categoryEn: 'Litigation',
    date: 'نوفمبر 2025',
    dateEn: 'Nov 2025',
    readTime: '6 دقائق',
    readTimeEn: '6 min',
  },
  {
    id: 'compliance-checklist',
    title: 'قائمة امتثال قانوني للشركات المتوسطة',
    titleEn: 'Legal Compliance Checklist for Mid-Sized Companies',
    summary: 'نقاط أساسية تساعد إدارات الشركات على تجنب المخالفات الشائعة.',
    summaryEn: 'Core checkpoints to help operations teams avoid common compliance gaps.',
    category: 'الامتثال',
    categoryEn: 'Compliance',
    date: 'أكتوبر 2025',
    dateEn: 'Oct 2025',
    readTime: '4 دقائق',
    readTimeEn: '4 min',
  },
];
