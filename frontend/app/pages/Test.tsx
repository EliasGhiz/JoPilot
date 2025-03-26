import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from 'axios';
import api from "../components/api/api";

export default function Test() {
  const [data, setData] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //
    const apiUrl = window.location.hostname === 'localhost' ? 
                  'http://localhost:5000' : 
                  `${window.location.origin}/api`;
                  
    console.log("Using API URL:", apiUrl);
    
    api.get('/test')
      .then(response => {
        setData(response.data.message);
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      });
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