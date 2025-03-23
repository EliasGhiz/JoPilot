// MainContent.tsx – Renders the primary content area with responsive margins based on sidebar state.

import React from "react";
import { Box } from "@mui/material";
import { TRANSITION_SPEED_FAST } from "app/theme/uiConstants";

interface MainContentProps {
  open: boolean;
  appBarHeight: number;
  expandedSidebarWidth: number;
  collapsedSidebarWidth: number;
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({
  open,
  appBarHeight,
  expandedSidebarWidth,
  collapsedSidebarWidth,
  children
}) => {
  const sidebarWidth = open ? expandedSidebarWidth : collapsedSidebarWidth;
  
  return (
    <Box 
      component="main"
      sx={{
        position: "relative",
        flexGrow: 1,
        marginTop: `${appBarHeight}px`,
        marginLeft: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        minHeight: `calc(100vh - ${appBarHeight}px)`,
        transition: `margin-left ${TRANSITION_SPEED_FAST} ease`
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
