// types.ts – Type definitions shared across the theme system.

// Define available theme variants
export type ThemeVariant = "red" | "blue" | "gray";

// A Palette maps tone numbers (e.g., 0, 10, 20) to a hex color string
export interface Palette {
  [tone: number]: string;
}

// Material Design 3 color scheme structure
export interface MD3ColorScheme {
  primary: Palette;
  secondary: Palette;
  tertiary: Palette;
  neutral: Palette;
  neutralVariant: Palette;
  error: Palette;
}
