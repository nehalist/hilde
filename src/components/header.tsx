import {
  Button,
  Link as NextUILink,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link } from "@/lib/navigation";
import { FaGithub } from "react-icons/fa";
import { getCurrentUser } from "@/lib/session";
import { UserHeader } from "@/components/user-header";
import { AnonHeader } from "@/components/anon-header";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";

export async function Header() {
  const user = await getCurrentUser();
  const t = await getTranslations("layout");

  return (
    <NextUINavbar maxWidth="xl" isBordered>
      <NavbarBrand>
        <h1>
          <Link
            href={"/"}
            className="text-3xl font-bold hover:animate-pulse"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #0094d8 -20%, #9fc20a 50%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hilde
          </Link>
        </h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link color="foreground" href="/">
            {t("navigation.home")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            {t("navigation.about")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/blog">
            {t("navigation.blog")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/donate">
            {t("navigation.donate")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LocaleSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            as={NextUILink}
            href="https://github.com/nehalist/hilde"
            className="text-xl"
          >
            <FaGithub />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>{user ? <UserHeader /> : <AnonHeader />}</NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
