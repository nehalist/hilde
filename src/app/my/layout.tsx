import { ReactNode } from "react";
import Link from "next/link";

export default function MyLayout({ children }: { children: ReactNode }) {
  return (
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
  );
}
