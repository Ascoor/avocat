// src/expenses.js
import api from './axiosConfig';

export const searchExpenses = () => api.get('/expenses/search');
export const getExpenseCategories = () => api.get('/expense_categories');
