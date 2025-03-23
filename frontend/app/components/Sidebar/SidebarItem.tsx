// SidebarItem.tsx – Renders individual navigation items in the sidebar with selection state and icons.

import { cloneElement } from 'react';
import {
  ListItemButton,
    ListItemText,
  Tooltip,
  Box
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSidebarIconColor, getThemeColor } from 'app/theme/colorSystem';
import { SidebarItemProps } from './types';

// Sidebar item component
export const SidebarItem = ({ item, open, colorMode, themeVariant }: SidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = location.pathname === item.route;
  
  // Subtle background shade hint for selection
  const baseShade = colorMode === 'dark' 
    ? 'rgba(255, 255, 255, 0.15)' 
    : 'rgba(0, 0, 0, 0.09)';
  
  const iconColor = isSelected
    ? (themeVariant === 'blue'
          ? getThemeColor('blue', 'primary', colorMode, 45)
          : themeVariant === 'red'
            ? getThemeColor('red', 'primary', colorMode, 50)
            : themeVariant === 'gray'
              ? getThemeColor('gray', 'neutral', colorMode, colorMode === 'light' ? 30 : 90)
              : getSidebarIconColor(colorMode, themeVariant))
    : (colorMode === 'dark'
          ? getThemeColor('gray', 'neutral', colorMode, 70)
          : getThemeColor('gray', 'neutral', colorMode, 40));
  
  return (
    <Tooltip title={item.label} placement="right" disableHoverListener={open}>
      <ListItemButton
        onClick={() => navigate(item.route)}
        sx={{
          // Different styling for open vs closed sidebar
          p: 0,
          my: 0.5,
          // Don't touch  horizontal margins when collapsed so the icon container stays fixed
          mx: 0,
          height: 48,
          borderRadius: open ? '4px' : 0,
          bgcolor: isSelected ? baseShade : 'inherit',
          transition: 'none',
          '&:hover': { 
            bgcolor: isSelected 
              ? baseShade 
              : (theme) => theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'rgba(0, 0, 0, 0.04)' 
          },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Fixed container for the icon */}
        <Box 
          sx={{
            width: 56, // Fixed width (always 56px)
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {cloneElement(item.icon as React.ReactElement<any>, { 
            style: { 
              color: iconColor,
              fontSize: '1.4rem',
            }
          })}
        </Box>
        
        {/* The text - only shown when sidebar is open */}
        {open && (
          <ListItemText 
            primary={item.label} 
            sx={{
              ml: 1,
              color: colorMode === 'dark' 
                ? getThemeColor('gray', 'neutral', colorMode, 95) 
                : 'inherit'
            }}
          />
        )}
      </ListItemButton>
    </Tooltip>
  );
};
