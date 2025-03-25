import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import getApiUrl from "app/utils/apiUrl";

export default function Test() {
  const [data, setData] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = getApiUrl();

    fetch(`${apiUrl}/test`)
      .then(async res => {
        if (!res.ok) throw new Error("Network response was not ok");
        if (!res.headers.get('Content-Type')?.includes('application/json')) {
          await res.text();
          throw new Error("Expected JSON, got something else");
        }
        return res.json();
      })
      .then(data => {
        setData(data.message);
      })
      .catch(err => setError(err.message));
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