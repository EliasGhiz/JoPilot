// ThemeToggle.tsx – Provides a button to switch themes and toggle dark/light mode.

import React from "react";
import { Tooltip, Box, useTheme } from "@mui/material";
import type { ThemeVariant } from "app/theme/colorSystem";
import type { PaletteMode } from "@mui/material";
import CentralIconButton from "app/components/IconButton/IconButton";
import { getThemeColor } from "app/theme/colorSystem";

interface ThemeToggleProps {
  onThemeLeftClick: () => void;
  onThemeRightClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
  themeIcon: string;
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
  themeVariant,
}) => {
  const theme = useTheme();

  // Get exact size for each icon in pixels to avoid scaling issues
  const getIconSize = (variant: ThemeVariant): { width: number, height: number } => {
    switch(variant) {
      case 'red':
        return { width: 84, height: 84 };
      case 'blue':
      case 'gray':
      default:
        return { width: 56, height: 56 };
    }
  };
  
  const iconSize = getIconSize(themeVariant);
  const bgCircleSize = theme.layout.appBarHeight * 0.8;
  const hoverBgColor = getThemeColor(themeVariant, 'primary', colorMode, colorMode === 'dark' ? 70 : 80);
  
  return (
    <Tooltip title="Left click: change theme, Right click: toggle dark/light mode">
      <Box
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
        <CentralIconButton
          onClick={onThemeLeftClick}
          onContextMenu={onThemeRightClick}
          hoverBgColor={hoverBgColor}
          iconColor={primaryContrast}
        >
          <Box 
            component="span" 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: `${bgCircleSize}px`,
              height: `${bgCircleSize}px`,
              borderRadius: '50%',
              transition: 'none'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <Box 
                component="img"
                src={themeIcon}
                alt={`${themeVariant} theme icon`}
                sx={{
                  width: iconSize.width,  
                  height: iconSize.height,
                  opacity: 1,
                  filter: colorMode === 'dark' ? 'brightness(1.2) contrast(1.1)' : 'none',
                  transition: 'none',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  transform: {
                    xs: 'translateY(3%)',
                    sm: 'translateY(3%)',
                    md: 'translateY(3%)'
                  }
                }}
              />
            </Box>
          </Box>
        </CentralIconButton>
      </Box>
    </Tooltip>
  );
};

export default ThemeToggle;
