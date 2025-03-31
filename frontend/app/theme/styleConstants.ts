// styleConstants.ts – Consolidated UI constants and shared style objects used across components.

export const TRANSITION_SPEED_FAST = "0.10s";

export const commonTransition = '0.2s ease';
export const commonPadding = '8px';
export const iconButtonStyle = (hoverBgColor: string) => ({
  padding: 0,
  borderRadius: '50%',
  '&:hover': { backgroundColor: `${hoverBgColor}20` },
});
