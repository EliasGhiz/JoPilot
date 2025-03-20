// Global theme configuration and helper functions

export const isDarkMode = (colorMode: "dark" | "light"): boolean => colorMode === "dark";

export const baseTopbarColors = {
  dark: "#424242",
  light: "#555555", // updated: darker neutral gray in light mode for better contrast with white text
};

export const redTint = {
  dark: "#5c1e1e",
  light: "#E57373",
};

export const blueTint = {
  dark: "#3a4b5e",
  light: "#6C91C9", // updated: more solid blue for topbar in light mode, less bright
};

// For light mode when not themed, a neutral topbar color
export const neutralTopbarLight = "#D1D1D1";

export const getTopbarColor = (colorMode: "dark" | "light", themeVariant: number): string => {
  if (themeVariant === 1) {
    // Use red tint in both dark and light mode now
    return colorMode === "dark" ? redTint.dark : redTint.light;
  } else if (themeVariant === 2) {
    return colorMode === "dark" ? blueTint.dark : blueTint.light;
  }
  return isDarkMode(colorMode) ? baseTopbarColors.dark : baseTopbarColors.light;
};

export const SIDEBAR_ACCENT_COLORS = {
  red: {
    dark: "#B22222",  // firebrick
    light: "#FF6347", // tomato red
  },
  blue: {
    dark: "#4A90E2",  // updated: more bright blue for dark mode sidebar icons
    light: "#8A82FF", // updated: more solid, slightly less bright blue for light mode sidebar icons
  },
};

export const getSidebarIconColor = (colorMode: "dark" | "light", themeIcon: string): string => {
  if (!isDarkMode(colorMode)) {
    if (themeIcon === "🪐") {
      return SIDEBAR_ACCENT_COLORS.red.light; // use tomato red in light mode
    } else if (themeIcon === "🌌") {
      return SIDEBAR_ACCENT_COLORS.blue.light; // use light blue in light mode
    }
    return "#555555";
  } else if (themeIcon === "🪐") {
    return SIDEBAR_ACCENT_COLORS.red.dark;
  } else if (themeIcon === "🌌") {
    return SIDEBAR_ACCENT_COLORS.blue.dark;
  }
  return "#FFFFFF"; // fallback for dark mode
};
