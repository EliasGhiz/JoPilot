import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Tooltip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PestControlRodentIcon from '@mui/icons-material/PestControlRodent';
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 56;
const appBarHeight = 64;
const listItemHeight = 48;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  }
});

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add a helper function to determine the active title based on the route
  const getTitle = () => {
    switch(location.pathname) {
      case "/dashboard": return "Dashboard";
      case "/settings": return "Settings";
      case "/test": return "Test";
      default: return "";
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex", bgcolor: "background.default", color: "text.primary" }}>
        <CssBaseline />

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              onClick={() => setOpen(!open)}
              sx={{
                width: collapsedWidth, // changed from appBarHeight
                height: appBarHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",  // changed from 'center'
                pl: "16px",                    // add left padding to align with the sidebar icons
                marginLeft: "0",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/favicon.svg" alt="Jo" style={{ height: '32px', marginRight: '4px' }} />
                <span style={{ fontWeight: 'bold', fontSize: '26px', lineHeight: '28px' }}>Pilot</span>
                <span style={{ marginLeft: '8px', fontSize: '20px', color: darkTheme.palette.text.secondary }}>
                  / {getTitle()}
                </span>
              </span>
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          anchor="left"
          open={open}
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : collapsedWidth,
              transition: "width 0.3s",
              boxSizing: "border-box",
              top: appBarHeight,
              height: `calc(100vh - ${appBarHeight}px)`,
              overflowX: "hidden",
              bgcolor: "background.paper",
              color: "text.primary",
            },
          }}
        >
          <List>

            <Tooltip title="Dashboard" placement="right" disableHoverListener={open}>
              <ListItem
                component="button"
                role="button"
                onClick={() => navigate("/dashboard")}
                sx={{
                  height: listItemHeight,
                  alignItems: "center",
                  display: "flex",
                  gap: "4px",
                  pl: "16px",
                  width: "100%",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  "&:hover": { bgcolor: "action.hover" },
                  bgcolor: location.pathname === "/dashboard" ? "action.selected" : "inherit",
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <DashboardIcon color={location.pathname === "/dashboard" ? "error" : "inherit"} />
                </ListItemIcon>
                {open && <ListItemText primary="Dashboard" sx={{ color: 'text.primary' }} />}
              </ListItem>
            </Tooltip>

            <Tooltip title="Settings" placement="right" disableHoverListener={open}>
              <ListItem
                component="button"
                role="button"
                onClick={() => navigate("/settings")}
                sx={{
                  height: listItemHeight,
                  alignItems: "center",
                  display: "flex",
                  gap: "4px",
                  pl: "16px",
                  width: "100%",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  "&:hover": { bgcolor: "action.hover" },
                  bgcolor: location.pathname === "/settings" ? "action.selected" : "inherit",
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <SettingsIcon color={location.pathname === "/settings" ? "error" : "inherit"} />
                </ListItemIcon>

                {open && <ListItemText primary="Settings" sx={{ color: 'text.primary' }} />}
              
              </ListItem>
            </Tooltip>

            <Tooltip title="Test" placement="right" disableHoverListener={open}>
              <ListItem
                component="button"
                role="button"
                onClick={() => navigate("/test")}
                sx={{
                  height: listItemHeight,
                  alignItems: "center",
                  display: "flex",
                  gap: "4px",
                  pl: "16px",
                  width: "100%",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  "&:hover": { bgcolor: "action.hover" },
                  bgcolor: location.pathname === "/test" ? "action.selected" : "inherit",
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <PestControlRodentIcon color={location.pathname === "/test" ? "error" : "inherit"} />
                </ListItemIcon>

                {open && <ListItemText primary="Test" sx={{ color: 'text.primary' }} />}
              
              </ListItem>
            </Tooltip>

          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: "margin 0.3s ease",
            marginLeft: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
