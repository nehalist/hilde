"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { MatchTeamSelector } from "@/app/[locale]/(home)/match-team-selector";
import { Button, Divider, Input } from "@nextui-org/react";
import { getLeagueTeamsForCurrentUser } from "@/db/model/league";
import { Controller, useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { createMatchAction } from "@/app/[locale]/(home)/actions";
import { useRef } from "react";

interface MatchCreationFormProps {
  teams: Awaited<ReturnType<typeof getLeagueTeamsForCurrentUser>>;
}

interface FormValues {
  team1: string[];
  score1: string;
  team2: string[];
  score2: string;
  comment: string;
}

export function MatchCreationForm({ teams }: MatchCreationFormProps) {
  const { register, control } = useForm<FormValues>({
    defaultValues: {
      team1: ["dubi"],
      score1: "",
      team2: [],
      score2: "",
      comment: "",
    },
  });
  const [state, formAction] = useFormState(createMatchAction, null);
  const team1Ref = useRef<HTMLInputElement>(null);
  const team2Ref = useRef<HTMLInputElement>(null);

  return (
    <Card className="overflow-visible">
      <form action={formAction}>
        <CardBody className="overflow-y-visible">
          <div className="p-6">
            <div className="grid grid-cols-12">
              <div className="col-span-5">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-8">
                    <input type="hidden" name="team1" ref={team1Ref} />
                    <Controller
                      control={control}
                      name="team1"
                      render={({ field: { onChange } }) => (
                        <MatchTeamSelector
                          autoFocus={true}
                          value={[]} // todo own team
                          teams={teams}
                          onChange={data => {
                            onChange(data);
                            if (!team1Ref.current) {
                              return;
                            }
                            return (team1Ref.current.value = data.join(","));
                          }}
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
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-8">
                    <input type="hidden" name="team2" ref={team2Ref} />
                    <Controller
                      control={control}
                      name="team2"
                      render={({ field: { onChange } }) => (
                        <MatchTeamSelector
                          value={[]}
                          teams={teams}
                          onChange={data => {
                            onChange(data);
                            if (!team2Ref.current) {
                              return;
                            }
                            return (team2Ref.current.value = data.join(","));
                          }}
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
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button type="submit" color="primary">
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
