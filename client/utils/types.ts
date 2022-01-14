export type CategoryObject = {
  name: string;
  category_id: number;
  user_id: number;
};

export type Expense = {
  date: any;
  description: string;
  amount: string | number;
  category: CategoryObject;
  notes: string;
};
