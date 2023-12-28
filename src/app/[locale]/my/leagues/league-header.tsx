"use client";

import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { Link } from "@/lib/navigation";
import { I18nProps } from "@/types/common";

type LeagueHeaderI18n = {
  description: string;
  createButtonLabel: string;
};

interface LeagueHeaderProps extends I18nProps<LeagueHeaderI18n> {
  canCreateLeagues: boolean;
}

export function LeagueHeader({
  messages,
  canCreateLeagues,
}: LeagueHeaderProps) {
  return (
    <>
      <header className="mb-3">
        <Breadcrumbs>
          <BreadcrumbItem>Leagues</BreadcrumbItem>
        </Breadcrumbs>
        <h2 className="text-3xl font-bold leading-7 sm:tracking-tight mt-1">
          My Leagues
        </h2>
      </header>
      <div className="flex items-center">
        <div className="flex-1">{messages.description}</div>
        <div className="text-right w-1/4">
          <Button
            as={Link}
            href="/my/leagues/create"
            color="primary"
            isDisabled={!canCreateLeagues}
          >
            {messages.createButtonLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
