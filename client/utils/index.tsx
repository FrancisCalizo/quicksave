export const formatCurrency = (value: number) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

export const CATEGORY_COLORS = [
  { value: 'red', label: 'red' },
  { value: 'orange', label: 'orange' },
  { value: 'yellow', label: 'yellow' },
  { value: 'green', label: 'green' },
  { value: 'teal', label: 'teal' },
  { value: 'blue', label: 'blue' },
  { value: 'cyan', label: 'cyan' },
  { value: 'purple', label: 'purple' },
  { value: 'teal', label: 'teal' },
  { value: 'pink', label: 'pink' },
  { value: 'gray', label: 'gray' },
  { value: 'black', label: 'black' },
  { value: 'white', label: 'white' },
];
