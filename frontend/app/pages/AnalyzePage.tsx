import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FileUpload from '@mui/icons-material/FileUpload'; // Import the FileUpload icon

const AnalyzePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const theme = useTheme();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile)); // Create a URL for the file
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const droppedFile = event.dataTransfer.files[0];
      setFile(droppedFile);
      setFileUrl(URL.createObjectURL(droppedFile)); // Create a URL for the file
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const apiUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5000/api/analyze-resume"
          : "/api/analyze-resume";

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuggestions(response.data.suggestions || "No suggestions available.");
      setError(null);
      setIsModalOpen(true); // Open the modal when suggestions are returned
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred while uploading the file.");
      } else {
        setError("An unexpected error occurred.");
      }
      setSuggestions(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(3),
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
      </Typography>

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          padding: theme.spacing(2),
          textAlign: "center",
          border: "2px dashed",
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.background.default,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column", // Stack items vertically
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spacing(1), // Add spacing between icon and text
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <FileUpload
          sx={{
            fontSize: 48, // Larger size for emphasis
            color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark,
          }}
        />
        <Typography variant="body1" gutterBottom
        sx={{ marginBottom: theme.spacing(0) }} // Use a smaller margin
        >
          Drag & Drop to Upload File <br />
          or
        </Typography>
        <input
          type="file"
          accept=".pdf,.docx"
          style={{ display: "none" }}
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Browse Files
          </Button>
        </label>
        {file && (
          <Typography variant="body2" sx={{ marginTop: theme.spacing(2) }}>
            Selected File: {file.name}
          </Typography>
        )}
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!file || isUploading}
        sx={{ alignSelf: "center" }}
      >
        {isUploading ? <CircularProgress size={24} /> : "Upload"}
      </Button>

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}

      {/* Modal for File Preview and Suggestions */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.dark,
              fontWeight: "bold",
            }}
          >
            Resume Analysis
          </Typography>
        </DialogTitle>
        <DialogContent>
          {fileUrl && file && (
            <Box sx={{ width: "100%", height: "400px", marginBottom: theme.spacing(2) }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                }}
              >
              </Typography>
              {file.name.endsWith(".pdf") ? (
                <iframe
                  src={fileUrl}
                  title="File Preview"
                  style={{ width: "100%", height: "100%", border: "none" }}
                />
              ) : (
                <Typography variant="body2">
                  Preview not available for .docx files.{" "}
                  <a href={fileUrl} download={file.name}>
                    Download the file
                  </a>
                </Typography>
              )}
            </Box>
          )}
          {suggestions && (
            <Box sx={{ marginTop: theme.spacing(6) }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                }}
              >
                Suggestions:
              </Typography>
              <Typography variant="body2">{suggestions}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnalyzePage;