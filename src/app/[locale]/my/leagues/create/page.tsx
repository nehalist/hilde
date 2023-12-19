"use client";

import { CreateLeagueForm } from "@/app/[locale]/my/leagues/form";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Link } from "@/lib/navigation";

export default function CreateLeague() {
  return (
    <>
      <header className="mb-5">
        <Breadcrumbs>
          <BreadcrumbItem>Leagues</BreadcrumbItem>
          <BreadcrumbItem>Create League</BreadcrumbItem>
        </Breadcrumbs>
        <h2 className="text-3xl font-bold leading-7 sm:tracking-tight">
          Create League
        </h2>
      </header>
      <CreateLeagueForm />
    </>
  );
}
