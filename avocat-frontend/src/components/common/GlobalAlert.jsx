const GlobalAlert = ({ type, message, onClose }) => {
  const alertStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
        message ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${alertStyles[type]}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-center truncate" title={message}>
          {message}
        </p>
        {message && (
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-300 transition"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default GlobalAlert;
