import { zfd } from "zod-form-data";
import { z } from "zod";

export const leagueFormSchema = zfd.formData({
  name: zfd.text(z.string()),
  description: zfd.text(z.string().optional()),
  image: zfd.file(z.instanceof(File).optional()),
});
