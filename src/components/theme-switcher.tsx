"use client";

import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "light" ? (
        <Button
          isIconOnly
          variant="light"
          onClick={() => setTheme("dark")}
          className="text-xl"
        >
          <MdLightMode />
        </Button>
      ) : (
        <Button
          isIconOnly
          variant="light"
          onClick={() => setTheme("light")}
          className="text-xl"
        >
          <MdDarkMode />
        </Button>
      )}
    </div>
  );
}
