import { useQuery } from 'react-query';

import { getAllCategoriesByUser } from 'components/api/categories';

export const useFetchCategories = (userId: number) =>
  useQuery<any>(['categories', userId], () => getAllCategoriesByUser(userId));
