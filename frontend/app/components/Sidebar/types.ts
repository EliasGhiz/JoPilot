import { ReactNode } from 'react';
import type { PaletteMode } from "@mui/material";
import { ThemeVariant } from 'app/theme/colorSystem';

// Define the navigation item type
export interface NavItem {
  label: string;
  route: string;
  icon: ReactNode;
  group: 'top' | 'bottom';
}

export interface SidebarItemProps {
  item: NavItem;
  open: boolean;
  colorMode: PaletteMode;
  themeVariant: ThemeVariant;
}

export interface SidebarProps {
  open: boolean;
  themeVariant: ThemeVariant;
  colorMode: PaletteMode;
}
