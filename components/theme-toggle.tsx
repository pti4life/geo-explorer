"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      className="font-bold"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-6 w-6 mr-2 dark:hidden" />
      <Moon className="h-6 w-6 mr-2 hidden dark:block" />
      <span className="dark:hidden">Light Mode</span>
      <span className="hidden dark:block">Dark Mode</span>
    </Button>
  );
}
