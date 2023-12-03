import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/_pages/api/auth/[...nextauth]";
import { ProfileLayout } from "~/components/Layout/ProfileLayout";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { trpc } from "~/utils/trpc";
import {toast} from 'react-toastify';

interface FormValues {
  name: string;
  email: string;
}

const MySettings = () => {
  const { data, update } = useSession();
  const { control, register, handleSubmit } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      name: data?.user?.name || "",
      email: data?.user?.email || "",
    },
  });
  const updateUserMutation = trpc.users.update.useMutation();
  if (!data || !data.user) {
    return null;
  }

  const onSubmit = async (values: FormValues) => {
    updateUserMutation.mutate(values);
    await update(); // TODO
    toast("Profile updated.", {
      type: "success",
    });
  };

  return (
    <>
      <NextSeo title={undefined} />
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(data => onSubmit(data))}
      >
        <Controller
          name={"name"}
          control={control}
          render={({ field }) => (
            <Input
              type="name"
              label="Username"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name={"email"}
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              label="email"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button
          type="submit"
          color="primary"
          isLoading={updateUserMutation.isLoading}
        >
          Save
        </Button>
      </form>
    </>
  );
};

MySettings.getLayout = page => <ProfileLayout>{page}</ProfileLayout>;

export default MySettings;

export const getServerSideProps: GetServerSideProps = async context => {
  // TODO: requires auth

  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
};
