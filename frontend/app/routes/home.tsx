import { Navigate } from "react-router-dom";

export function meta() {
  return [
    { title: "Dashboard" },
    { name: "JoPilot", content: "JoPilot Dashboard" },
  ];
}

export default function Home() {
  return <Navigate to="/dashboard" replace />;
}
