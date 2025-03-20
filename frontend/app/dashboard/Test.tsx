import { Box, Toolbar, Typography } from "@mui/material";

export default function Test() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h4">Test</Typography>
      <Typography>This is the test page.</Typography>
    </Box>
  );
}