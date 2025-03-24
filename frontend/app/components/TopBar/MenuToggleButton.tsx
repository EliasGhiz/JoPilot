// MenuToggleButton.tsx – Renders the icon button that toggles the sidebar visibility.

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { getThemeColor } from "app/theme/colorSystem";
import type { ThemeVariant } from "app/theme/colorSystem";
import type { PaletteMode } from "@mui/material";
import CentralIconButton from "../IconButton/IconButton";

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
  const iconColor = "#fff";
  const hoverBgColor = getThemeColor(
    themeVariant,
    'primary',
    colorMode,
    colorMode === 'dark' ? 70 : 80
  );
  
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
