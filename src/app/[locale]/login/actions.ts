"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  // const password = formData.get("password") as string;
  const cookieStore = cookies();

  // const { data, error } = await supabase.auth.signInWithOtp({
  //   email,
  //   options: {
  //     emailRedirectTo: "http://localhost:3000/auth/callback",
  //   },
  // });
  //
  // if (error) {
  //   console.error(error);
  //   return redirect(`/login`);
  // }

  return redirect(`/`);
}

export async function signOut() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  //
  // await supabase.auth.signOut();

  return redirect(`/`);
}
