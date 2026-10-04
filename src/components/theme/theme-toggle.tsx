import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { useTheme } from "next-themes";
import { userAc } from "better-auth/plugins/admin/access";

type Props = {};

const ThemeToggle = (props: Props) => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "dark" && !isDarkMode) {
      useThemeStore.setState({ isDarkMode: true });
    } else if (theme === "light" && isDarkMode) {
      useThemeStore.setState({ isDarkMode: false });
    }
  }, [theme, isDarkMode]);

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleToggleTheme}>
      <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeToggle;
