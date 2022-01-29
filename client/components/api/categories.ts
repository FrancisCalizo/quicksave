import axios from 'axios';

export const getAllCategoriesByUser = async (userId: number) =>
  await axios.get(`/getAllCategoriesByUser/${userId}`);
