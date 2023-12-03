import { AdminLayout } from "~/components/Layout/AdminLayout";
import { SeasonList } from "~/components/Elements";
import { trpc } from "~/utils/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/Form";
import { seasonAddValidation } from "~/utils/validation";
import { toast } from "react-toastify";

const Seasons = () => {
  const seasons = trpc.seasons.list.useQuery();
  const utils = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<{ number: string }>({
    defaultValues: {
      number: "",
    },
    resolver: zodResolver(seasonAddValidation),
    mode: "all",
  });
  const mutation = trpc.seasons.add.useMutation({
    onSuccess: () => {
      toast("Season added. Don't forget to activate it!", {
        type: "success",
      });
      utils.seasons.invalidate();
      reset();
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-lg font-bold mb-2">Seasons</h1>
      <SeasonList seasons={seasons.data || []} />
      <form
        onSubmit={handleSubmit(values =>
          mutation.mutate({ number: +values.number }),
        )}
      >
        <div className="flex mt-4 dark:bg-gray-700 bg-gray-200 p-3 gap-3 items-center rounded-lg">
          <div className="w-full">
            <Input
              type="number"
              label="New Season"
              placeholder="Numbers only"
              {...register("number")}
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-6 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isValid}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Seasons;
