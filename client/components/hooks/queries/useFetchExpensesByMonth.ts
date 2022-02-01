import { useQuery } from 'react-query';
import { format } from 'date-fns';

import { getAllExpensesByMonth } from 'components/api/expenses';

export const useFetchExpensesByMonth = (
  date: Date,
  onSuccess: (data: any) => void
) =>
  useQuery(
    ['allExpensesByMonth', +format(date, 'M'), +format(date, 'yyyy')],
    () => getAllExpensesByMonth(+format(date, 'M'), +format(date, 'yyyy')),
    {
      refetchOnWindowFocus: false,
      onSuccess,
    }
  );
