import { z } from "zod";

function normalizeTeamName(name: string) {
  return name
    .split(",")
    .map(t => t.toLowerCase().trim())
    .sort()
    .join(",")
    .trim();
}

export const matchAddValidation = z.object({
  team1: z.string().min(2).transform(normalizeTeamName),
  team2: z.string().min(2).transform(normalizeTeamName),
  score1: z.preprocess(
    v => (v !== "" ? Number(v) : undefined),
    z.number().min(0),
  ),
  score2: z.preprocess(
    v => (v !== "" ? Number(v) : undefined),
    z.number().min(0),
  ),
  comment: z.string().optional().default(""),
});
