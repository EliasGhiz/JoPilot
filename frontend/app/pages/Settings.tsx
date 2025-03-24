import { Box, Typography } from "@mui/material";

export default function Settings() {
  return (
    <Box sx={{ flexGrow: 1 }}> {/* Removed padding */}
      <Typography variant="h4">Settings</Typography>
      <Typography>This is the settings content.</Typography>
    </Box>
  );
}
