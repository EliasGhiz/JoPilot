// CircularHighlight.tsx – Creates a circular container with hover effect for wrapped child elements.

import React from 'react';
import { Box } from '@mui/material';

interface CircularHighlightProps {
  children: React.ReactNode;
  size?: number; // fallback maximum size in pixels
  hoverBgColor?: string;
}

export default function CircularHighlight({ children, size = 48, hoverBgColor }: CircularHighlightProps) {
  return (
    <Box 
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background-color 0.2s',
        '&:hover': { backgroundColor: hoverBgColor || 'rgba(0,0,0,0.1)' },
        // Make the circle smaller on smaller viewports
        '@media (max-width:600px)': {
          width: size * 0.9,
          height: size * 0.9,
        }
      }}
    >
      {children}
    </Box>
  );
}
