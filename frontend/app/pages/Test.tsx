import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import api from "../api/api";

export default function Test() {
    const [data, setData] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get('/test')
            .then(response => {
                setData(response.data.message);
            })
            .catch((err: any) => {
                setError(err.message || "An unexpected error occurred");
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