import { Box, Typography, Card, CardContent, Button, TextField, Grid, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import jobData from "../../dataset_indeed-scraper_2025-04-01_00-47-19-716.json";

export default function Postings() {
  const [filters, setFilters] = useState({
    location: "",
    jobTitle: "",
    salary: "",
  });
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobData.filter((job) => {
    return (
      (!filters.location || job.location.includes(filters.location)) &&
      (!filters.jobTitle || job.positionName.includes(filters.jobTitle)) &&
      (!filters.salary || (job.salary && job.salary.includes(filters.salary)))
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
        <TextField
          label="Salary"
          name="salary"
          value={filters.salary}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <List sx={{ maxHeight: "80vh", overflow: "auto", border: "1px solid #ccc", borderRadius: 1 }}>
            {filteredJobs.map((job) => (
              <ListItem
                key={job.id}
                button
                onClick={() => setSelectedJob(job)}
                sx={{ borderBottom: "1px solid #eee" }}
              >
                <ListItemText
                  primary={job.positionName}
                  secondary={`${job.location} | ${job.salary || "Not specified"}`}
                />
              </ListItem>
            ))}
          </List>
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
        <Typography
          variant="body2"
          sx={{
            marginTop: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: showFullDescription ? "none" : 3,
            overflow: "hidden",
          }}
        >
          {job.description}
        </Typography>
        <Button
          size="small"
          onClick={toggleDescription}
          sx={{ marginTop: 1 }}
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
            View Job Posting
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}