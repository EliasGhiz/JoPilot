// paletteUtils.ts – Utilities for manipulating and deriving colors from base palettes.

import { ThemeVariant, Palette, MD3ColorScheme } from './types';
import { BASE_PALETTES, ERROR_PALETTE } from './palettes';
import { adjustBrightness, hexToRgb, rgbToHex } from '../utils/colorUtils';

// Brightness factors to create secondary and tertiary colors
const BRIGHTNESS_FACTORS = {
  secondary: 0.9,
  tertiary: 0.8,
  neutralVariant: 0.95
};

// Modifies a palette by adjusting brightness of intermediate tones (10-90)
export function modifyPalette(palette: Palette, factor: number): Palette {
  const adjustedPalette: Palette = {} as Palette;
  Object.keys(palette).forEach(toneStr => {
    const tone = Number(toneStr);
    adjustedPalette[tone] = (tone >= 10 && tone <= 90)
      ? adjustBrightness(palette[tone], factor)
      : palette[tone];
  });
  return adjustedPalette;
}

// Creates a complete color scheme for a theme variant
export function createColorScheme(variant: ThemeVariant): MD3ColorScheme {
  const basePalette = BASE_PALETTES[variant];
  const grayPalette = BASE_PALETTES.gray;
  
  return {
    primary: basePalette,
    secondary: modifyPalette(basePalette, BRIGHTNESS_FACTORS.secondary),
    tertiary: modifyPalette(basePalette, BRIGHTNESS_FACTORS.tertiary),
    neutral: grayPalette,
    neutralVariant: modifyPalette(grayPalette, BRIGHTNESS_FACTORS.neutralVariant),
    error: ERROR_PALETTE
  };
}

// Interpolates a color tone that isn't explicitly defined in the palette
export function interpolateColor(palette: Palette, desiredTone: number): string {
  const availableTones = Object.keys(palette).map(Number).sort((a, b) => a - b);
  
  if (desiredTone <= availableTones[0]) return palette[availableTones[0]];
  if (desiredTone >= availableTones[availableTones.length - 1]) {
    return palette[availableTones[availableTones.length - 1]];
  }

  // Find surrounding tones
  let lowerTone = availableTones[0];
  let upperTone = availableTones[availableTones.length - 1];
  
  for (let i = 0; i < availableTones.length - 1; i++) {
    if (desiredTone >= availableTones[i] && desiredTone <= availableTones[i + 1]) {
      lowerTone = availableTones[i];
      upperTone = availableTones[i + 1];
      break;
    }
  }

  if (desiredTone === lowerTone) return palette[lowerTone];
  if (desiredTone === upperTone) return palette[upperTone];

  // Linear interpolation between the two colors
  const ratio = (desiredTone - lowerTone) / (upperTone - lowerTone);
  const lowerRGB = hexToRgb(palette[lowerTone]);
  const upperRGB = hexToRgb(palette[upperTone]);
  
  const r = Math.round(lowerRGB.r + ratio * (upperRGB.r - lowerRGB.r));
  const g = Math.round(lowerRGB.g + ratio * (upperRGB.g - lowerRGB.g));
  const b = Math.round(lowerRGB.b + ratio * (upperRGB.b - lowerRGB.b));
  
  return rgbToHex(r, g, b);
}
