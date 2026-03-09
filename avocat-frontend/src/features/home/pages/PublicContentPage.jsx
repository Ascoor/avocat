import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import HomeHeader from '../components/HomeHeader';
import HomeFooter from '../components/HomeFooter';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import CTABlock from '../components/CTABlock';
import ServiceCard from '../components/ServiceCard';
import IndustryCard from '../components/IndustryCard';
import TeamCard from '../components/TeamCard';
import ArticleCard from '../components/ArticleCard';
import { useLanguage } from '@/shared/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { articles, industries, services, teamMembers } from '../content/siteData';
import { officeInfo, pageMetaContent, serviceDetailsContent } from '../content/publicPages';
import { usePageMeta } from '../hooks/usePageMeta';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const legalPageMap = {
  privacy: 'privacy',
  terms: 'terms',
  disclaimer: 'disclaimer',
};

const PublicContentPage = ({ pageKey }) => {
  const { t, language } = useLanguage();
  const params = useParams();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', consent: false, preferredContact: 'phone' });

  const currentOfficeInfo = officeInfo[language === 'en' ? 'en' : 'ar'];
  const isEnglish = language === 'en';
  const selectedService = services.find((service) => service.id === params.id) || services[0];
  const selectedArticle = articles.find((article) => article.id === params.id) || articles[0];

  const metaKey = pageKey === 'privacy' || pageKey === 'terms' || pageKey === 'disclaimer' ? 'legal' : pageKey;
  const meta = pageMetaContent[metaKey]?.[isEnglish ? 'en' : 'ar'] || pageMetaContent.home[isEnglish ? 'en' : 'ar'];

  usePageMeta({ title: meta.title, description: meta.description });

  const breadcrumbItems = useMemo(() => {
    if (legalPageMap[pageKey]) {
      return [
        { label: t('publicSite.nav.home'), path: '/' },
        { label: isEnglish ? 'Legal' : 'قانوني' },
      ];
    }
    return [{ label: t('publicSite.nav.home'), path: '/' }, { label: t(`publicSite.nav.${pageKey}`) }];
  }, [isEnglish, pageKey, t]);

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = isEnglish ? 'Please enter your full name.' : 'يرجى إدخال الاسم الكامل.';
    if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone)) nextErrors.phone = isEnglish ? 'Please enter a valid Egyptian mobile number.' : 'يرجى إدخال رقم هاتف مصري صحيح.';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = isEnglish ? 'Please enter a valid email address.' : 'يرجى إدخال بريد إلكتروني صحيح.';
    if (!formData.message.trim()) nextErrors.message = isEnglish ? 'Please provide a short summary of your request.' : 'يرجى كتابة ملخص موجز للطلب.';
    if (!formData.consent) nextErrors.consent = isEnglish ? 'You must accept the privacy notice before submitting.' : 'يجب الموافقة على إشعار الخصوصية قبل الإرسال.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSuccess(true);
    setFormData({ name: '', phone: '', email: '', message: '', consent: false, preferredContact: 'phone' });
  };

  const updateField = (key, value) => {
    setSuccess(false);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const legalNotice = isEnglish
    ? 'Submitting this form does not automatically create an attorney-client relationship. We will review your request and contact you.'
    : 'إرسال هذا النموذج لا ينشئ تلقائيًا علاقة محامٍ-موكل. سيتم مراجعة الطلب والتواصل معكم.';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: isEnglish ? 'Avocat Law Firm' : 'مكتب أفوكات للمحاماة',
    telephone: currentOfficeInfo.phone,
    email: currentOfficeInfo.email,
    address: currentOfficeInfo.address,
    areaServed: isEnglish ? 'Egypt' : 'مصر',
  };

  const breadSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path || '',
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish ? selectedArticle.titleEn : selectedArticle.title,
    author: { '@type': 'Person', name: isEnglish ? 'Avocat Editorial Team' : 'فريق التحرير - أفوكات' },
    datePublished: '2026-01-01',
    articleSection: isEnglish ? selectedArticle.categoryEn : selectedArticle.category,
  };

  const renderForm = (isBooking = false) => (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">{isEnglish ? 'Full Name' : 'الاسم الكامل'}</label>
        <input id="name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">{isEnglish ? 'Phone Number' : 'رقم الهاتف'}</label>
        <input id="phone" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">{isEnglish ? 'Email Address (optional)' : 'البريد الإلكتروني (اختياري)'}</label>
        <input id="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
      {isBooking && (
        <div>
          <label htmlFor="preferredContact" className="mb-1 block text-sm font-medium">{isEnglish ? 'Preferred Contact Method' : 'وسيلة التواصل المفضلة'}</label>
          <select id="preferredContact" value={formData.preferredContact} onChange={(e) => updateField('preferredContact', e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="phone">{isEnglish ? 'Phone' : 'هاتف'}</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">{isEnglish ? 'Email' : 'بريد إلكتروني'}</option>
          </select>
        </div>
      )}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">{isEnglish ? 'Case Summary' : 'ملخص الطلب'}</label>
        <textarea id="message" rows={4} value={formData.message} onChange={(e) => updateField('message', e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>
      <p className="rounded-lg bg-surface px-3 py-2 text-xs text-muted-foreground">{isEnglish ? 'Privacy Notice: We only use submitted data to review your request and schedule communications. Learn more in our' : 'إشعار خصوصية: نستخدم البيانات المرسلة فقط لمراجعة الطلب وترتيب التواصل. اقرأ المزيد في'} <Link className="text-primary underline" to="/privacy">{isEnglish ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link>.</p>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={formData.consent} onChange={(e) => updateField('consent', e.target.checked)} className="mt-1" />
        <span>{isEnglish ? 'I consent to the processing of my submitted data for communication regarding my legal request.' : 'أوافق على معالجة البيانات المرسلة لغرض التواصل بشأن طلبي القانوني.'}</span>
      </label>
      {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}
      <p className="text-xs text-muted-foreground">{legalNotice}</p>
      <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:brightness-110" type="submit">{isEnglish ? (isBooking ? 'Submit Consultation Request' : 'Send Message') : (isBooking ? 'إرسال طلب الاستشارة' : 'إرسال الرسالة')}</button>
      {success && <p className="flex items-center gap-2 text-sm text-emerald-600"><CheckCircle2 className="h-4 w-4" />{isEnglish ? 'Request submitted successfully. Our team will contact you shortly.' : 'تم إرسال الطلب بنجاح. سيتواصل معكم فريق المكتب قريبًا.'}</p>}
    </form>
  );

  const renderPage = () => {
    switch (pageKey) {
      case 'about':
        return <div className="space-y-6"><SectionHeading align="start" title={isEnglish ? 'About Avocat Law Firm' : 'عن مكتب أفوكات للمحاماة'} description={isEnglish ? 'A professional legal practice serving individuals and businesses in Egypt.' : 'مكتب قانوني مهني يقدم خدمات قانونية للأفراد والشركات في مصر.'} /><div className="grid gap-4 md:grid-cols-2">{[
          isEnglish ? 'Our Story: Avocat was founded to deliver legal work with structure, clarity, and ethical commitment.' : 'قصة المكتب: تأسس أفوكات لتقديم عمل قانوني منظم وواضح مع التزام مهني وأخلاقي.',
          isEnglish ? 'Mission: Provide practical legal solutions aligned with client goals and legal obligations.' : 'الرسالة: تقديم حلول قانونية عملية تتسق مع أهداف العميل والمتطلبات القانونية.',
          isEnglish ? 'Vision: Build a trusted legal institution in Egypt with consistent quality and clear communication.' : 'الرؤية: بناء مؤسسة قانونية موثوقة في مصر بجودة ثابتة وتواصل واضح.',
          isEnglish ? 'Values: Integrity, confidentiality, accountability, and client-centered service.' : 'القيم: النزاهة، السرية، المسؤولية، والتركيز على خدمة العميل.',
        ].map((item) => <article key={item} className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">{item}</article>)}</div></div>;
      case 'services':
        return <><SectionHeading align="start" title={t('publicSite.services.title')} description={t('publicSite.services.desc')} /><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <ServiceCard key={service.id} {...service} index={index} />)}</div></>;
      case 'serviceDetails':
        return <div className="space-y-8"><SectionHeading align="start" title={isEnglish ? selectedService.titleEn : selectedService.title} description={isEnglish ? selectedService.summaryEn : selectedService.summary} /><div className="grid gap-6 md:grid-cols-3">{['audience', 'deliverables', 'steps'].map((sectionKey) => <article key={sectionKey} className="rounded-xl border border-border bg-card p-5"><h3 className="mb-3 font-semibold">{sectionKey === 'audience' ? t('publicSite.serviceDetails.forWhom') : sectionKey === 'deliverables' ? t('publicSite.serviceDetails.deliverables') : t('publicSite.serviceDetails.steps')}</h3><ul className="space-y-2 text-sm text-muted-foreground">{serviceDetailsContent[sectionKey][isEnglish ? 'en' : 'ar'].map((line) => <li key={line}>• {line}</li>)}</ul></article>)}</div><Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-5"><AccordionItem value="faq1"><AccordionTrigger>{isEnglish ? 'How quickly do you respond?' : 'ما سرعة الرد على الطلبات؟'}</AccordionTrigger><AccordionContent>{isEnglish ? 'Initial contact is typically made within one business day.' : 'عادة يتم التواصل الأولي خلال يوم عمل واحد.'}</AccordionContent></AccordionItem><AccordionItem value="faq2"><AccordionTrigger>{isEnglish ? 'Can support be provided remotely?' : 'هل يمكن تقديم الخدمة عن بُعد؟'}</AccordionTrigger><AccordionContent>{isEnglish ? 'Yes, depending on the nature of the legal matter and required documents.' : 'نعم، وفقًا لطبيعة الملف والمستندات المطلوبة.'}</AccordionContent></AccordionItem></Accordion></div>;
      case 'industries':
        return <><SectionHeading align="start" title={t('publicSite.industries.title')} description={t('publicSite.industries.desc')} /><div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{industries.map((industry, index) => <IndustryCard key={industry.id} {...industry} index={index} />)}</div></>;
      case 'team':
        return <><SectionHeading align="start" title={t('publicSite.team.title')} description={t('publicSite.team.desc')} /><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">{teamMembers.map((member, index) => <TeamCard key={member.id} {...member} index={index} />)}</div></>;
      case 'insights':
        return <><SectionHeading align="start" title={t('publicSite.insights.title')} description={t('publicSite.insights.desc')} /><div className="grid grid-cols-1 gap-6 md:grid-cols-2">{articles.map((article, index) => <ArticleCard key={article.id} {...article} index={index} />)}</div></>;
      case 'articleDetails':
        return <article className="rounded-xl border border-border bg-card p-6"><span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{isEnglish ? selectedArticle.categoryEn : selectedArticle.category}</span><h1 className="mb-3 text-2xl font-bold">{isEnglish ? selectedArticle.titleEn : selectedArticle.title}</h1><p className="mb-5 text-sm text-muted-foreground">{isEnglish ? selectedArticle.dateEn : selectedArticle.date} • {isEnglish ? selectedArticle.readTimeEn : selectedArticle.readTime} • {isEnglish ? 'Author: Avocat Editorial Team' : 'الكاتب: فريق التحرير - أفوكات'}</p><div className="space-y-3 text-sm leading-7 text-muted-foreground"><p>{isEnglish ? selectedArticle.summaryEn : selectedArticle.summary}</p><p>{isEnglish ? 'This article is educational content and does not constitute a substitute for formal legal advice tailored to your specific case.' : 'هذا المقال محتوى معرفي عام ولا يغني عن الاستشارة القانونية المتخصصة بحسب وقائع كل حالة.'}</p></div><div className="mt-8 border-t border-border pt-4"><h3 className="mb-3 font-semibold">{isEnglish ? 'Related Insights' : 'مقالات ذات صلة'}</h3><div className="grid gap-4 md:grid-cols-2">{articles.filter((item) => item.id !== selectedArticle.id).slice(0, 2).map((item, index) => <ArticleCard key={item.id} {...item} index={index} />)}</div></div></article>;
      case 'contact':
        return <div className="grid gap-6 lg:grid-cols-2"><div className="space-y-4 rounded-xl border border-border bg-card p-6"><SectionHeading align="start" title={isEnglish ? 'Contact Us' : 'تواصل معنا'} description={isEnglish ? 'Share your request and we will route it to the appropriate legal team member.' : 'شارك طلبك وسيتم توجيهه إلى عضو الفريق القانوني المختص.'} /><ul className="space-y-3 text-sm text-muted-foreground"><li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{currentOfficeInfo.phone}</li><li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{currentOfficeInfo.email}</li><li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{currentOfficeInfo.address}</li></ul></div>{renderForm(false)}</div>;
      case 'book':
        return <div className="space-y-6"><SectionHeading align="start" title={isEnglish ? 'Book a Legal Consultation' : 'احجز استشارة قانونية'} description={isEnglish ? 'Provide key details and our team will contact you to confirm availability.' : 'قدّم البيانات الأساسية وسيتواصل الفريق لتأكيد الموعد المناسب.'} />{renderForm(true)}</div>;
      case 'privacy':
        return <article className="rounded-xl border border-border bg-card p-6 text-sm leading-7 text-muted-foreground"><h1 className="mb-4 text-xl font-bold text-foreground">{isEnglish ? 'Privacy Policy (Scaffold)' : 'سياسة الخصوصية (نسخة تمهيدية)'}</h1><p>{isEnglish ? 'We collect only the information necessary to review legal requests and respond to inquiries. Data is processed in line with applicable Egyptian laws, including Law No. 151 of 2020, and retained only as needed for legal and operational purposes.' : 'نجمع فقط البيانات اللازمة لمراجعة الطلبات القانونية والرد على الاستفسارات. تتم المعالجة وفق الأطر القانونية المعمول بها في مصر، بما في ذلك قانون رقم 151 لسنة 2020، مع الاحتفاظ بالبيانات لمدة مناسبة للغرض القانوني والتشغيلي.'}</p></article>;
      case 'terms':
        return <article className="rounded-xl border border-border bg-card p-6 text-sm leading-7 text-muted-foreground"><h1 className="mb-4 text-xl font-bold text-foreground">{isEnglish ? 'Terms & Conditions (Scaffold)' : 'الشروط والأحكام (نسخة تمهيدية)'}</h1><p>{isEnglish ? 'By using this website, you acknowledge that published materials are informational and not legal advice. Service engagement requires a formal agreement defining scope, fees, and responsibilities.' : 'باستخدام هذا الموقع، فإنك تقر بأن المحتوى المنشور لغرض المعلومات العامة ولا يمثل استشارة قانونية. تقديم الخدمة القانونية يتطلب اتفاقًا مكتوبًا يحدد النطاق والأتعاب والمسؤوليات.'}</p></article>;
      case 'disclaimer':
        return <article className="rounded-xl border border-border bg-card p-6 text-sm leading-7 text-muted-foreground"><h1 className="mb-4 text-xl font-bold text-foreground">{isEnglish ? 'Legal Disclaimer (Scaffold)' : 'إخلاء المسؤولية (نسخة تمهيدية)'}</h1><p>{isEnglish ? 'No attorney-client relationship is established solely through browsing this website, submitting a form, or receiving preliminary responses. Legal advice depends on full facts and signed engagement terms.' : 'لا تنشأ علاقة محامٍ-موكل بمجرد تصفح الموقع أو إرسال نموذج أو تلقي رد أولي. تعتمد الاستشارة القانونية على الوقائع الكاملة واتفاق التعاقد المكتوب.'}</p></article>;
      case 'clientPortal':
        return <article className="rounded-xl border border-border bg-card p-6 text-sm leading-7 text-muted-foreground"><h1 className="mb-4 text-xl font-bold text-foreground">{isEnglish ? 'Client Portal (Coming Soon)' : 'بوابة العملاء (قريبًا)'}</h1><p>{isEnglish ? 'This page is a future entry point for authenticated client access, case tracking, and document exchange.' : 'هذه الصفحة نقطة دخول مستقبلية للوصول الموثق للعملاء ومتابعة الملفات وتبادل المستندات.'}</p></article>;
      default:
        return <div className="rounded-xl border border-border bg-card p-6 text-muted-foreground">{isEnglish ? 'Page content is being prepared.' : 'يتم تجهيز محتوى الصفحة.'}</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup data={localBusinessSchema} />
      <SchemaMarkup data={breadSchema} />
      {pageKey === 'articleDetails' && <SchemaMarkup data={articleSchema} />}
      <HomeHeader />
      <main className="flex-1 section-padding">
        <div className="container space-y-8">
          <Breadcrumbs items={breadcrumbItems} />
          {renderPage()}
        </div>
      </main>
      <CTABlock title={t('publicSite.cta.title')} description={t('publicSite.cta.desc')} />
      <HomeFooter />
    </div>
  );
};

export default PublicContentPage;
