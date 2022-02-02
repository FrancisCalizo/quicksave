import axios from 'axios';

export const getAllExpensesByMonth = async (
  month: number,
  year: number,
  userId: number
) =>
  await axios.get('/getAllExpensesByMonth', {
    params: {
      month,
      year,
      userId,
    },
  });
