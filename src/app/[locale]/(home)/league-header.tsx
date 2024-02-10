"use client";

import { switchLeagueAction } from "@/app/[locale]/(home)/actions";
import { GameIcon } from "@/components/game-icon";
import { League } from "@/db/schema";
import { Link } from "@/lib/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Spinner,
  User,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { FaChevronDown } from "react-icons/fa";

interface LeagueHeaderProps {
  leagues: League[];
  selectedLeagueId: string | null;
}

export function LeagueHeader({ leagues, selectedLeagueId }: LeagueHeaderProps) {
  const { execute, status } = useAction(switchLeagueAction);
  const t = useTranslations();

  const selectedLeague = leagues.find(league => league.id === selectedLeagueId);
  if (!selectedLeague) {
    return null;
  }

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/matches", label: "Matches" },
    { href: "/teams", label: "Teams" },
    { href: "/leaderboards", label: "Leaderboards" },
  ];

  return (
    <div className="flex items-center gap-10">
      <Dropdown placement="bottom-start" backdrop="blur">
        <DropdownTrigger>
          <Button
            variant="light"
            size="lg"
            className="flex p-2"
            disableRipple={true}
          >
            <User
              avatarProps={{
                isBordered: true,
                showFallback: true,
                fallback: (
                  <>
                    {isExecuting(status) ? (
                      <Spinner size="sm" className="absolute" />
                    ) : (
                      <span className="text-xl">
                        <GameIcon game={selectedLeague.game} />
                      </span>
                    )}
                  </>
                ),
              }}
              className="transition-transform"
              name={selectedLeague.name}
              description={t(`games.${selectedLeague.game}`)}
            />
            <FaChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Leagues"
          variant="flat"
          selectedKeys={selectedLeagueId ? [selectedLeagueId] : []}
          onAction={key => {
            if (key === "settings") {
              return;
            }
            execute({ leagueId: `${key}` });
          }}
        >
          <DropdownSection showDivider={true}>
            {leagues.map(league => (
              <DropdownItem key={league.id}>{league.name}</DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection>
            <DropdownItem key="settings" href="/my/leagues" as={Link}>
              Manage leagues
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <nav>
        <ul className="flex gap-6">
          {links.map(link => (
            <li key={link.href}>
              <Link
                className="font-medium hover:border-b border-green-600"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
