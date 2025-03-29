// MenuToggleButton.tsx – Renders the icon button that toggles the sidebar visibility.

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { getThemeColor } from "app/theme/themeColors";
import type { ThemeVariant } from "app/theme/themeColors";
import type { PaletteMode } from "@mui/material";
import CentralIconButton from "app/components/IconButton/IconButton";

interface MenuToggleButtonProps {
  open: boolean;
  onClick?: () => void;
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
  const hoverBgColor = getThemeColor(themeVariant, 'primary', colorMode, colorMode === 'dark' ? 70 : 80);
  const iconColor = "#fff";
  
  return (
    <CentralIconButton
      onClick={onClick}
      hoverBgColor={hoverBgColor}
      iconColor={iconColor}
    >
      {open ? <MenuOpenIcon /> : <MenuIcon />}
    </CentralIconButton>
  );
};

export default MenuToggleButton;
