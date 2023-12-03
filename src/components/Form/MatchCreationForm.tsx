import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "~/utils/trpc";
import { toast } from "react-toastify";
import { LoadingIndicator } from "~/components/Elements";
import { matchAddValidation } from "~/utils/validation";
import { useStore } from "~/utils/store";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

interface FormValues {
  team1: string;
  team2: string;
  score1: number | string;
  score2: number | string;
  comment: string;
}

export const MatchCreationForm = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { isValid },
    setFocus,
  } = useForm<FormValues>({
    defaultValues: {
      team1: "",
      team2: "",
      score1: "",
      score2: "",
      comment: "",
    },
    resolver: zodResolver(matchAddValidation),
    mode: "all",
  });

  const utils = trpc.useContext();
  const mutation = trpc.matches.add.useMutation({
    onSuccess: async () => {
      await utils.matches.invalidate();
      toast("Match saved.", {
        type: "success",
      });
      setFocus("team1");
      reset();
    },
    onError: err => {
      toast(`Error: ${err.message}`, {
        type: "error",
      });
    },
  });

  return (
    <Card>
      <CardHeader>Foo</CardHeader>
      <Divider />
      <CardBody>hello there</CardBody>
    </Card>
    // <form
    //   onSubmit={handleSubmit(values =>
    //     mutation.mutate({
    //       ...values,
    //       score1: +values.score1,
    //       score2: +values.score2,
    //     }),
    //   )}
    // >
    //   <Card>
    //     <div className="px-6 py-3 flex justify-between border-t dark:border-gray-500">
    //       <input
    //         type="text"
    //         className="border-0 text-sm focus:outline-none bg-transparent"
    //         placeholder="Comment"
    //         {...register("comment")}
    //       />
    //       {seasons.data?.find(s => s.current)?.number === selectedSeason ? (
    //         <button
    //           type="submit"
    //           className="px-6 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
    //           disabled={!isValid}
    //         >
    //           {mutation.isLoading ? <LoadingIndicator /> : "Save"}
    //         </button>
    //       ) : (
    //         <span className="text-sm text-red-500">Season is over!</span>
    //       )}
    //     </div>
    //   </Card>
    // </form>
  );
};
