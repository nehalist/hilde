import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Card } from "../card";
import Input from "../input";
import { Match } from "@prisma/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingIndicator from "../loading-indicator";
import { toast } from "react-toastify";

interface FormValues {
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  comment: string;
}

const Form = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      team1: "",
      team2: "",
      score1: "",
      score2: "",
      comment: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        team1: yup.string().required(),
        team2: yup.string().required(),
        score1: yup
          .number()
          .min(0)
          .notOneOf([yup.ref("score2")])
          .required(),
        score2: yup
          .number()
          .min(0)
          .notOneOf([yup.ref("score1")])
          .required(),
        comment: yup.string(),
      }),
    ),
    mode: "all",
  });
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.focus();
  }, []);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (values: FormValues) => {
      const response = await fetch("/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      return response.json();
    },
    {
      onSuccess: async res => {
        const cachedQueryData = queryClient.getQueryData<Match[]>(["matches"]);
        queryClient.setQueryData(
          ["matches"],
          [res, ...(cachedQueryData || [])].splice(0, 5),
        );
        reset();
        ref.current?.focus();
        toast("Successfully saved.", {
          type: "success",
        });
      },
      onError: () => {
        toast("Failed to save.", {
          type: "error",
        });
      },
    },
  );

  return (
    <form onSubmit={handleSubmit(values => mutation.mutateAsync(values))}>
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8">
                  <Controller
                    control={control}
                    name="team1"
                    render={({ field }) => (
                      <Input
                        placeholder="gp,rm,..."
                        label="Team 1"
                        value={field.value}
                        onChange={field.onChange}
                        reference={ref}
                      />
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <Controller
                    control={control}
                    name="score1"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="2"
                        label="Score"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 text-center self-center">
              <h3 className="font-bold text-3xl">vs</h3>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8">
                  <Controller
                    control={control}
                    name="team2"
                    render={({ field }) => (
                      <Input
                        placeholder="pt,dl,..."
                        label="Team 2"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <Controller
                    control={control}
                    name="score2"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="3"
                        label="Score"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-6 py-3 flex justify-between">
          <Controller
            control={control}
            name="comment"
            render={({ field }) => (
              <input
                type="text"
                className="border-0 text-sm focus:outline-none"
                placeholder="Comment"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <button
            type="submit"
            className="px-6 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid}
          >
            {mutation.isLoading ? <LoadingIndicator /> : "Save"}
          </button>
        </div>
      </Card>
    </form>
  );
};

export default Form;
