import { ReactNode } from 'react';
import type { PaletteMode } from "@mui/material";
import { ThemeVariant } from '../../theme/themeColors';

// Define the navigation item type
export interface NavItem {
  label: string;
  route: string;
  icon: ReactNode;
  group: 'top' | 'bottom';
  // New optional flag: if true then SidebarItem should use a custom logout color.
  useCustomColor?: boolean;
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
