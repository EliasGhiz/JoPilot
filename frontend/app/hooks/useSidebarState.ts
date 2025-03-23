// useSidebarState.ts – Manages the sidebar's expanded/collapsed state with local storage persistence.

import { useEffect, useState } from "react";

// Sidebar state in local storage
const SIDEBAR_STATE_KEY = 'jopilot-sidebar-open';

export function useSidebarState() {
  // Initialize with stored preference or default to true (open)
  const [open, setOpen] = useState(() => {
    const storedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return storedState === null ? true : storedState === 'true';
  });

  // Save preference when change
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, String(open));
  }, [open]);

  return { open, setOpen };
}
