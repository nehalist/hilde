import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";
import { useRouter } from "next/router";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "~/components/Layout/ThemeSwitcher";
import { UserHeader } from "~/components/Layout/UserHeader";
import {useSession} from 'next-auth/react';

const NavLink: FunctionComponent<{ label: string; href: string }> = ({
  label,
  href,
}) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={`opacity-50 transition-opacity hover:opacity-100 font-semibold ${
        router.pathname === href ? "opacity-100" : ""
      }`}
    >
      {label}
    </Link>
  );
};

export const Layout: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();

  return (
    <>
      <Navbar maxWidth="xl" isBordered>
        <NavbarBrand>
          <h1
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
          </h1>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarItem>
            <Link color="foreground" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Support
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>github</NavbarItem>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <UserHeader />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {session && (
        <Navbar className="bg-green-700" maxWidth="xl" height="3rem">
          <NavbarContent>team header</NavbarContent>
        </Navbar>
      )}
      <div className="container mx-auto mt-6">{children}</div>
    </>
  );

  // return (
  //
  //   <div className="container max-w-3xl mx-auto mt-20  flex flex-col py-4 px-4">
  //     <div>
  //       <div className="flex justify-between items-center mb-1">
  //         <div className="flex items-end gap-2">
  //           <Link href="/" className="flex items-end gap-1">
  //           </Link>
  //           <SeasonSelector />
  //         </div>
  //         <div>
  //           <ul>
  //             <li className="inline mr-4">
  //               <NavLink label={"Matches"} href={"/matches"} />
  //             </li>
  //             <li className="inline mr-4">
  //               <NavLink label={"Teams"} href={"/teams"} />
  //             </li>
  //             <li className="inline">
  //               <NavLink label={"Leaderboards"} href={"/leaderboards"} />
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //       {children}
  //     </div>
  //     <div className="text-center text-gray-500 text-xs my-8 flex justify-between border-t pt-3 items-center">
  //       <div>
  //         <label className="inline-flex relative items-center cursor-pointer">
  //           <input
  //             type="checkbox"
  //             onClick={() => setTheme(theme !== "dark" ? "dark" : "light")}
  //             className="sr-only peer"
  //             defaultChecked={theme === "light"}
  //           />
  //           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 flex items-center justify-between px-1 text-base">
  //             <MdLightMode />
  //             <MdDarkMode />
  //           </div>
  //         </label>
  //       </div>
  //       <div>
  //         <b>Hilde v{packageJson.version}</b> - by{" "}
  //         <a href="https://nehalist.io" className="hover:underline">
  //           nehalist.io
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Layout;
