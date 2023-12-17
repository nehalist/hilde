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
import { ThemeSwitcher } from "@/components/Layout/ThemeSwitcher";
import { getCurrentUser } from "@/lib/session";
import { UserHeader } from "@/components/Layout/UserHeader";
import { AnonHeader } from "@/components/anon-header";

export async function Header() {
  const user = await getCurrentUser();

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
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/blog">
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/support">
            Support
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
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
