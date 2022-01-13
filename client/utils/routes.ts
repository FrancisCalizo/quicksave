import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { FiRefreshCw } from 'react-icons/fi';
import { FaChartBar, FaMoneyBillAlt } from 'react-icons/fa';

export const SIDEBAR_LINKS = [
  { title: 'Overview', route: '/dashboard', icon: FaChartBar },
  { title: 'Income', route: '/dashboard/income', icon: GiReceiveMoney },
  { title: 'Recurring', route: '/dashboard/recurring', icon: FiRefreshCw },
  { title: 'Nonrecurring', route: '/dashboard/nonrecurring', icon: GiPayMoney },
  { title: 'Investing', route: '/dashboard/investing', icon: FaMoneyBillAlt },
];
