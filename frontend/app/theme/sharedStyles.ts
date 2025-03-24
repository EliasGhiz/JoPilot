// sharedStyles.ts – Common style objects to be reused across components

export const commonTransition = '0.2s ease';
export const commonPadding = '8px';
export const iconButtonStyle = (hoverBgColor: string) => ({
  padding: 0,
  borderRadius: '50%',
  '&:hover': { backgroundColor: `${hoverBgColor}20` },
});
