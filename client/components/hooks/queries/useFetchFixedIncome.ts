import { useQuery } from 'react-query';

import { getAllFixedIncome } from 'components/api/income';

export const useFetchFixedIncome = () =>
  useQuery<any>(['fixedIncome'], () => getAllFixedIncome(), {
    refetchOnWindowFocus: false,
  });
