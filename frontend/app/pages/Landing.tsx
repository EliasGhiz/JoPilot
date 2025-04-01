import React, { useEffect } from "react";
import { Box, Button, useTheme, Stack } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import ThemeToggle from "app/components/TopBar/ThemeToggle";
import { getThemeColor } from "app/theme/themeColors";
import { useThemeState } from "app/hooks/useThemeState";
import { useAuth0 } from "@auth0/auth0-react";
import JoLogo from "app/components/JoLogo";

const disableAuth = import.meta.env.VITE_DISABLE_AUTH0 === 'true';

const Landing: React.FC = () => {
  const { colorMode, toggleColorMode } = useThemeState();
  const theme = useTheme();
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [logoReady, setLogoReady] = React.useState(false);

  // Set document title to "JoPilot" when landing page mounts
  useEffect(() => {
    document.title = "JoPilot";
  }, []);

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
    if (disableAuth) {
      navigate("/dashboard");
      return;
    } else if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      loginWithRedirect();
    }
  };

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Box
      sx={{
        backgroundColor: getThemeColor("gray", "neutral", colorMode, colorMode === "dark" ? 15 : 90),
        position: "relative",
        height: "100dvh",
      }}
    >
      {/* Theme toggle icon */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 2, // added to ensure the theme toggle is on top
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

      {/* Centered Main Content using MUI Stack */}
      <Stack
        direction="column"
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100dvh",
          opacity: logoReady ? 1 : 0,
          transition: "opacity 2.5s ease",
        }}
      >
        <Box>
          <JoLogo
            style={{
              userSelect: "none",
            }}
            primaryColor={theme.palette.common.white}
            secondaryColor={colorMode === "light" ? textPrimary : theme.palette.common.white}
            onLoad={() => setLogoReady(true)}
          />

          <Box
            sx={{
              color: primaryContrast,
              fontSize: "1.25rem",
              fontWeight: 500,
              userSelect: "none",
            }}
          >
            Discover your future opportunities.
          </Box>
        </Box>

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
      </Stack>
    </Box>
  );
};

export default Landing;