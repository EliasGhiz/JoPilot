// ThemeToggle.tsx – Provides a button to switch themes and toggle dark/light mode.

import React from "react";
import { Tooltip, Box, useTheme } from "@mui/material";
import type { ThemeVariant } from "app/theme/themeColors";
import type { PaletteMode } from "@mui/material";
import CentralIconButton from "app/components/IconButton/IconButton";
import { getThemeColor } from "app/theme/themeColors";

// Mapping for icon sizes instead of a switch statement.
const ICON_SIZES: Record<ThemeVariant, { width: number; height: number }> = {
  red: { width: 84, height: 84 },
  blue: { width: 56, height: 56 },
  gray: { width: 56, height: 56 },
};

interface ThemeToggleProps {
  onThemeLeftClick: () => void;
  onThemeRightClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
  themeIcon: string;
  primaryContrast: string;
  colorMode: PaletteMode;
  themeVariant: ThemeVariant;
  disableTooltip?: boolean;
}

export default function ThemeToggle({
  onThemeLeftClick,
  onThemeRightClick,
  themeIcon,
  primaryContrast,
  colorMode,
  themeVariant,
  disableTooltip,
}) => {
  const theme = useTheme();

  // Use the object mapping for icon sizes.
  const iconSize = ICON_SIZES[themeVariant] || ICON_SIZES.gray;
  const bgCircleSize = theme.layout.appBarHeight * 0.8;
  
  // Extract a common transform value.
  const translateY = 'translateY(3%)';
  
  const hoverBgColor = getThemeColor(themeVariant, 'primary', colorMode, colorMode === 'dark' ? 70 : 80);
  
  const button = (
    <CentralIconButton
      onClick={onThemeLeftClick}
      onContextMenu={onThemeRightClick}
      hoverBgColor={hoverBgColor}
      iconColor={primaryContrast}
    >
      {/* Combined spanning Box for centering */}
      <Box
        component="span"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${bgCircleSize}px`,
          height: `${bgCircleSize}px`,
          borderRadius: '50%',
          transition: 'none',
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
            transform: translateY
          }}
        />
      </Box>
    </CentralIconButton>
  );

  return disableTooltip ? (
    button
  ) : (
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
        {button}
      </Box>
    </Tooltip>
  );
}
