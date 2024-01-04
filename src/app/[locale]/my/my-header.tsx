"use client";

import { ReactNode } from "react";

interface MyHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

export function MyHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: MyHeaderProps) {
  return (
    <header className="mb-5">
      {breadcrumbs}
      <h2 className="text-3xl font-bold leading-7 sm:tracking-tight mt-1">
        {title}
      </h2>
      <div className="flex items-center">
        <div className="flex-1">{description}</div>
        <div className="text-right w-1/4">{actions}</div>
      </div>
    </header>
  );
}
