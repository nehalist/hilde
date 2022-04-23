import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <div className="container max-w-3xl mx-auto mt-20  flex flex-col py-4">
    <div>
      <div className="flex justify-between mb-1">
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
              <Link href="/matches">
                <a className="hover:underline">History</a>
              </Link>
            </li>
            <li className="inline">
              <Link href="/stats">
                <a className="hover:underline">Statistics</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  </div>
);

export default Layout;
