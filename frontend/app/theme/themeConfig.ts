// themeConfig.ts – Creates and configures Material UI themes using the application's color system.

import { createTheme, PaletteMode } from "@mui/material";
import "@fontsource/roboto-flex";
import { 
  ThemeVariant, 
  getPrimaryColor, 
  getOnPrimaryColor, 
  getThemeColor,
} from './themeColors';

// Theme configuration interface
declare module "@mui/material/styles" {
  interface Theme {
    layout: {
      appBarHeight: number;
      expandedSidebarWidth: number;
      collapsedSidebarWidth: number;
    };
  }
  interface ThemeOptions {
    layout?: {
      appBarHeight?: number;
      expandedSidebarWidth?: number;
      collapsedSidebarWidth?: number;
    };
  }
}

// MUI theme using MD3 color system
export const createAppTheme = (mode: PaletteMode, variant: ThemeVariant) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: getPrimaryColor(variant, mode),
        dark: getThemeColor(variant, 'primary', mode, mode === 'dark' ? 70 : 50),
        light: getThemeColor(variant, 'primary', mode, mode === 'dark' ? 90 : 30),
        contrastText: getOnPrimaryColor(variant, mode),
      },
      secondary: {
        main: getThemeColor(variant, 'secondary', mode, mode === 'dark' ? 80 : 40),
        dark: getThemeColor(variant, 'secondary', mode, mode === 'dark' ? 70 : 50),
        light: getThemeColor(variant, 'secondary', mode, mode === 'dark' ? 90 : 30),
        contrastText: mode === 'dark' ? getThemeColor(variant, 'secondary', mode, 20) 
                                      : getThemeColor(variant, 'secondary', mode, 100),
      },
      error: {
        main: getThemeColor(variant, 'error', mode, mode === 'dark' ? 80 : 40),
        dark: getThemeColor(variant, 'error', mode, mode === 'dark' ? 70 : 50),
        light: getThemeColor(variant, 'error', mode, mode === 'dark' ? 90 : 30),
        contrastText: mode === 'dark' ? getThemeColor(variant, 'error', mode, 20) 
                                      : getThemeColor(variant, 'error', mode, 100),
      },
      background: {
        default: mode === 'dark' 
          ? getThemeColor(variant, 'neutral', mode, 10)
          : getThemeColor(variant, 'neutral', mode, 99),
        paper: mode === 'dark' 
          ? getThemeColor(variant, 'neutral', mode, 20)
          : getThemeColor(variant, 'neutral', mode, 95),
      },
      text: {
        primary: mode === 'dark' 
          ? getThemeColor(variant, 'neutral', mode, 90) 
          : getThemeColor(variant, 'neutral', mode, 10),
        secondary: mode === 'dark' 
          ? getThemeColor(variant, 'neutral', mode, 80) 
          : getThemeColor(variant, 'neutral', mode, 30),
      }
    },
    typography: {
      fontFamily: "Roboto Flex, sans-serif"
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
    },
    layout: {
      appBarHeight: 64,
      expandedSidebarWidth: 200,
      collapsedSidebarWidth: 56,
    },
  });
};