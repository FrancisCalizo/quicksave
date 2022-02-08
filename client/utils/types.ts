export type CategoryObject = {
  name: string;
  category_id: number;
  color?: string; // TODO: Make this mandatory?
};

export type Expense = {
  date: any;
  description: string;
  amount: string | number;
  category: CategoryObject;
  notes: string;
};

export type CategoryColors =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'cyan'
  | 'purple'
  | 'teal'
  | 'pink'
  | 'gray'
  | 'black'
  | 'white'
  | 'lime'
  | 'hotPink'
  | 'olive'
  | 'navy';
