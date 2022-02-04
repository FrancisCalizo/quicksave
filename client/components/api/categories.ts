import axios from 'axios';

export const getAllCategoriesByUser = async () =>
  await axios.get(`/getAllCategoriesByUser`);
