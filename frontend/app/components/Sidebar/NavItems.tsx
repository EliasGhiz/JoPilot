// NavItems.tsx – Exports the list of navigation items for the sidebar.

import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';
import { NavItem } from './types';

// Define navigation items centralized in one place
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: <DashboardIcon />,
    group: 'top'
  },
  {
    label: 'Settings',
    route: '/settings',
    icon: <SettingsIcon />,
    group: 'bottom'
  },
  {
    label: 'Test',
    route: '/test',
    icon: <PestControlRodentIcon />,
    group: 'bottom'
  }
];
