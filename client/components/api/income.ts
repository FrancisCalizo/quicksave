import axios from 'axios';

export const getAllRecurringIncome = async () =>
  await axios.get(`/getAllRecurringIncome`);
