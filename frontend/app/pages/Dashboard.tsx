import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}> {/* Removed padding */}
      <Typography variant="h4">Welcome to the Dashboard!</Typography>
      <Typography>This is your main dashboard content.</Typography>
    </Box>
  );
}