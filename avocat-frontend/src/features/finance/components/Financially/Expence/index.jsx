import { useState, useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import api from '@shared/services/api/axiosConfig';

const ExpenseIndex = () => {
  const [expenses, setExpenses] = useState([]);
  const [identifier, setIdentifier] = useState('');
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');

  const isAtLeastOneFieldFilled = () => {
    return (
      identifier.trim() !== '' || category.trim() !== '' || startDate || endDate
    );
  };

  useEffect(() => {
    api
      .get('/expense_categories')
      .then((response) => {
        setExpenseCategories(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching expense categories:', error);
      });
  }, []);

  const handleSearch = async () => {
    try {
      if (!isAtLeastOneFieldFilled()) {
        setError('لابد من اختيار عنصر واحد على الأقل للبحث.');
        setTimeout(() => setError(''), 6000);
        return;
      }

      const searchCriteria = {
        identifier,
        category,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
      };

      const response = await api.get('/expenses/search', {
        params: searchCriteria,
      });
      setExpenses(response.data.filtered_expenses || []);
      setError('');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="search"
            placeholder="إبحث برقم ملف القضية أو الخدمة"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر نوع المصروف</option>
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="بدأ من تاريخ"
            dateFormat="yyyy-MM-dd"
            isClearable
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="حتى تاريخ"
            dateFormat="yyyy-MM-dd"
            isClearable
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            <BiSearchAlt className="inline-block mr-2" /> بحث
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="border px-4 py-2">م</th>
                <th className="border px-4 py-2">رقم ملف الخدمة أو القضية</th>
                <th className="border px-4 py-2">نوع المصروف</th>
                <th className="border px-4 py-2">التفاصيل</th>
                <th className="border px-4 py-2">ملاحظة</th>
                <th className="border px-4 py-2">تاريخ المصروف</th>
                <th className="border px-4 py-2">الرسوم</th>
                <th className="border px-4 py-2">تكاليف اخرى</th>
                <th className="border px-4 py-2">أنشئ بواسطة</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => {
                const amountObj = JSON.parse(expense.amount || '{}');
                return (
                  <tr key={expense.id} className="text-gray-700">
                    <td className="border px-4 py-2">{expense.id}</td>
                    <td className="border px-4 py-2">
                      {expense.service_id
                        ? expense.service.service_no
                        : expense.leg_case_id
                          ? expense.leg_case.slug
                          : ''}
                    </td>
                    <td className="border px-4 py-2">
                      {expense.expense_category?.name}
                    </td>
                    <td className="border px-4 py-2">{expense.description}</td>
                    <td className="border px-4 py-2">{expense.note}</td>
                    <td className="border px-4 py-2">{expense.expense_date}</td>
                    <td className="border px-4 py-2">{amountObj.cost}</td>
                    <td className="border px-4 py-2">{amountObj.cost2}</td>
                    <td className="border px-4 py-2">{expense.user?.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseIndex;
