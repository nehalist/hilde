import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {theme === "light" ? (
        <Button isIconOnly variant="light" onClick={() => setTheme("dark")}>
          <MdLightMode />
        </Button>
      ) : (
        <Button isIconOnly variant="light" onClick={() => setTheme("light")}>
          <MdDarkMode />
        </Button>
      )}
    </div>
  );
}
