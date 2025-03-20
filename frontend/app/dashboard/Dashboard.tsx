import React from "react";
import { Box, Typography, Toolbar } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h4">Welcome to the Dashboard!</Typography>
      <Typography>This is your main dashboard content.</Typography>
    </Box>
  );
}
