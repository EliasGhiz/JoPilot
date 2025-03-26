// useThemeState.ts – Manages theme variant and color mode with persistence and switching functionality.

import { useState, useMemo, useEffect } from 'react';
import { PaletteMode } from '@mui/material';
import { 
  ThemeVariant, 
  themeIcons 
} from '../theme/themeColors';
import { createAppTheme } from '../theme/themeConfig';

// Local storage keys
const THEME_MODE_KEY = 'jopilot-theme-mode';
const THEME_VARIANT_KEY = 'jopilot-theme-variant';

// Valid theme cycle order
const themeCycleOrder: ThemeVariant[] = ["red", "blue", "gray"];

export const useThemeState = () => {
  // Initialize from localStorage or default values
  const [colorMode, setColorMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem(THEME_MODE_KEY);
    return (savedMode === 'dark' || savedMode === 'light') ? savedMode : 'light';
  });
  
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(() => {
    // Properly handle localStorage value with proper validation
    const savedVariant = localStorage.getItem(THEME_VARIANT_KEY) as ThemeVariant | null;
    return savedVariant && themeCycleOrder.includes(savedVariant) ? savedVariant : "red";
  });
  
  // Save preferences when change
  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, colorMode);
  }, [colorMode]);
  
  useEffect(() => {
    localStorage.setItem(THEME_VARIANT_KEY, themeVariant);
  }, [themeVariant]);
  
  // Preload theme icons when the app initializes
  useEffect(() => {
    // Preload all theme icon SVGs
    Object.values(themeIcons).forEach(iconPath => {
      const img = new Image();
      img.src = iconPath;
    });
  }, []);
  
  // Toggle light/ dark mode
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Cycle through theme variants
  const cycleThemeVariant = () => {
    const currentIndex = themeCycleOrder.indexOf(themeVariant);
    const nextIndex = (currentIndex + 1) % themeCycleOrder.length;
    setThemeVariant(themeCycleOrder[nextIndex]);
  };

  // Create theme based on current settings
  const theme = useMemo(() => {
    return createAppTheme(colorMode, themeVariant);
  }, [colorMode, themeVariant]);

  // Get current theme icon
  const themeIcon = themeIcons[themeVariant];
  
  // Determine if hamburger menu should be white based on theme and mode
  // Always use white hamburger icon for gray theme (in both light and dark modes)
  const hamburgerWhite = colorMode === 'dark' || themeVariant === 'gray';
  
  return {
    colorMode,
    themeVariant, 
    theme,
    themeIcon,
    hamburgerWhite,
    toggleColorMode,
    cycleThemeVariant,
  };
};
