import React from "react";
import { Outlet } from "react-router-dom";

export default function ParentComponent() {
  return (
    <div>
      {/* This component wraps all nested routes */}
      <Outlet />
    </div>
  );
}
