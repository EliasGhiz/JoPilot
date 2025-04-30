import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Button
} from "@mui/material";

// Define types for notifications and bookmarks
interface Notification {
  ApplicationID: number;
  CompanyName: string;
  Status: string;
  FollowUpDeadline: string;
  Note: string;
}

interface Bookmark {
  JobID: number;
  CompanyName: string;
  Type: string;
  Note: string;
}

export default function Dashboard() {
  const userId = 1; // TODO: Replace with actual user ID from auth context

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = axios.get(`/api/applied_to/${userId}`);
    const fetchBookmarks = axios.get(`/api/bookmarks/${userId}`);

    Promise.all([fetchNotifications, fetchBookmarks])
      .then(([notificationsRes, bookmarksRes]) => {
        setNotifications(Array.isArray(notificationsRes.data) ? notificationsRes.data : []);
        setBookmarks(Array.isArray(bookmarksRes.data) ? bookmarksRes.data : []);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const insertMockData = () => {
    setNotifications([
      {
        ApplicationID: 1001,
        CompanyName: "Google",
        Status: "Interview",
        FollowUpDeadline: "2025-05-10",
        Note: "Prepare portfolio",
      },
      {
        ApplicationID: 1002,
        CompanyName: "Netflix",
        Status: "Pending",
        FollowUpDeadline: "2025-05-14",
        Note: "Sent application",
      }
    ]);

    setBookmarks([
      {
        JobID: 2001,
        CompanyName: "Google",
        Type: "Internship",
        Note: "Top choice",
      },
      {
        JobID: 2002,
        CompanyName: "Amazon",
        Type: "Full-Time",
        Note: "Apply soon",
      }
    ]);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard!
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        {/* Notifications */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
          <Divider sx={{ my: 1 }} />
          {notifications.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No current notifications.
            </Typography>
          ) : (
            <List>
              {notifications.map((app) => (
                <ListItem key={app.ApplicationID} divider>
                  <ListItemText
                    primary={`${app.CompanyName} — Status: ${app.Status}`}
                    secondary={`Follow-up: ${app.FollowUpDeadline || "N/A"} • Note: ${app.Note || "None"}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>

        {/* Bookmarks */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6">Bookmarks</Typography>
          <Divider sx={{ my: 1 }} />
          {bookmarks.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No bookmarks saved.
            </Typography>
          ) : (
            <List>
              {bookmarks.map((book) => (
                <ListItem key={book.JobID} divider>
                  <ListItemText
                    primary={`${book.CompanyName} — ${book.Type}`}
                    secondary={`Note: ${book.Note || "No note"}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={insertMockData}
        >
          Test Data
        </Button>
      </Box>
    </Box>
  );
}