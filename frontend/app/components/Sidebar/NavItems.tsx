// NavItems.tsx – Exports the list of navigation items for the sidebar.

import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavItem } from './types';

// Sidebar Navigation items
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
  },
  {
    label: 'Logout',
    route: '/logout',
    icon: <LogoutIcon />,
    group: 'bottom',
    // New: use custom logout color from themeColors
    useCustomColor: true
  }
];
