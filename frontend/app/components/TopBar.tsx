import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Use the literal SVG content from favicon.svg
function LogoIcon() {
  return (
    <svg 
      viewBox="0 0 512 512" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ width: '100%', height: '100%' }}
    >
      <rect width="512" height="512" fill="#E53E3E" rx="80" ry="80"/>
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="central" 
        textAnchor="middle" 
        fontFamily="Arial" 
        fontWeight="bold" 
        fill="#FFFFFF" 
        fontSize="409.6" 
        dy="0"
      >
        Jo
      </text>
    </svg>
  );
}

interface TopBarProps {
  topbarColor: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  themeIcon: string;
  onThemeLeftClick: () => void;
  onThemeRightClick: (e: React.MouseEvent) => void;
  getTitle: () => string;
  primaryContrast: string;
  hamburgerWhite: boolean;
}

export default function TopBar(props: TopBarProps) {
  const { topbarColor, open, setOpen, themeIcon, onThemeLeftClick, onThemeRightClick, getTitle, primaryContrast, hamburgerWhite } = props;

  return (
    <AppBar position="fixed" sx={{ bgcolor: topbarColor, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar disableGutters>
        <IconButton
          color="inherit"
          onClick={() => setOpen(!open)}
          sx={{
            width: 56, // collapsedWidth
            height: 64, // appBarHeight
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            pl: "16px",
            ml: "0",
          }}
        >
          <MenuIcon sx={{ color: hamburgerWhite ? "#fff" : "inherit" }} />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ ml: 0.5 }}> {/* Reduced margin from 1 to 0.5 */}
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {/* Replace the image with the inline SVG component */}
            <span style={{ width: '32px', height: '32px', display: 'flex', justifyContent: 'center', marginRight: '4px' }}>
              <LogoIcon />
            </span>
            <span style={{ fontWeight: 'bold', fontSize: '26px', lineHeight: '28px', color: "#fff" }}>
              Pilot
            </span>
            <span style={{ marginLeft: "8px", fontSize: '20px', color: "#fff" }}>
              / {getTitle()}
            </span>
          </span>
        </Typography>
        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Left click to change theme, Right click to toggle dark/light mode">
          <IconButton
            onClick={onThemeLeftClick}
            onContextMenu={onThemeRightClick}
            sx={{
              width: 56,
              height: 64,
              color: primaryContrast,
              position: 'relative', // Add positioning context
            }}
          >
            {/* Apply different font sizes based on the emoji */}
            <span style={{ 
              fontSize: themeIcon === "🪐" ? "30px" : "24px", // Larger size for planet
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // Center the emoji
              lineHeight: 1,
            }}>
              {themeIcon}
            </span>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
