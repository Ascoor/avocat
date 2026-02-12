interface StatusBadgeProps {
  status?: string;
  lang?: 'en' | 'ar';
}

const statusMap: Record<string, { en: string; ar: string; className: string }> = {
  open: { en: 'Open', ar: 'مفتوحة', className: 'status-open' },
  closed: { en: 'Closed', ar: 'مغلقة', className: 'status-closed' },
  pending: { en: 'Pending', ar: 'معلقة', className: 'status-pending' },
  in_progress: { en: 'In Progress', ar: 'قيد التنفيذ', className: 'status-in-progress' },
  'in-progress': { en: 'In Progress', ar: 'قيد التنفيذ', className: 'status-in-progress' },
  completed: { en: 'Completed', ar: 'مكتملة', className: 'status-open' },
  cancelled: { en: 'Cancelled', ar: 'ملغاة', className: 'status-closed' },
  scheduled: { en: 'Scheduled', ar: 'مجدولة', className: 'status-in-progress' },
  postponed: { en: 'Postponed', ar: 'مؤجلة', className: 'status-pending' },
};

const StatusBadge = ({ status = 'pending', lang = 'en' }: StatusBadgeProps) => {
  const config = statusMap[status] || { en: status, ar: status, className: 'status-pending' };

  return (
    <span className={`status-badge ${config.className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {lang === 'ar' ? config.ar : config.en}
    </span>
  );
};

export default StatusBadge;
