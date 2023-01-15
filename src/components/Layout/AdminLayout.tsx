import { ReactNode } from "react";
import { signOut } from "next-auth/react";

export const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <nav className="border-b mb-2 pb-2 border-gray-600 text-right text-sm font-semibold">
      <ul>
        <li>
          <button
            className="py-1 px-2 dark:bg-gray-600 bg-gray-200 rounded"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
    <div>{children}</div>
  </div>
);
