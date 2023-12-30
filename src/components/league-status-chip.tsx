"use client";

import { Chip } from "@nextui-org/react";
import { leagueStatusEnum } from "@/db/schema";

export function LeagueStatusChip({
  status,
}: {
  status: typeof leagueStatusEnum.enumValues[number] | null;
}) {
  if (!status) {
    return null;
  }
  return (
    <Chip color={status === "active" ? "success" : "default"}>{status}</Chip>
  );
}
