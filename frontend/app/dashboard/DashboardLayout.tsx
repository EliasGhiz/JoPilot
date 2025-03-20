import { useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import { getTopbarColor } from "../../src/themeConfig";
import { useThemeState } from "../hooks/useThemeState";
import { useSidebarState } from "../hooks/useSidebarState";
import { LAYOUT } from "../constants/layout";

export default function DashboardLayout() {
  // Use custom hooks for state management
  const themeState = useThemeState();
  const { open, setOpen } = useSidebarState();
  
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard if at root path
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Get current page title
  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard": return "Dashboard";
      case "/settings": return "Settings";
      case "/test": return "Test";
      default: return "";
    }
  };

  // Get topbar color based on theme state
  const tintedTopbarColor = getTopbarColor(themeState.colorMode, themeState.themeVariant);
  
  return (
    <ThemeProvider theme={themeState.theme}>
      <Box sx={{ display: "flex", bgcolor: "background.default", color: "text.primary" }}>
        <CssBaseline />
        
        <TopBar
          open={open}
          setOpen={setOpen}
          themeIcon={themeState.themeIcon}
          onThemeLeftClick={themeState.cycleThemeVariant}
          onThemeRightClick={(e) => {
            e.preventDefault();
            themeState.toggleColorMode();
          }}
          getTitle={getTitle}
          primaryContrast={themeState.theme.palette.primary.contrastText}
          topbarColor={tintedTopbarColor}
          hamburgerWhite={themeState.hamburgerWhite}
        />
        
        <Sidebar 
          open={open} 
          themeIcon={themeState.themeIcon} 
          colorMode={themeState.colorMode} 
        />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: "margin-left 0.3s ease",
            marginTop: `${LAYOUT.appBarHeight}px`,
            marginLeft: open ? `${LAYOUT.expandedSidebarWidth}px` : `${LAYOUT.collapsedSidebarWidth}px`,
            // Use a fixed total width to prevent jumping
            width: `calc(100% - ${open ? LAYOUT.expandedSidebarWidth : LAYOUT.collapsedSidebarWidth}px)`,
          }}
        >
          {/* Add a wrapper Box with conditional padding and smooth transition */}
          <Box sx={{ 
            py: 4,
            px: open ? 1.5 : 6,
            transition: "padding 0.3s ease",
          }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
