import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const disableAuth = import.meta.env.VITE_DISABLE_AUTH0 === "true"; // checking if Auth0 is disabled

  useEffect(() => {
    if (disableAuth) {
      navigate("/");
    } else {
      logout({ logoutParams: { returnTo: window.location.origin } }); // or desired logout redirect
    }
  }, [disableAuth, logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
