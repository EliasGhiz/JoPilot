// LogoWithTitle.tsx – Displays the app’s logo and title; clicking it navigates to the home page.

import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoIcon from "./LogoIcon";

const LogoWithTitle = () => {
  const navigate = useNavigate();
  return (
    <Box 
      sx={{ display: 'inline-flex', alignItems: 'center', height: 32, userSelect: 'none', cursor: 'pointer' }}
      onClick={() => navigate("/")}
    >
      <LogoIcon />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 0.25 }}>
        <Typography
          variant="h5"
          component="span"
          sx={{
            fontWeight: 700,
            letterSpacing: '0.005em',
            color: "#fff",
            fontSize: '2rem',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none'
          }}
        >
          Pilot
        </Typography>
      </Box>
    </Box>
  );
};

export default LogoWithTitle;
