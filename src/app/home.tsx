import { TeamHeader } from "@/components/Layout/TeamHeader";
import { MatchCreationForm } from "@/components/match-creation-form";

export async function Home() {
  // const supabase = createClient(cookieStore);
  // const { data: matches } = await supabase.from("matches").select();
  return (
    <>
      <TeamHeader />
      <MatchCreationForm />
    </>
  );
}
