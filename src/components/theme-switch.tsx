"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 opacity-0">
        <Sun className="h-4 w-4" />
        <Switch disabled />
        <Moon className="h-4 w-4" />
      </div>
    );
  }

  const isDark = theme === "dark";

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2 group">
      <Sun
        className={`h-4 w-4 transition-all duration-300 ${
          isDark
            ? "text-muted-foreground scale-90"
            : "text-yellow-500 scale-100"
        }`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        className="data-[state=checked]:bg-slate-700 data-[state=unchecked]:bg-yellow-100 border-2 data-[state=checked]:border-slate-600 data-[state=unchecked]:border-yellow-200 transition-all duration-300"
        aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
      />
      <Moon
        className={`h-4 w-4 transition-all duration-300 ${
          isDark ? "text-slate-300 scale-100" : "text-muted-foreground scale-90"
        }`}
      />
    </div>
  );
}
