// colorSystem.ts – Implements the application's color system with palette generation and theme color utilities.

import { PaletteMode } from '@mui/material';
import { ThemeVariant, MD3ColorScheme } from './types';
import { SURFACE_COLORS, THEME_ICONS, THEME_ICON_SCALE_FACTORS } from './palettes';
import { createColorScheme, interpolateColor } from './paletteUtils';

// Create color schemes for each theme variant
const COLOR_SCHEMES: Record<ThemeVariant, MD3ColorScheme> = {
  red: createColorScheme('red'),
  blue: createColorScheme('blue'),
  gray: createColorScheme('gray')
};

// Gets a theme color from the scheme based on variant, color type and tone
export function getThemeColor(
  variant: ThemeVariant,
  colorType: keyof MD3ColorScheme,
  mode: PaletteMode,
  tone: number
): string {
  if (!COLOR_SCHEMES[variant] || !COLOR_SCHEMES[variant][colorType]) {
    console.warn(`Invalid color request: variant=${variant}, colorType=${colorType}`);
    return mode === 'dark' ? '#424242' : '#9e9e9e';
  }
  
  const palette = COLOR_SCHEMES[variant][colorType];
  return palette[tone] || interpolateColor(palette, tone);
}

// Gets the primary color based on theme variant and mode
export function getPrimaryColor(variant: ThemeVariant, mode: PaletteMode): string {
  return mode === 'dark'
    ? getThemeColor(variant, 'primary', mode, 20)
    : getThemeColor(variant, 'primary', mode, 40);
}

// Gets the surface color based on mode
export function getSurfaceColor(mode: PaletteMode): string {
  return SURFACE_COLORS[mode].surface;
}

// Gets the contrasting color for use on primary backgrounds
export function getOnPrimaryColor(variant: ThemeVariant, mode: PaletteMode): string {
  return getThemeColor(variant, 'primary', mode, 100);
}

// Gets the appropriate sidebar color based on selection state
export function getSidebarColor(variant: ThemeVariant, mode: PaletteMode, isSelected: boolean): string {
  return isSelected
    ? mode === 'dark'
      ? getThemeColor(variant, 'primary', mode, 30)
      : getThemeColor(variant, 'primary', mode, 90)
    : mode === 'dark'
      ? '#121212'
      : '#FFFFFF';
}

// Gets the sidebar icon color based on theme settings
export function getSidebarIconColor(colorMode: PaletteMode, variant: ThemeVariant): string {
  return colorMode === 'dark'
    ? getOnPrimaryColor(variant, colorMode)
    : getThemeColor(variant, 'primary', colorMode, 40);
}

// Re-export theme icon constants
export const themeIcons = THEME_ICONS;
export const themeIconScaleFactors = THEME_ICON_SCALE_FACTORS;

// Re-export type definitions
export type { ThemeVariant };
