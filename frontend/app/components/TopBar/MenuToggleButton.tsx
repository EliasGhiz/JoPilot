// MenuToggleButton.tsx – Renders the icon button that toggles the sidebar visibility.

import React from "react";
import { IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CircularHighlight from "../CircularHighlight";
import { getThemeColor } from "app/theme/colorSystem";
import type { ThemeVariant } from "app/theme/colorSystem";
import type { PaletteMode } from "@mui/material";

interface MenuToggleButtonProps {
  open: boolean;
  onClick: () => void;
  hamburgerWhite: boolean;
  colorMode: PaletteMode;
  themeVariant: ThemeVariant;
}

const MenuToggleButton: React.FC<MenuToggleButtonProps> = ({ 
  open, 
  onClick, 
  colorMode,
  themeVariant
}) => {

  const iconColor = "#fff";
  const hoverBgColor = getThemeColor(themeVariant, 'primary', colorMode, colorMode === 'dark' ? 70 : 80) + '20'; // 20 is hex for 12% opacity
  
  const buttonStyles = {
    color: iconColor,
    opacity: open ? 1 : 0.85,
    transform: open ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.2s, opacity 0.2s'
  };
  
  const circleSize = 48;
  
  return (
    <Box
      onClick={onClick}
      sx={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      aria-label="toggle menu area"
    >
      <CircularHighlight size={circleSize} hoverBgColor={hoverBgColor}>
        <IconButton 
          sx={{
            ...buttonStyles,
            padding: 0,
            pointerEvents: 'none'
          }}
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </CircularHighlight>
    </Box>
  );
};

export default MenuToggleButton;
