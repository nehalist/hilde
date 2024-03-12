import { ReactNode } from "react";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/container";

export default function MyLayout({ children }: { children: ReactNode }) {
  const nav = [
    {
      label: "Settings",
      href: "/my/settings",
    },
    {
      label: "Leagues",
      href: "/my/leagues",
    },
  ];

  return (
    <Container>
      <div className="flex w-full gap-5 mt-5">
        <div className="w-64">
          <ul role="list" className="-mx-2 space-y-1">
            {nav.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-900 group flex gap-x-3 rounded-md p-2 pl-3 text-snm leading-6 font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </Container>
  );
}
