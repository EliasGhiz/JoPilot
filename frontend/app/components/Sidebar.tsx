import { Drawer, Box, List, Divider, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import { useNavigate, useLocation } from "react-router-dom";
import { appVersion } from "../../src/version";
import { getSidebarIconColor } from "../../src/themeConfig";
import { LAYOUT } from "../constants/layout";
import { cloneElement } from "react";
import type { ReactElement } from "react";

// Reusable component for a sidebar navigation item.
const SidebarItem = ({
	icon,
	label,
	route,
	open,
	colorMode,
	baseShade,
	iconSelectedColor
}: {
	icon: ReactElement;
	label: string;
	route: string;
	open: boolean;
	colorMode: "dark" | "light";
	baseShade: string;
	iconSelectedColor: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = location.pathname === route;
  return (
    <Tooltip title={label} placement="right" disableHoverListener={open}>
      <ListItem
        component="button"
        onClick={() => navigate(route)}
        sx={{
          height: 48,
          alignItems: "center",
          pl: "16px",
          width: "100%",
          cursor: "pointer",
          "&:hover": { bgcolor: isSelected ? baseShade : "action.hover" },
          bgcolor: isSelected ? baseShade : "inherit",
          border: "none",
          outline: "none",
          "&:focus": { outline: "none" }
        }}
      >
        <ListItemIcon sx={{ minWidth: "40px", mr: 0 }}>
          {cloneElement(icon as React.ReactElement<any>, { style: { color: isSelected ? iconSelectedColor : undefined } })}
        </ListItemIcon>
        {open && (
          <ListItemText primary={label} sx={{ ml: 0, color: colorMode === "dark" ? "#FFFFFF" : "inherit" }} />
        )}
      </ListItem>
    </Tooltip>
  );
};

interface SidebarProps {
  open: boolean;
  themeIcon: string;
  colorMode: "dark" | "light";
}

export default function Sidebar({ open, themeIcon, colorMode }: SidebarProps) {
  const collapsedWidth = LAYOUT.collapsedSidebarWidth;
  const drawerWidth = LAYOUT.expandedSidebarWidth;
  const baseShade = colorMode === "dark" ? "#2e2e2e" : "#e0e0e0";
  const iconSelectedColor = getSidebarIconColor(colorMode, themeIcon);

  // Define navigation items
  const navItems = [
    { label: "Dashboard", route: "/dashboard", icon: <DashboardIcon /> },
    { label: "Settings", route: "/settings", icon: <SettingsIcon /> },
    { label: "Test", route: "/test", icon: <PestControlRodentIcon /> }
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        position: 'fixed',
        left: 0,
        top: 64, // appBarHeight
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s",
          boxSizing: "border-box",
          top: 64, // appBarHeight
          height: `calc(100vh - 64px)`,
          overflowX: "hidden",
          overflowY: "hidden",
          bgcolor: "background.paper",
          color: "text.primary",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ flexGrow: 1 }}>
          {navItems.map(item => (
            <SidebarItem
              key={item.route}
              icon={item.icon}
              label={item.label}
              route={item.route}
              open={open}
              colorMode={colorMode}
              baseShade={baseShade}
              iconSelectedColor={iconSelectedColor}
            />
          ))}
        </List>
        <Divider sx={{ my: 0, bgcolor: "#424242" }} />
        <Box sx={{ textAlign: "center", p: 1 }}>
          <Typography variant="caption" sx={{ color: colorMode === "dark" ? "#FFFFFF" : "inherit", whiteSpace: "nowrap" }}>
            {open ? `Version ${appVersion}` : `v${appVersion}`}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
