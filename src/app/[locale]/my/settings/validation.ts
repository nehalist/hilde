import { zfd } from "zod-form-data";
import { z } from "zod";

export const settingsFormSchema = zfd.formData({
  name: zfd.text(z.string()),
  firstName: zfd.text(z.string().optional()),
  lastName: zfd.text(z.string().optional()),
});
