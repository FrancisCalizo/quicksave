import axios from 'axios';

export const getAllExpensesByMonth = async (month: number, year: number) =>
  await axios.get('/getAllExpensesByMonth', {
    params: {
      month,
      year,
    },
  });

export const getAllCategoriesByUser = async (userId: number) =>
  await axios.get(`/getAllCategoriesByUser/${userId}`);
