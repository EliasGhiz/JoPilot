import { Box, Typography } from "@mui/material";

export default function Postings() {
  return (
    <Box sx={{ flexGrow: 1 }}> {/* Removed padding */}
      <Typography variant="h4">Welcome to the Job Postings!</Typography>
      <Typography>API JOB postings will go here</Typography>
    </Box>
  );
}