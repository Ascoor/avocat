import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config/config';
import { useParams } from 'react-router-dom';

const ProfileUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const { userId } = useParams();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setRole(userData.role);
      })
      .catch((error) => {
        console.error(error.response?.data);
      });
  }, [userId]);

  const handleUpdateProfile = () => {
    const updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (role) updatedData.role = role;

    if (password && confirmPassword && password === confirmPassword) {
      updatedData.password = password;
    }

    axios
      .put(`${API_CONFIG.baseURL}/api/user/${userId}`, updatedData)
      .then(() => {
        setAlertMessage('تم التحديث بنجاح');
        setAlertVariant('success');
        setShowAlert(true);
      })
      .catch(() => {
        setAlertMessage('لم يتم تحديث البيانات');
        setAlertVariant('danger');
        setShowAlert(true);
      });
  };

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        تحديث الملف الشخصي
      </h2>
      {showAlert && (
        <div
          className={`p-4 rounded mb-4 ${
            alertVariant === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {alertMessage}
        </div>
      )}
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            الاسم
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              تأكيد كلمة المرور
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            الدور
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر الدور</option>
            <option value="1">مدير</option>
            <option value="2">محامي</option>
            <option value="3">مساعد</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleUpdateProfile}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          تحديث الملف الشخصي
        </button>
      </form>
    </div>
  );
};

export default ProfileUser;
