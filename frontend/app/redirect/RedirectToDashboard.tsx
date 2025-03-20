import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectToDashboard() {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);
  return <div>Redirecting to dashboard...</div>;
}
