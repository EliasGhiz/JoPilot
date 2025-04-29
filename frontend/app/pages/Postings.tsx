import { Box, Typography, Card, CardContent, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";
import jobData from "../../dataset_indeed-scraper_2025-04-29_18-38-42-368.json";

export default function Postings() {
  const [filters, setFilters] = useState({
    location: "",
    jobTitle: "",
  });
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobData.filter((job) => {
    return (
      (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.jobTitle || job.positionName.toLowerCase().includes(filters.jobTitle.toLowerCase()))
    );
  });

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          label="Location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={filters.jobTitle}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ maxHeight: "80vh", overflow: "auto", border: "1px solid #ccc", borderRadius: 1 }}>
            {filteredJobs.map((job) => (
              <Box
                key={job.id}
                onClick={() => setSelectedJob(job)}
                sx={{
                  padding: 2,
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <Typography variant="subtitle1">{job.positionName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {`${job.location} | ${job.salary || "Not specified"}`}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={8}>
          {selectedJob ? (
            <JobDetails job={selectedJob} />
          ) : (
            <Typography variant="h6" color="textSecondary">
              Select a job to view details
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function JobDetails({ job }: { job: any }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{job.positionName}</Typography>
        <Typography variant="body2" color="textSecondary">
          {job.company} - {job.location}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Salary: {job.salary || "Not specified"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Posted At: {job.postedAt}
        </Typography>
        <Box
          sx={{
            marginTop: 1,
            maxHeight: "50vh",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: 1,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: showFullDescription ? "none" : 3,
              overflow: "hidden",
            }}
          >
            {job.description}
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={toggleDescription}
          sx={{ marginTop: 1, color: "text.secondary" }} // Set text color to textSecondary
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </Button>
        <Box sx={{ marginTop: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => window.open(job.url, '_blank', 'noopener noreferrer')}
          >
            Apply Here
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}