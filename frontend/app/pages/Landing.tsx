import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import ThemeToggle from "app/components/TopBar/ThemeToggle";
import { getThemeColor } from "app/theme/themeColors";
import { useThemeState } from "app/hooks/useThemeState";
import { useAuth0 } from "@auth0/auth0-react";
import JoLogo from "app/components/JoLogo";

const Landing: React.FC = () => {
  const { colorMode, toggleColorMode } = useThemeState();
  const theme = useTheme();
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [logoReady, setLogoReady] = React.useState(false);

  // Derive text color from the palette.
  const textPrimary = React.useMemo(
    () =>
      colorMode === "light"
        ? theme.palette.grey[900]
        : theme.palette.common.white,
    [colorMode, theme]
  );
  const primaryContrast = textPrimary;
  const loginTextColor =
    colorMode === "dark"
      ? theme.palette.common.white
      : theme.palette.grey[900];

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      loginWithRedirect();
    }
  };

  // Common container style.
  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Box
      sx={{
        backgroundColor: getThemeColor("gray", "neutral", colorMode, colorMode === "dark" ? 15 : 90),
      }}
    >
      {/* Theme toggle icon */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        <ThemeToggle
          onThemeLeftClick={toggleColorMode}
          onThemeRightClick={(e) => {
            e.preventDefault();
            toggleColorMode();
          }}
          themeIcon="/sunmoon.png"
          primaryContrast={primaryContrast}
          colorMode={colorMode}
          themeVariant="gray"
          disableTooltip={true}
        />
      </Box>

      {/* Centered Main Content */}
      <Box
        sx={{
          ...containerStyle,
          opacity: logoReady ? 1 : 0,
          transition: "opacity 2.5s ease",
        }}
      >
        <JoLogo
          style={{
            userSelect: "none",
            marginBottom: "4px",
          }}
          primaryColor={theme.palette.common.white}
          secondaryColor={colorMode === "light" ? textPrimary : theme.palette.common.white}
          onLoad={() => setLogoReady(true)}
        />

          {/* Desc */}
        <Box
          sx={{
            mb: 2,
            color: primaryContrast,
            fontSize: "1.25rem",
            fontWeight: 500,
            userSelect: "none",
          }}
        >
          Discover your future opportunities.
        </Box>

        {/* Log In Button */}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            color: loginTextColor,
            backgroundColor: getThemeColor("blue", "primary", colorMode, colorMode === "dark" ? 55 : 72),
            transition: "background-color 0.15s ease, box-shadow 0.15s ease",
            "&:hover": {
              backgroundColor: getThemeColor("blue", "primary", colorMode, colorMode === "dark" ? 65 : 68),
              boxShadow: theme.shadows[4],
            },
            textTransform: "none",
          }}
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;