import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

// import getApiUrl from "app/utils/apiUrl"; // Previous method, may revert.

import axios from 'axios';
import api from "../api/api";

export default function Test() {
  const [data, setData] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
/* // Previous method, may revert
    const apiUrl = getApiUrl();

    fetch(`${apiUrl}/test`)
      .then(async res => {
        if (!res.ok) throw new Error("Network response was not ok");
        if (!res.headers.get('Content-Type')?.includes('application/json')) {
          await res.text();
          throw new Error("Expected JSON, got something else");
        }
        return res.json();
*/
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
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4">Test</Typography>
      {error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Typography>{data ? data : "Loading..."}</Typography>
      )}
    </Box>
  );
}