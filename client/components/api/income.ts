import axios from 'axios';

export const getAllFixedIncome = async () =>
  await axios.get(`/getAllFixedIncome`);
