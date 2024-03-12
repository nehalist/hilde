"use client";

import { Button } from "@nextui-org/react";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export function LeagueHeaderActions() {
  const t = useTranslations("my");

  return (
    <Button as={Link} href="/my/leagues/create" color="primary">
      {t("leagues.createButtonLabel")}
    </Button>
  );
}
