import { useEffect, useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import api from "../../src/api/api";
import axios from 'axios';

export default function Test() 
{
  const [data, setData] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData called');
      try 
      {
        const response = await api.get("/test");
        console.log('Data fetched successfully:', response.data);
        setData(response.data.message);
      }
      catch (err) 
      {
        console.log('Error occurred:', err);
        if (axios.isAxiosError(err))
        {
          setError(err.message);
        } 
        else 
        {
          setError("An unexpected error occurred");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h4">Test</Typography>
      {error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Typography>{data ? data : "Loading..."}</Typography>
      )}
    </Box>
  );
}