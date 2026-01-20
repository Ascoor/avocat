const Toolbar = ({ onViewChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onViewChange('dayGridMonth')}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        عرض شهري
      </button>
      <button
        onClick={() => onViewChange('timeGridWeek')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        عرض أسبوعي
      </button>
      <button
        onClick={() => onViewChange('timeGridDay')}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        عرض يومي
      </button>
    </div>
  );
};

export default Toolbar;
