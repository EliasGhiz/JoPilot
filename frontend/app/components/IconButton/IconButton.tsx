import React, { useState } from 'react';
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
  // Default to theme-driven layout values
  const containerHeight = theme.layout?.appBarHeight || 56;
  const containerWidth = theme.layout?.collapsedSidebarWidth || 56;
  // Circle size: 80% of container height
  const circleSize = containerHeight * 0.75;

  const [isHovered, setIsHovered] = useState(false);
  const computedBg = isHovered ? `${hoverBgColor}20` : 'transparent';

  return (
    <Box
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        sx={{
          color: iconColor || 'inherit',
          padding: 0,
          borderRadius: '50%',
          backgroundColor: computedBg,
          transition: 'background-color 0.2s',
          '&:hover': { backgroundColor: computedBg },
          pointerEvents: 'none'
        }}
      >
        {/* Circle containing children */}
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
