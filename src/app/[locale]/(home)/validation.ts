import { z } from "zod";

export const matchCreationSchema = z
  .object({
    team1: z.array(z.string()).transform(v => v.sort()),
    team2: z.array(z.string()).transform(v => v.sort()),
    score1: z.preprocess(
      v => (v !== "" ? Number(v) : undefined),
      z.number().min(0),
    ),
    score2: z.preprocess(
      v => (v !== "" ? Number(v) : undefined),
      z.number().min(0),
    ),
    comment: z.string().optional(),
  })
  .refine(schema => {
    return (
      schema.team1.filter(value => schema.team2.includes(value)).length === 0
    );
  });
