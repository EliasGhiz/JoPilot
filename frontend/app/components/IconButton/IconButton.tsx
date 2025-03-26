// IconButton.tsx – Renders a centralized icon button with defined styles for interactive feedback.

import React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

interface CentralIconButtonProps {
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
  hoverBgColor: string;
  iconColor?: string;
  children: React.ReactNode;
}

export default function CentralIconButton({
  onClick,
  onContextMenu,
  hoverBgColor,
  iconColor,
  children
}: CentralIconButtonProps) {
  const theme = useTheme<Theme>();
  const containerHeight = theme.layout?.appBarHeight || 56;
  const containerWidth = theme.layout?.collapsedSidebarWidth || 56;
  const circleSize = containerHeight * 0.75;

  return (
    <Box
      onClick={onClick}
      onContextMenu={onContextMenu}
      sx={{
        width: containerWidth,
        height: containerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <IconButton
        disableRipple
        onPointerDown={(e) => { e.currentTarget.style.backgroundColor = `${hoverBgColor}20`; }}
        onPointerUp={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        onTouchStart={(e) => { e.currentTarget.style.backgroundColor = `${hoverBgColor}20`; }}
        onTouchEnd={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        sx={{
          color: iconColor || 'inherit',
          padding: 0,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          transition: 'background-color 0.2s',
          '&:hover': { backgroundColor: `${hoverBgColor}20` },
          '&:active': { backgroundColor: 'transparent' }
        }}
      >
        <Box
          sx={{
            width: circleSize,
            height: circleSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {children}
        </Box>
      </IconButton>
    </Box>
  );
}
