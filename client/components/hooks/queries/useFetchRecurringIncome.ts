import { useQuery } from 'react-query';

import { getAllRecurringIncome } from 'components/api/income';

export const useFetchRecurringIncome = () =>
  useQuery<any>(['recurringIncome'], () => getAllRecurringIncome(), {
    refetchOnWindowFocus: false,
  });
