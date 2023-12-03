"use server";

import { SettingsFormValues } from "@/app/my/settings/form";

export async function handleProfileUpdate(data: SettingsFormValues) {
  // const user = await getUser();
  // if (!user) {
  //   return;
  // }
  // const supabase = await getSupabaseClient();
  // return supabase.auth.updateUser({
  //   data: {
  //     username: data.name,
  //   },
  // });
}

export async function updateUserImage(formData: FormData) {
  // const user = await getUser();
  // if (!user) {
  //   return;
  // }
  // const file = formData.get("avatar") as File;
  // const supabase = await getSupabaseClient();
  // const { error, data } = await supabase.storage
  //   .from("avatars")
  //   .upload(`avatars/${user.id}.${file.name.split(".").pop()}`, file, {
  //     upsert: true,
  //     cacheControl: "3600",
  //   });
  //
  // const { data: avatarUrl } = supabase.storage
  //   .from("avatars")
  //   .getPublicUrl(data?.path!);
  //
  // if (error) {
  //   console.error(error);
  // }
  //
  // return supabase.auth.updateUser({
  //   data: {
  //     avatar_url: avatarUrl.publicUrl,
  //   },
  // });
}
