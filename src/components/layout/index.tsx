import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";
import { useRouter } from "next/router";

const NavLink: FunctionComponent<{ label: string; href: string }> = ({
  label,
  href,
}) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`opacity-50 transition-opacity hover:opacity-100 font-semibold ${
          router.pathname === href ? "opacity-100" : ""
        }`}
      >
        {label}
      </a>
    </Link>
  );
};

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="container max-w-3xl mx-auto mt-20  flex flex-col py-4 px-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <Link href="/">
            <a>
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
            </a>
          </Link>
          <div>
            <ul>
              <li className="inline mr-4">
                <NavLink label={"Matches"} href={"/matches"}/>
              </li>
              <li className="inline mr-4">
                <NavLink label={"Teams"} href={"/teams"}/>
              </li>
              <li className="inline">
                <NavLink label={"Statistics"} href={"/stats"}/>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
      <div className="text-center text-gray-500 text-xs my-8">
        <p>
          Made because I can.
        </p>
      </div>
    </div>
  );
};

export default Layout;
