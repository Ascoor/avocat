import React, { useState } from 'react';
import useAuth from './AuthUser';

const Register = ({ toggleLoginForm, handleFormClose }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }
    try {
      const success = await register(name, email, password, confirmPassword);
      if (!success) {
        setError('حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.');
      } else {
        setError('');
        handleFormClose();
      }
    } catch {
      setError('حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm bg-gray-900 text-white rounded-3xl p-8 shadow-lg shadow-blue-200/30 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-200/70 mb-4">
          إنشاء حساب
        </h2>
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-800 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-300/50"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-300/50"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-300/50"
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-300/50"
          />
          <button
            type="submit"
            className="w-full font-bold py-2 bg-gradient-to-r from-blue-300/50 to-blue-200/50 text-white rounded-lg shadow-lg hover:from-blue-200/50 hover:to-blue-500/50 transform hover:scale-105 transition-all"
          >
            إنشاء حساب
          </button>
          <button
            onClick={toggleLoginForm}
            className="w-full py-2 bg-transparent text-blue-300/80 border border-blue-200/80 rounded-lg hover:bg-blue-300/70 hover:text-white transition-all transform hover:scale-105"
          >
            لديك حساب؟ تسجيل الدخول
          </button>
          <button
            onClick={handleFormClose}
            className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
          >
            إلغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
