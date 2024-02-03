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
    <NextUINavbar maxWidth="lg" isBordered={true}>
      <NavbarBrand>
        <h1>
          <Link
            href={"/"}
            className="text-3xl font-bold hover:animate-pulse hilde"
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
          <Link color="foreground" href="mailto:hello@hilde.gg">
            {t("navigation.contact")}
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
