"use client";

import { League } from "@/db/schema";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "@/lib/navigation";
import { useFormState } from "react-dom";
import { switchLeagueAction } from "@/app/[locale]/(home)/actions";
import { useRef } from "react";
import { GameIcon } from "@/components/game-icon";
import { useTranslations } from "next-intl";

interface LeagueHeaderProps {
  leagues: League[];
  selectedLeagueId: string | null;
}

export function LeagueHeader({ leagues, selectedLeagueId }: LeagueHeaderProps) {
  const [state, formAction] = useFormState(switchLeagueAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  const leagueIdRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const selectedLeague = leagues.find(league => league.id === selectedLeagueId);
  if (!selectedLeague) {
    return null;
  }

  return (
    <div className="flex mb-3 items-center gap-10">
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
                  <span className="text-xl">
                    <GameIcon game={selectedLeague.game} />
                  </span>
                ),
              }}
              className="transition-transform"
              name={selectedLeague.name}
              description={t(`games.${selectedLeague.game}`)}
            />
            <FaChevronDown />
          </Button>
        </DropdownTrigger>
        <form action={formAction} ref={formRef}>
          <input type="hidden" name="leagueId" ref={leagueIdRef} />
          <DropdownMenu
            aria-label="Leagues"
            variant="flat"
            selectedKeys={selectedLeagueId ? [selectedLeagueId] : []}
            onAction={league => {
              if (!formRef.current || !leagueIdRef.current) {
                return;
              }
              leagueIdRef.current.value = `${league}`;
              formRef.current.requestSubmit();
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
        </form>
      </Dropdown>
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/matches">Matches</Link>
          </li>
          <li>
            <Link href="/teams">Teams</Link>
          </li>
          <li>
            <Link href="/leaderboards">Leaderboards</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
