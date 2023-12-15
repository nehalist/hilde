import { zfd } from "zod-form-data";
import { z } from "zod";

export const settingsFormSchema = zfd.formData({
  name: zfd.text(z.string()),
  firstName: zfd.text(z.string().optional()),
  lastName: zfd.text(z.string().optional()),
});

const maxImageSize = 500 * 1024;
const acceptedImageTypes = ["image/png", "image/jpg", "image/jpeg"];

export const imageFormSchema = zfd.formData({
  image: zfd.file(
    z
      .instanceof(File)
      .refine(
        file => acceptedImageTypes.includes(file.type),
        "Invalid file type",
      )
      .refine(file => file.size <= maxImageSize, "Filesize too large")
      .optional(),
  ),
});
