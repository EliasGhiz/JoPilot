// styles.ts – Sidebar styles centralized definitions.

import type { PaletteMode } from "@mui/material";
import { getThemeColor } from "app/theme/colorSystem";
import { TRANSITION_SPEED_FAST } from "app/theme/uiConstants";

// Styling objects to reduce inline styles
export const styles = {
  itemText: (colorMode: PaletteMode) => ({
    ml: 0, 
    color: colorMode === 'dark' ? getThemeColor('gray', 'neutral', colorMode, 95) : 'inherit'
  }),
  
  versionText: (colorMode: PaletteMode) => ({
    color: colorMode === 'dark' 
      ? getThemeColor('gray', 'neutral', colorMode, 60)
      : getThemeColor('gray', 'neutral', colorMode, 40),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block'
  }),
  
  drawer: (open: boolean, drawerWidth: number, collapsedWidth: number, appBarHeight: number) => ({
    position: 'fixed',
    width: open ? drawerWidth : collapsedWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : collapsedWidth,
      transition: `width ${TRANSITION_SPEED_FAST}`,
      top: appBarHeight,
      height: `calc(100vh - ${appBarHeight}px)`,
      overflowX: 'hidden',
      overflowY: 'hidden',
      bgcolor: 'background.paper',
      p: 0
    },
    '& .MuiList-root': {
      p: 0,
      pt: 1
    }
  })
};
