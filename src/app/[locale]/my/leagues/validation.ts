import { zfd } from "zod-form-data";
import { z } from "zod";
import { RatingSystem } from "@/lib/rating";

export const leagueFormSchema = zfd.formData({
  name: zfd.text(z.string()),
  description: zfd.text(z.string().optional()),
  game: zfd.text(z.string()),
  ratingSystem: zfd.text(z.nativeEnum(RatingSystem)),
  defaultRating: zfd.numeric(z.number()),
  ratingSystemParameters: zfd.text(
    z.string().transform(value => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return z.never();
      }
    }),
  ),
});
