import React, { useState } from 'react';
import {
  FaGavel,
  FaBalanceScale,
  FaClock,
  FaCalendarCheck,
  FaHistory,
  FaCalendarDay,
} from 'react-icons/fa';
import { cn } from '@shared/lib/utils';

const tabs = [
  { id: 'activities', title: 'الإجراءات القانونية الأخيرة' },
  { id: 'sessions', title: '📅 أهم جلسات الأسبوع' },
  { id: 'services', title: 'أهم خدمات الأسبوع' },
];

const activities = [
  { icon: <FaGavel />, variant: 'primary', user: 'أحمد', action: 'تم تعديل المحكمة', target: 'القضايا', time: 'منذ 5 ساعات' },
  { icon: <FaBalanceScale />, variant: 'success', user: 'سارة', action: 'تم إضافة جلسة جديدة', target: 'القضية رقم #1234', time: 'منذ ساعتين' },
  { icon: <FaClock />, variant: 'danger', user: 'خالد', action: 'تم إغلاق القضية', target: 'القضية رقم #9876', time: 'اليوم' },
];

const sessions = [
  { id: 1, lawyer: 'محمد فاروق', date: '22/02/2025', result: 'تم حضور الجلسة وحجزها', status: 'completed', icon: <FaCalendarCheck /> },
  { id: 2, lawyer: 'نهى الشريف', date: '25/02/2025', result: 'تم تأجيل الجلسة', status: 'delayed', icon: <FaHistory /> },
  { id: 3, lawyer: 'كريم حسن', date: '28/02/2025', result: 'الجلسة القادمة في موعدها', status: 'upcoming', icon: <FaCalendarDay /> },
];

const services = [
  { id: 1, serviceName: 'إعداد عقد شراكة', client: 'شركة النور التجارية', lawyer: 'أحمد العتيبي', status: 'completed', date: '20/02/2025' },
  { id: 2, serviceName: 'استشارة قانونية بشأن نزاع تجاري', client: 'المقاولون العرب', lawyer: 'منى الجبيري', status: 'in-progress', date: '22/02/2025' },
  { id: 3, serviceName: 'رفع دعوى قضائية', client: 'شركة الأمل الصناعية', lawyer: 'سعيد الدوسري', status: 'pending', date: '25/02/2025' },
  { id: 4, serviceName: 'توثيق مستندات قانونية', client: 'مؤسسة البركة العقارية', lawyer: 'هند القحطاني', status: 'completed', date: '28/02/2025' },
];

const variantClasses = {
  primary: 'bg-primary/15 text-primary',
  success: 'bg-[hsl(var(--legal-success-500)/0.15)] text-[hsl(var(--legal-success-500))]',
  danger: 'bg-destructive/15 text-destructive',
  warning: 'bg-[hsl(var(--legal-warning-500)/0.15)] text-[hsl(var(--legal-warning-500))]',
  info: 'bg-[hsl(var(--neon)/0.15)] text-[hsl(var(--neon))]',
};

const statusToVariant = {
  completed: 'success',
  delayed: 'warning',
  upcoming: 'info',
  'in-progress': 'warning',
  pending: 'danger',
};

const DashboardMultCards = () => {
  const [activeTab, setActiveTab] = useState('activities');

  return (
    <div className="card-premium p-4 sm:p-6">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-5 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'tab-pill text-xs sm:text-sm',
              activeTab === tab.id && 'is-active'
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Activities */}
      {activeTab === 'activities' && (
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground mb-3">الإجراءات القانونية الأخيرة</h2>
          <ul className="space-y-2">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className={cn('w-10 h-10 flex items-center justify-center rounded-full text-sm', variantClasses[activity.variant])}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.user} {activity.action}{' '}
                    <span className="text-primary font-semibold">{activity.target}</span>
                  </p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground mb-3">📅 أهم جلسات الأسبوع</h2>
          <ul className="space-y-2">
            {sessions.map((session) => (
              <li key={session.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className={cn('w-10 h-10 flex items-center justify-center rounded-full text-sm', variantClasses[statusToVariant[session.status]])}>
                  {session.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{session.lawyer}</p>
                  <p className="text-xs text-muted-foreground">{session.date}</p>
                  <p className={cn('text-xs font-medium mt-0.5', 
                    session.status === 'completed' ? 'text-[hsl(var(--legal-success-500))]' :
                    session.status === 'delayed' ? 'text-[hsl(var(--legal-warning-500))]' :
                    'text-[hsl(var(--neon))]'
                  )}>
                    {session.result}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Services */}
      {activeTab === 'services' && (
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground mb-3">📋 خدمات الأسبوع</h2>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className={cn('w-10 h-10 flex items-center justify-center rounded-full text-sm', variantClasses[statusToVariant[service.status] || 'primary'])}>
                  ⚙️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{service.serviceName}</p>
                  <p className="text-xs text-muted-foreground">العميل: {service.client}</p>
                  <p className="text-xs text-muted-foreground">المحامي: {service.lawyer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardMultCards;