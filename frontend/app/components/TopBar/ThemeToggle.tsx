// ThemeToggle.tsx – Provides a button to switch themes and toggle dark/light mode.

import React from "react";
import { IconButton, Tooltip, Box, useTheme } from "@mui/material";
import { getThemeColor, themeIconScaleFactors } from "app/theme/colorSystem";
import type { ThemeVariant } from "app/theme/colorSystem";
import type { PaletteMode } from "@mui/material";

interface ThemeToggleProps {
  onThemeLeftClick: () => void;
  onThemeRightClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
  themeIcon: React.ReactNode;
  primaryContrast: string;
  colorMode: PaletteMode;
  themeVariant: ThemeVariant;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  onThemeLeftClick,
  onThemeRightClick,
  themeIcon,
  primaryContrast,
  colorMode,
  themeVariant
}) => {
  const theme = useTheme();
  const hoverBgColor = getThemeColor(themeVariant, 'primary', colorMode, colorMode==='dark' ? 70 : 80);

  return (
    <Tooltip title="Left click: change theme, Right click: toggle dark/light mode">
      <Box
        onClick={onThemeLeftClick}
        onContextMenu={onThemeRightClick}
        sx={{
          width: `${theme.layout.collapsedSidebarWidth}px`,
          height: `${theme.layout.appBarHeight}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative'
        }}
        aria-label="theme toggle area"
      >
        <IconButton 
          sx={{ 
            color: primaryContrast,
            padding: 0,
            borderRadius: '100%',
            '&:hover': {
              backgroundColor: `${hoverBgColor}20`
            }
          }} 
        >
          <Box component="span" sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: theme.spacing(7),
            height: theme.spacing(7), 
            borderRadius: '50%',
            position: 'relative'
          }}>
            <Box component="span" sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${themeIconScaleFactors[themeIcon as string] || 1})`,
              fontSize: theme.typography.fontSize * 2,
              lineHeight: 1,
            }}>
              {themeIcon}
            </Box>
          </Box>
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export default ThemeToggle;
