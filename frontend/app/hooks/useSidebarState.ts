import { useState, useEffect } from 'react';

export function useSidebarState() {
  const [open, setOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored === "true"; // default to false if not "true"
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", open.toString());
  }, [open]);

  return { open, setOpen };
}
