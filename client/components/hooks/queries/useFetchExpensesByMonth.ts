import { useQuery } from 'react-query';
import { format } from 'date-fns';

import { getAllExpensesByMonth } from 'components/api/expenses';

export const useFetchExpensesByMonth = (
  userId: number,
  date: Date,
  onSuccess: (data: any) => void
) =>
  useQuery(
    ['allExpensesByMonth', +format(date, 'M'), +format(date, 'yyyy'), userId],
    () =>
      getAllExpensesByMonth(+format(date, 'M'), +format(date, 'yyyy'), userId),
    {
      refetchOnWindowFocus: false,
      onSuccess,
    }
  );
