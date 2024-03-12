import { RatingSystem } from "@/lib/rating";
import { z } from "zod";

export const createLeagueFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  game: z.string(),
  ratingSystem: z.nativeEnum(RatingSystem),
  defaultRating: z.coerce.number().gt(0),
  ratingSystemParameters: z.record(z.any()),
});

export const updateLeagueFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  game: z.string(),
  leagueId: z.string(),
});
