import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Test() {
  const [data, setData] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/test`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setData(data.message);
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}> {/* Removed padding */}
      <Typography variant="h4">Test</Typography>
      {error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Typography>{data ? data : "Loading..."}</Typography>
      )}
    </Box>
  );
}