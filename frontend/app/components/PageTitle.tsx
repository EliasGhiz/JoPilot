// PageTitle.tsx – Displays the current page title in the content area header.

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ position: "absolute", top: 0, left: theme.spacing(1), p: theme.spacing(1) }}>
      <Typography 
        variant="subtitle1"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 400,
          color: theme.palette.text.secondary,
          letterSpacing: '0.009375em'
        }}
      >
        / {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
