import { Box, Toolbar, Typography } from "@mui/material";

export default function Settings() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h4">Settings</Typography>
      <Typography>This is the settings content.</Typography>
    </Box>
  );
}
