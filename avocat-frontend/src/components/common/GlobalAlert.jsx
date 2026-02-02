const GlobalAlert = ({ type = 'info', message, onClose }) => {
  const alertStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  const isVisible = Boolean(message);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-6 left-1/2 z-50 w-[min(90%,420px)] -translate-x-1/2 rounded-xl px-5 py-3 shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      } ${alertStyles[type]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="flex-1 text-sm font-semibold leading-relaxed" title={message}>
          {message}
        </p>
        {message && (
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق التنبيه"
            className="rounded-full border border-white/30 px-2 py-0.5 text-sm text-white transition hover:bg-white/10"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default GlobalAlert;
