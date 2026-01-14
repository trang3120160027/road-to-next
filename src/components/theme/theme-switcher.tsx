"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {}, // Empty subscriber
    () => true, // Client-side value
    () => false // Server-side value
  );

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled />;
  }

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="outline"
      size="icon"
    >
      {theme === "light" ? <LucideSun /> : <LucideMoon />}
    </Button>
  );
};

export { ThemeSwitcher };
