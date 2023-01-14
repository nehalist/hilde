import { ReactNode } from "react";

export const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div>
    <nav className="inline">
      <ul>
        <li>Seasons</li>
      </ul>
    </nav>
    <div>{children}</div>
  </div>
);
