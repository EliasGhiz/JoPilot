// Sidebar.tsx – Renders the application's side navigation drawer.

import {
  Drawer,
  List,
  Typography,
  Box,
  Divider,
  useTheme
} from '@mui/material';
import { appVersion } from 'app/utils/version';
import { styles } from './styles';
import { SidebarProps } from './types';
import { SidebarItem } from './SidebarItem';
import { NAV_ITEMS } from './NavItems';
import { getThemeColor } from '../../theme/colorSystem';

export default function Sidebar({ open, themeVariant, colorMode }: SidebarProps) {
  const theme = useTheme();
  const { collapsedSidebarWidth: collapsedWidth, expandedSidebarWidth: drawerWidth, appBarHeight } = theme.layout;
  
  // Render navigation items by group
  const renderNavItems = (group: 'top' | 'bottom') => (
    NAV_ITEMS
      .filter(item => item.group === group)
      .map(item => (
        <SidebarItem 
          key={item.route} 
          item={item} 
          open={open} 
          colorMode={colorMode} 
          themeVariant={themeVariant}
        />
      ))
  );

  // Get sidebar divider color using the color system
  const dividerColor = colorMode === 'dark'
    ? getThemeColor(themeVariant, 'neutralVariant', colorMode, 20)
    : getThemeColor(themeVariant, 'neutralVariant', colorMode, 80);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={styles.drawer(open, drawerWidth, collapsedWidth, appBarHeight)}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        // Remove horizontal padding that may affect icon centering
        px: 0,
      }}>
        {/* Top navigation */}
        <List sx={{ p: 0, pt: 1 }}>{renderNavItems('top')}</List>
        
        {/* Bottom section */}
        <Box sx={{ mt: 'auto' }}>
          <List sx={{ p: 0 }}>{renderNavItems('bottom')}</List>
          <Divider sx={{ backgroundColor: dividerColor }} />
          <Box sx={{ textAlign: 'center', p: 1 }}>
            <Typography variant="caption" sx={styles.versionText(colorMode)}>
              {open ? `Version ${appVersion}` : `v${appVersion}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
