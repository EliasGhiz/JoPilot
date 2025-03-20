import { useState, useEffect } from 'react';
import { createTheme } from '@mui/material';
import type { Theme } from '@mui/material';

// Theme variant types
export type ThemeVariant = 0 | 1 | 2; // 0: default, 1: red (planet), 2: blue (space)
export type ColorMode = "light" | "dark";

export interface ThemeState {
  colorMode: ColorMode;
  themeVariant: ThemeVariant;
  themeIcon: string;
  theme: Theme;
  hamburgerWhite: boolean;
  toggleColorMode: () => void;
  cycleThemeVariant: () => void;
}

export function useThemeState(): ThemeState {
  // Initialize state with localStorage values
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const stored = localStorage.getItem("colorMode");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });
  
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(() => {
    const stored = localStorage.getItem("themeVariant");
    return stored !== null ? Number(stored) as ThemeVariant : 0;
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
    localStorage.setItem("themeVariant", themeVariant.toString());
  }, [colorMode, themeVariant]);

  // Create the theme object
  const theme = createThemeFromState(colorMode, themeVariant);
  
  // Derived state
  const themeIcon = themeVariant === 0 ? "🌗" : themeVariant === 1 ? "🪐" : "🌌";
  const hamburgerWhite = colorMode === "light" && themeVariant === 1;

  // Actions
  const toggleColorMode = () => setColorMode(prev => (prev === "dark" ? "light" : "dark"));
  const cycleThemeVariant = () => setThemeVariant(prev => ((prev + 1) % 3) as ThemeVariant);

  return {
    colorMode,
    themeVariant,
    themeIcon,
    theme,
    hamburgerWhite,
    toggleColorMode,
    cycleThemeVariant
  };
}

function createThemeFromState(colorMode: ColorMode, themeVariant: ThemeVariant): Theme {
  let defaultPrimary: string;
  
  if (themeVariant === 0) {
    defaultPrimary = colorMode === "dark" ? "#424242" : "#1976d2";
  } else if (themeVariant === 1) {
    defaultPrimary = colorMode === "dark" ? "#550000" : "#ff5f5f";
  } else {
    defaultPrimary = colorMode === "dark" ? "#0D47A1" : "#1565c0";
  }
  
  return createTheme({
    palette: {
      mode: colorMode,
      primary: { main: defaultPrimary },
      background: {
        default: colorMode === "dark" ? "#1A1A1A" : "#fafafa",
        paper: colorMode === "dark" ? "#1E1E1E" : "#fff",
      },
      text: {
        primary: colorMode === "dark" ? "#FFFFFF" : "#000000",
        secondary: colorMode === "dark" ? "#B0B0B0" : "#555",
      },
    },
    typography: { fontFamily: "Arial, sans-serif" },
  });
}
