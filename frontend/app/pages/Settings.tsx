import React, { useState } from "react";
import { Paper, Box, Typography, Button, Stack, IconButton, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAuth0 } from "@auth0/auth0-react";

const Settings: React.FC = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const { getAccessTokenSilently } = useAuth0();

  if (!open) return null;

  // Swap error.main and error.dark for Delete Account depending on mode
  const isDark = theme.palette.mode === "dark";
  const deleteBg = isDark ? theme.palette.error.main : theme.palette.error.dark;
  const deleteHover = isDark ? theme.palette.error.dark : theme.palette.error.main;

  const handleExport = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("/api/export-data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to export data");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "user_data_export.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to export data.");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.25)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          minWidth: 320,
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
          }}
          onClick={() => setOpen(false)}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Settings
        </Typography>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleExport}>
            Data Export
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{
              bgcolor: deleteBg,
              "&:hover": { bgcolor: deleteHover },
            }}
          >
            Delete Account
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;
