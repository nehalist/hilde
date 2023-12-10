"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  //
  // const { data, error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     data: { username },
  //   },
  // });
  //
  // if (error) {
  //   console.error(error);
  //   return redirect(`/signup?error=${error.message}`);
  // }

  return redirect(`/`);
}
