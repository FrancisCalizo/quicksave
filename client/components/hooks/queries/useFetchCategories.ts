import { useQuery } from 'react-query';

import { getAllCategoriesByUser } from 'components/api/categories';

export const useFetchCategories = () =>
  useQuery<any>(['categories'], () => getAllCategoriesByUser(), {
    refetchOnWindowFocus: false,
  });
