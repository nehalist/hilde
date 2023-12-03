"use client";

import { Card, CardBody } from "@nextui-org/card";
import { MatchTeamSelector } from "@/components/match-team-selector";

export function MatchCreationForm() {
  return (
    <Card className="overflow-visible">
      <CardBody className="overflow-y-visible">
        <div className="p-6">
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8">
                  <MatchTeamSelector />
                  {/*<Input*/}
                  {/*  placeholder="gp,rm,..."*/}
                  {/*  label="Team 1"*/}
                  {/*  {...register("team1")}*/}
                  {/*/>*/}
                </div>
                <div className="col-span-4">
                  {/*<Input*/}
                  {/*  type="number"*/}
                  {/*  placeholder="2"*/}
                  {/*  label="Score"*/}
                  {/*  {...register("score1")}*/}
                  {/*/>*/}
                </div>
              </div>
            </div>
            <div className="col-span-2 text-center self-center">
              <h3 className="font-bold text-3xl">vs</h3>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8">
                  {/*<Input*/}
                  {/*  placeholder="pt,dl,..."*/}
                  {/*  label="Team 2"*/}
                  {/*  {...register("team2")}*/}
                  {/*/>*/}
                </div>
                <div className="col-span-4">
                  {/*<Input*/}
                  {/*  type="number"*/}
                  {/*  placeholder="3"*/}
                  {/*  label="Score"*/}
                  {/*  {...register("score2")}*/}
                  {/*/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
