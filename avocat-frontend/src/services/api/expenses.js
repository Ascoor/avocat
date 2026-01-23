// src/api/v1/expenses.js
import api from './axiosConfig';

export const searchExpenses = () => api.get('/api/v1/expenses/search');
export const getExpenseCategories = () => api.get('/api/v1/expense_categories');
