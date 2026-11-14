"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pulse.theme");
      const on = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", on);
      setDark(on);
    } catch {}
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("pulse.theme", next ? "dark" : "light"); } catch {}
  }

  return (
    <button onClick={toggle} className="btn btn-quiet" style={{ height: 32, padding: "0 8px" }} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {dark ? <circle cx="8" cy="8" r="3.2" /> : <path d="M13 9.5A5.5 5.5 0 1 1 6.5 3a4.5 4.5 0 0 0 6.5 6.5Z" />}
      </svg>
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
