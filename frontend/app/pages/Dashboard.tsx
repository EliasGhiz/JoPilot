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
  Button,
  Stack,
  useTheme // Import useTheme
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0

// Import Chart.js components and react-chartjs-2 wrapper
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  // BarElement, // Removed BarElement
  PointElement, // Added PointElement
  LineElement,  // Added LineElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import { Bar } from 'react-chartjs-2'; // Removed Bar
import { Line } from 'react-chartjs-2'; // Added Line

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  // BarElement, // Removed BarElement registration
  PointElement, // Added PointElement registration
  LineElement,  // Added LineElement registration
  Title,
  Tooltip,
  Legend
);

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

// Chart data structure - Updated for Line chart with two datasets
interface ChartData {
  labels: string[]; // Example: ['Jan', 'Feb', 'Mar', ...] or specific dates
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string; // Often used for area under the line
    tension?: number; // Optional: for line curve
  }[];
}

export default function Dashboard() {
  const userId = 1; // TODO: Replace with actual user ID from auth context
  const { getAccessTokenSilently } = useAuth0(); // Get token function
  const theme = useTheme(); // Get the current theme

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for chart data - Updated initial state for Line chart
  const [chartData, setChartData] = useState<ChartData>({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example labels, adjust as needed
    datasets: [
      {
        label: 'Applications',
        data: [0, 0, 0, 0], // Initial data points
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.1
      },
      {
        label: 'Callbacks',
        data: [0, 0, 0, 0], // Initial data points
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      },
    ],
  });

  // Function to generate random test data for the chart - Updated for Line chart
  const generateChartTestData = (isErrorFallback = false) => {
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
    const appData = labels.map(() => Math.floor(Math.random() * 15) + 1); // Random apps per week
    const callbackData = appData.map(apps => Math.floor(Math.random() * (apps / 2))); // Callbacks generally less than half of apps

    // Define test colors based on theme mode
    const isDarkMode = theme.palette.mode === 'dark';
    const testAppBorderColor = isErrorFallback ? 'rgb(255, 159, 64)' : 'rgb(53, 162, 235)';
    const testAppBgColor = isErrorFallback
      ? (isDarkMode ? 'rgba(255, 159, 64, 0.3)' : 'rgba(255, 159, 64, 0.5)') // Lighter alpha in dark mode
      : (isDarkMode ? 'rgba(53, 162, 235, 0.3)' : 'rgba(53, 162, 235, 0.5)');
    const testCallbackBorderColor = isErrorFallback ? 'rgb(153, 102, 255)' : 'rgb(255, 99, 132)';
    const testCallbackBgColor = isErrorFallback
      ? (isDarkMode ? 'rgba(153, 102, 255, 0.3)' : 'rgba(153, 102, 255, 0.5)') // Lighter alpha in dark mode
      : (isDarkMode ? 'rgba(255, 99, 132, 0.3)' : 'rgba(255, 99, 132, 0.5)');


    setChartData({
      labels: labels,
      datasets: [
        {
          label: isErrorFallback ? 'Applications (Test)' : 'Applications',
          data: appData,
          borderColor: testAppBorderColor,
          backgroundColor: testAppBgColor,
          tension: 0.1
        },
        {
          label: isErrorFallback ? 'Callbacks (Test)' : 'Callbacks',
          data: callbackData,
          borderColor: testCallbackBorderColor,
          backgroundColor: testCallbackBgColor,
          tension: 0.1
        },
      ],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      // Define isDarkMode early, before await calls
      const isDarkMode = theme.palette.mode === 'dark';
      try {
        const token = await getAccessTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch applications for the logged-in user
        const applicationsRes = await axios.get(`/api/applications`, { headers });

        // Add more robust check for successful response and data format
        if (applicationsRes.status === 200 && Array.isArray(applicationsRes.data)) {
            const fetchedApplications = applicationsRes.data;
            setNotifications(fetchedApplications); // Still set notifications

            // --- Calculate initial chart data for Line Chart ---
            const labels = ['Start', 'Current']; // Simplified labels
            const applicationCount = fetchedApplications.length;
            const callbackCount = fetchedApplications.filter(app =>
              ['Interview', 'Offer', 'Assessment'].includes(app.Status)
            ).length;

            setChartData({
              labels: labels,
              datasets: [
                {
                  label: 'Applications',
                  data: [0, applicationCount], // Show total at the 'Current' point
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: isDarkMode ? 'rgba(53, 162, 235, 0.3)' : 'rgba(53, 162, 235, 0.5)',
                  tension: 0.1
                },
                {
                  label: 'Callbacks',
                  data: [0, callbackCount], // Show total at the 'Current' point
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.3)' : 'rgba(255, 99, 132, 0.5)',
                  tension: 0.1
                },
              ],
            });
            // --- End chart data calculation ---
        } else {
             // Handle cases where response status is not 200 or data is not an array
             throw new Error(`Unexpected API response: Status ${applicationsRes.status}, Data type ${typeof applicationsRes.data}`);
        }

      } catch (err) {
        console.error("Error fetching or processing dashboard data:", err); // More specific console log
        // Check if the error is from Axios and provide more detail if possible
        let detailedError = "Failed to load dashboard data. Displaying test data.";
        if (axios.isAxiosError(err)) {
            detailedError += ` (Status: ${err.response?.status || 'N/A'}, Message: ${err.message})`;
        } else if (err instanceof Error) {
            detailedError += ` (${err.message})`;
        }
        setError(detailedError);
        generateChartTestData(true); // Generate test data on error
        // Ensure notifications/bookmarks are cleared on error
        setNotifications([]);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, theme]); // Depend on getAccessTokenSilently and theme

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

  // Remove the early return for loading state
  // if (loading) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // Remove the early return for error state
  // if (error) {
  //   return (
  //     <Box sx={{ p: 2 }}>
  //       <Alert severity="error">{error}</Alert>
  //     </Box>
  //   );
  // }

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false, // Title is handled outside the chart
      },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                 // Ensure y-axis shows whole numbers if counts are always integers
                 precision: 0
            }
        }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard!
      </Typography>

      {/* Show error message if there was an error, but still render the chart */}
      {error && (
         <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>{error}</Alert>
      )}

      {/* Analytics Section - Render even if loading initially or if error occurred */}
      { (loading || error || chartData) && (
          <Paper sx={{ p: 2, mt: 4, mb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Analytics</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => generateChartTestData(false)} // Pass false for manual test click
                disabled={loading} // Disable button while loading real data
              >
                Test View
              </Button>
            </Stack>
            <Box sx={{ height: 300 }}> {/* Give the chart container a fixed height */}
              {loading && !error ? ( // Show loader inside chart area only if loading and no error yet
                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                 </Box>
              ) : (
                 // Use Line component instead of Bar
                 <Line options={chartOptions} data={chartData} />
              )}
            </Box>
          </Paper>
      )}


      {/* Render Notifications/Bookmarks once loading is finished, regardless of error */}
      {!loading && (
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
      )}

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={insertMockData} // This button still inserts mock data for tables
        >
          Test Table Data
        </Button>
      </Box>
    </Box>
  );
}