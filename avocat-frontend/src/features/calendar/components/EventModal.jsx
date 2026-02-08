import { useState } from 'react';

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, date });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">إضافة حدث جديد</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="عنوان الحدث"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="وصف الحدث"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
