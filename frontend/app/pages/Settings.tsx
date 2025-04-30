import React, { useState } from "react";
import { Paper, Box, Typography, Button, Stack, IconButton, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAuth0 } from "@auth0/auth0-react";
import JSZip from "jszip";

const Settings: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const theme = useTheme();
  const { getAccessTokenSilently, logout } = useAuth0();

  const isDark = theme.palette.mode === "dark";
  const deleteBg = isDark ? theme.palette.error.main : theme.palette.error.dark;
  const deleteHover = isDark ? theme.palette.error.dark : theme.palette.error.main;

  const handleExport = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    // Example user data to mimic backend export
    const exampleData = {
      user: {
        UserID: 1,
        Name: "Jane Doe",
        Email: "jane@example.com",
        Auth0ID: "auth0|123456789"
      },
      profiles: [
        {
          ProfileID: 1,
          Resume: "resume.pdf",
          CoverLetter: "coverletter.pdf",
          Summary: "Experienced software engineer."
        }
      ],
      jobs: [
        {
          JobID: 1,
          Salary: 120000,
          Type: "Full-time",
          Keywords: "React, Python, AWS",
          Description: "Frontend Developer",
          CompanyName: "TechCorp"
        }
      ],
      applications: [
        {
          ApplicationID: 1,
          Status: "Interview",
          FollowUpDeadline: "2024-05-15",
          Note: "Followed up via email.",
          JobID: 1
        }
      ],
      bookmarks: [
        {
          UserID: 1,
          JobID: 1,
          Note: "Dream job"
        }
      ]
    };

    const zip = new JSZip();
    zip.file("user_data.json", JSON.stringify(exampleData, null, 2));
    // Optionally add dummy files to represent resume/coverletter
    zip.file("resume.pdf", "This is a dummy resume PDF file.", { binary: false });
    zip.file("coverletter.pdf", "This is a dummy cover letter PDF file.", { binary: false });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
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
            onClick={handleDelete}
          >
            Delete Account
          </Button>
        </Stack>
      </Paper>
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This is unreversable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
