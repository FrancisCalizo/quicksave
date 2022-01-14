import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { FiRefreshCw } from 'react-icons/fi';
import { FaChartBar, FaMoneyBillAlt } from 'react-icons/fa';
import { MdLabelOutline } from 'react-icons/md';

export const SIDEBAR_LINKS = [
  { title: 'Overview', route: '/dashboard', icon: FaChartBar },
  { title: 'Categories', route: '/dashboard/categories', icon: MdLabelOutline },
  { title: 'Income', route: '/dashboard/income', icon: GiReceiveMoney },
  { title: 'Recurring', route: '/dashboard/recurring', icon: FiRefreshCw },
  { title: 'Nonrecurring', route: '/dashboard/nonrecurring', icon: GiPayMoney },
  { title: 'Investing', route: '/dashboard/investing', icon: FaMoneyBillAlt },
];
