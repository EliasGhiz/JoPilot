// TopBar.tsx – Renders the top navigation bar with the menu toggle, logo, and theme switcher.

import React from "react";
import { AppBar, Toolbar, Box, alpha } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import MenuToggleButton from "./MenuToggleButton";
import ThemeToggle from "./ThemeToggle";
import { getThemeColor } from "app/theme/colorSystem";
import type { ThemeVariant } from "app/theme/colorSystem";
import type { PaletteMode } from "@mui/material";
const JoLogo = "/JoLogo.svg";

interface TopBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  themeIcon: string;
  onThemeLeftClick: () => void;
  onThemeRightClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  topbarColor: string;
  primaryContrast: string;
  hamburgerWhite: boolean;
  themeVariant: ThemeVariant;
  colorMode: PaletteMode;
}

export default function TopBar(props: TopBarProps) {
  const { open, setOpen, themeIcon, onThemeLeftClick, onThemeRightClick, topbarColor, primaryContrast, hamburgerWhite, themeVariant, colorMode } = props;
  const theme = useTheme<Theme>();
  const { layout, zIndex } = theme;
  
  const actualTopbarColor = colorMode === 'dark'
    ? (themeVariant === 'blue'
          ? getThemeColor('blue', 'primary', colorMode, 25)
          : themeVariant === 'red'
          ? getThemeColor('red', 'primary', colorMode, 15)
          : getThemeColor('gray', 'neutral', colorMode, 15))
    : themeVariant === 'red'
      ? getThemeColor('red', 'primary', colorMode, 35)
      : topbarColor;
  
  const borderColor = getThemeColor(themeVariant, 'primary', colorMode, colorMode === 'dark' ? 60 : 65);
  const dividerColor = colorMode === 'dark'
    ? 'rgba(255, 255, 255, 0.12)'
    : (themeVariant === 'gray'
          ? getThemeColor(themeVariant, 'neutralVariant', colorMode, 50)
          : alpha(getThemeColor(themeVariant, 'primary', colorMode, 95), 0.3));
  
  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ bgcolor: actualTopbarColor, zIndex: zIndex.drawer + 1, height: layout.appBarHeight }}
    >
      <Toolbar disableGutters sx={{ height: "100%", minHeight: layout.appBarHeight, p: 0 }}>
        {/* Menu toggle area */}
        <Box sx={{ 
          width: layout.collapsedSidebarWidth, 
          height: "100%",
          display: "flex", 
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: actualTopbarColor,
          ...(open && { borderLeft: "3px solid", borderColor })
        }}>
          {/* Larger clickable area removed extra hover logic */}
          <Box 
            sx={{ 
              width: 56, 
              height: 56, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer"
            }}
            onClick={() => setOpen(!open)}
          >
            <MenuToggleButton 
              open={open}
              hamburgerWhite={hamburgerWhite} 
              colorMode={colorMode}
              themeVariant={themeVariant}
            />
          </Box>
          
          <Box sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "32px",
            width: "1px",
            bgcolor: dividerColor,
            opacity: open ? 0 : 1,
            transition: 'opacity 0.10s ease'
          }} />
        </Box>
        
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
          <img 
            src={JoLogo} 
            alt="JoPilot logo" 
            style={{ 
              height: layout.appBarHeight * 0.68, 
              width: "auto",
              userSelect: "none",
              WebkitUserSelect: "none",
              msUserSelect: "none"
            }} 
          />
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Theme toggle with larger clickable area */}
        <Box
          sx={{ 
            width: 56, 
            height: 56, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <ThemeToggle
            onThemeLeftClick={onThemeLeftClick}
            onThemeRightClick={onThemeRightClick}
            themeIcon={themeIcon}
            primaryContrast={primaryContrast}
            colorMode={colorMode}
            themeVariant={themeVariant}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
