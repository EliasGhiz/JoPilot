// Example: hexToRgb("#fff") returns { r: 255, g: 255, b: 255 }
export function hexToRgb(hex: string): { r: number, g: number, b: number } {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

// Example: rgbToHex(255, 255, 255) returns "#ffffff"
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// Example: adjustBrightness("#888888", 1.2) returns a brighter color (output will depend on brightness factor)
export function adjustBrightness(hex: string, factor: number): string {
  const { r, g, b } = hexToRgb(hex);
  const adjust = (x: number) => Math.min(255, Math.max(0, Math.round(x * factor)));
  return rgbToHex(adjust(r), adjust(g), adjust(b));
}