import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useState } from "react";
import jobData from "../../dataset_indeed-scraper_2025-04-01_00-47-19-716.json"; // Adjust the path if necessary

export default function Postings() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Job Postings
      </Typography>
      {jobData.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Box>
  );
}

function JobCard({ job }: { job: any }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{job.positionName}</Typography>
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
        <Typography variant="body2" color="primary" sx={{ marginTop: 1 }}>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            View Job Posting
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
}