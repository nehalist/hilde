"use client";

import { Controller, useForm } from "react-hook-form";
import {
  handleProfileUpdate,
  updateUserImage,
} from "@/app/my/settings/actions";
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, useTransition } from "react";
import { toast } from "react-toastify";

export interface SettingsFormValues {
  name: string;
  email: string;
}

export function SettingsForm() {
  // const [isPending, startTransaction] = useTransition();
  // const { control, handleSubmit } = useForm<SettingsFormValues>({
  //   mode: "all",
  //   defaultValues: {
  //     name: user.user_metadata.username || "",
  //     email: user.email || "",
  //   },
  // });
  //
  // const onSubmit = async (values: SettingsFormValues) => {
  //   startTransaction(async () => {
  //     await handleProfileUpdate(values);
  //     // await update();
  //     toast("Settings updated!", { type: "success" });
  //   });
  // };
  //
  // const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  //   startTransaction(async () => {
  //     if (!e.target.files) {
  //       return;
  //     }
  //     const formData = new FormData();
  //     formData.append("avatar", e.target.files[0]);
  //     await updateUserImage(formData);
  //     // await update();
  //     toast("Settings updated!", { type: "success" });
  //   });
  // };
  //
  // return (
  //   <div className="flex gap-5">
  //     <form
  //       className="flex flex-col gap-3 w-4/6"
  //       onSubmit={handleSubmit(data => onSubmit(data))}
  //     >
  //       <Controller
  //         name={"name"}
  //         control={control}
  //         render={({ field }) => (
  //           <Input
  //             type="name"
  //             label="Username"
  //             value={field.value}
  //             onChange={field.onChange}
  //           />
  //         )}
  //       />
  //       <Controller
  //         name={"email"}
  //         control={control}
  //         render={({ field }) => (
  //           <Input
  //             type="email"
  //             label="email"
  //             value={field.value}
  //             onChange={field.onChange}
  //           />
  //         )}
  //       />
  //       <Button type="submit" color="primary" isLoading={isPending}>
  //         Save
  //       </Button>
  //     </form>
  //     <div>
  //       <img src={user.user_metadata.avatar_url} />
  //       <form encType="multipart/form-data">
  //         <input type="file" name="image" onChange={handleImageUpload} />
  //       </form>
  //     </div>
  //   </div>
  // );
  return <>settings form</>
}
