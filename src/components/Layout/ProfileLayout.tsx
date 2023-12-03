import { ReactNode } from "react";
import { Layout } from "./Layout";
import Link from "next/link";

interface ProfileLayoutProps {
  children: ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <Layout>
      <div className="flex w-full">
        <div className="w-64">
          <ul>
            <li>
              <Link href={`/my/settings`}>Settings</Link>
            </li>
            <li>
              <Link href={`/my/teams`}>Teams</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </Layout>
  );
}
