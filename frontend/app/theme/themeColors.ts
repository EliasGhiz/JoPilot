// colorSystem.ts – Implements the application's color system with palette generation and theme color utilities.

import { PaletteMode } from '@mui/material';
import type { ThemeVariant, MD3ColorScheme } from './types';
import { SURFACE_COLORS, BASE_PALETTES, ERROR_PALETTE, THEME_ICONS, THEME_ICON_DIMENSIONS } from './palettes';
import { interpolateColor, createColorScheme } from './paletteUtils';

// Helper: get a palette value with fallback
const getColorValue = (
  palette: Record<number, string>,
  tone: number,
  mode: PaletteMode
) => palette[tone] || interpolateColor(palette, tone);

export const getThemeColor = (
  variant: ThemeVariant,
  colorType: keyof MD3ColorScheme,
  mode: PaletteMode,
  tone: number
): string => {
  const scheme = createColorScheme(variant);
  const palette = scheme[colorType];
  if (!palette) {
    console.warn(`Invalid color request: variant=${variant}, colorType=${colorType}`);
    return mode === 'dark' ? '#424242' : '#9e9e9e';
  }
  return getColorValue(palette, tone, mode);
};

export const getPrimaryColor = (variant: ThemeVariant, mode: PaletteMode): string => {
  return mode === 'dark'
    ? getThemeColor(variant, 'primary', mode, 20)
    : getThemeColor(variant, 'primary', mode, 40);
};

// Gets the surface color based on mode
export const getSurfaceColor = (mode: PaletteMode): string => {
  return SURFACE_COLORS[mode].surface;
};

// Gets the appropriate sidebar color based on selection state
export const getSidebarColor = (variant: ThemeVariant, mode: PaletteMode, isSelected: boolean): string => {
  return isSelected
    ? mode === 'dark'
      ? getThemeColor(variant, 'primary', mode, 30)
      : getThemeColor(variant, 'primary', mode, 90)
    : mode === 'dark'
      ? '#121212'
      : '#FFFFFF';
};

// Gets the sidebar icon color based on theme settings
export const getSidebarIconColor = (colorMode: PaletteMode, variant: ThemeVariant): string => {
  return colorMode === 'dark'
    ? getThemeColor(variant, 'primary', colorMode, 100)
    : getThemeColor(variant, 'primary', colorMode, 40);
};

// Export to provide the on-primary color
export const getOnPrimaryColor = (variant: ThemeVariant, mode: PaletteMode): string => {
  return getThemeColor(variant, 'primary', mode, 100);
};

export const getLogoutIconColor = (colorMode: PaletteMode): string => {
  // Use a darker red in dark mode, lighter red in light mode
  return colorMode === 'dark' ? "#c62828" : "#d32f2f";
};

export const getTopbarColor = (
	themeVariant: ThemeVariant,
	colorMode: PaletteMode,
	fallbackTopbarColor?: string,
	grayscale?: boolean  // <-- new optional parameter
): string => {
    if(grayscale){
        // Always use gray palette regardless of themeVariant
        return colorMode === 'dark'
            ? getThemeColor('gray', 'neutral', colorMode, 15)
            : getThemeColor('gray', 'neutral', colorMode, 90);
    }
	if (colorMode === 'dark') {
		if (themeVariant === 'blue') {
			return getThemeColor('blue', 'primary', colorMode, 25);
		} else if (themeVariant === 'red') {
			return getThemeColor('red', 'primary', colorMode, 15);
		} else {
			return getThemeColor('gray', 'neutral', colorMode, 15);
		}
	} else {
		if (themeVariant === 'red') {
			return getThemeColor('red', 'primary', colorMode, 35);
		} else {
			return fallbackTopbarColor || getThemeColor(themeVariant, 'primary', colorMode, 40);
		}
	}
};

// Re-export theme icon constants
export const themeIcons = THEME_ICONS;
export const themeIconDimensions = THEME_ICON_DIMENSIONS;

// Re-export type definitions
export type { ThemeVariant };
