import React, { useState } from "react";
import { Paper, Box, Typography, Button, Stack, IconButton, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAuth0 } from "@auth0/auth0-react";

const Settings: React.FC = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const { getAccessTokenSilently } = useAuth0();

  // Fix: define deleteBg and deleteHover after theme is available
  const isDark = theme.palette.mode === "dark";
  const deleteBg = isDark ? theme.palette.error.main : theme.palette.error.dark;
  const deleteHover = isDark ? theme.palette.error.dark : theme.palette.error.main;

  const handleExport = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    console.log("Export clicked"); // Debug: ensure function is called
    try {
      // Add more debug logs to trace execution
      const token = await getAccessTokenSilently();
      console.log("Token acquired", token); // Debug
      if (!token) {
        alert("No Auth0 token acquired.");
        return;
      }
      // Check fetch availability
      if (!window.fetch) {
        alert("Fetch API not available.");
        return;
      }
      // Actually send the request
      const response = await fetch("/api/export-data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/zip",
        },
      });
      console.log("Fetch sent, status:", response.status); // Debug
      if (!response.ok) {
        const text = await response.text();
        alert("Failed to export data.\n" + text);
        return;
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
      console.error("Export error:", err); // Debug
      if (
        err instanceof Error &&
        err.message.includes("You forgot to wrap your component in <Auth0Provider>")
      ) {
        alert(
          "Auth0Provider is missing.\n\nPlease ensure your app is wrapped in <Auth0Provider> in your main entry file (e.g., index.tsx).\n\nSee: https://auth0.com/docs/quickstart/spa/react/01-login"
        );
      } else {
        alert("Failed to export data.");
      }
    }
  };

  if (!open) return null;

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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleExport}
            type="button"
            id="data-export-btn"
          >
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
