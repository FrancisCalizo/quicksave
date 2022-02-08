export const formatCurrency = (value: number) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

export const CATEGORY_COLORS = [
  { value: 'red', label: 'red', rgb: '#E53E3E' },
  { value: 'orange', label: 'orange', rgb: '#DD6B20' },
  { value: 'yellow', label: 'yellow', rgb: '#D69E2E' },
  { value: 'green', label: 'green', rgb: '#38A169' },
  { value: 'teal', label: 'teal', rgb: '#319795' },
  { value: 'blue', label: 'blue', rgb: '#3182CE' },
  { value: 'cyan', label: 'cyan', rgb: '#00B5D8' },
  { value: 'purple', label: 'purple', rgb: '#805AD5' },
  { value: 'pink', label: 'pink', rgb: '#D53F8C' },
  { value: 'gray', label: 'gray', rgb: '#718096' },
  { value: 'black', label: 'black', rgb: '#000' },
  { value: 'white', label: 'white', rgb: '#fff' },
  { value: 'lime', label: 'lime', rgb: '#88d90d' },
  { value: 'hotPink', label: 'hot pink', rgb: '#e40d73' },
  { value: 'olive', label: 'olive', rgb: '#7f8000' },
  { value: 'navy', label: 'navy', rgb: '#0301b2' },
];
