"use client";

import { createMatchAction } from "@/app/[locale]/(home)/actions";
import { MatchTeamSelector } from "@/app/[locale]/(home)/match-team-selector";
import { matchCreationSchema } from "@/app/[locale]/(home)/validation";
import { getLeagueTeamsForCurrentUser } from "@/db/model/league";
import { User } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Divider, Input } from "@nextui-org/react";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface MatchCreationFormProps {
  teams: Awaited<ReturnType<typeof getLeagueTeamsForCurrentUser>>;
  user: User;
}

interface FormValues {
  team1: string[];
  score1: string;
  team2: string[];
  score2: string;
  comment: string;
}

export function MatchCreator({ teams, user }: MatchCreationFormProps) {
  const userTeam = teams
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    .find(t => t.userId === user.id);
  const {
    handleSubmit,
    register,
    control,
    reset,
    getValues,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(matchCreationSchema),
    defaultValues: {
      team1: userTeam ? [userTeam.name] : [],
      score1: "",
      team2: [],
      score2: "",
      comment: "",
    },
  });
  const { execute, status } = useAction(createMatchAction, {
    onSuccess: () => {
      toast("Match created", { type: "success" });
      reset();
    },
    onError: () => {
      toast("Failed to create match", { type: "error" });
    },
  });

  return (
    <Card className="overflow-visible">
      <form
        onSubmit={handleSubmit(data =>
          execute({
            team1: data.team1,
            team2: data.team2,
            score1: +data.score1,
            score2: +data.score2,
          }),
        )}
      >
        <CardBody className="overflow-y-visible">
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <div className="grid grid-cols-12 gap-3 items-start">
                <div className="col-span-8">
                  <Controller
                    control={control}
                    name="team1"
                    render={({ field: { onChange, value } }) => (
                      <MatchTeamSelector
                        autoFocus={true}
                        value={value}
                        teams={teams}
                        onChange={onChange}
                        label="Home"
                      />
                    )}
                  />
                </div>
                <div className="col-span-4 flex items-end gap-1">
                  <Input
                    type="number"
                    placeholder="2"
                    label="Score"
                    labelPlacement="outside"
                    {...register("score1")}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 text-center self-center">
              <h3 className="font-bold text-3xl">vs</h3>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-12 gap-3 items-start">
                <div className="col-span-8">
                  <Controller
                    control={control}
                    name="team2"
                    render={({ field: { onChange, value } }) => (
                      <MatchTeamSelector
                        value={value}
                        teams={teams}
                        onChange={onChange}
                        label="Away"
                      />
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    type="number"
                    placeholder="3"
                    label="Score"
                    labelPlacement="outside"
                    {...register("score2")}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <Input
              variant="underlined"
              size="sm"
              placeholder="Comment (Optional)"
              labelPlacement="outside"
              className="w-52"
              {...register("comment")}
            />
            <Button
              type="submit"
              color="primary"
              isLoading={isExecuting(status)}
              isDisabled={!isValid}
            >
              Save
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
