// CircularHighlight.tsx – Creates a circular container with hover effect for wrapped child elements.

import React, { useState } from 'react';
import { Box } from '@mui/material';

interface CircularHighlightProps {
  children: React.ReactNode;
  size?: number; // fallback maximum size in pixels
  hoverBgColor?: string;
  forceHover?: boolean; // Icon circle background trigger
}

export default function CircularHighlight({ 
  children, 
  size = 48, 
  hoverBgColor,
  forceHover = false // Default to false
}: CircularHighlightProps) {
  const [hover, setHover] = useState(false);
  
  // Use either natural hover or forced hover
  const showHighlight = hover || forceHover;
  
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
        backgroundColor: showHighlight ? (hoverBgColor || 'rgba(0,0,0,0.1)') : 'transparent',
        // Make the circle smaller on smaller viewports
        '@media (max-width:600px)': {
          width: size * 0.9,
          height: size * 0.9,
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Box>
  );
}
