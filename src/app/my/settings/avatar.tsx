"use client";

import { updateUserImage } from "@/app/my/settings/actions";
import { ChangeEvent, useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export function Avatar() {
  const { data, update } = useSession();
  const [isPending, startTransaction] = useTransition();
  const ref = useRef<HTMLInputElement>(null);
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement> | null) => {
    startTransaction(async () => {
      if (!e) {
        await updateUserImage(new FormData());
        await update();
        toast("Settings updated!", { type: "success" });
        return;
      }
      if (!e.target.files) {
        return;
      }
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      await updateUserImage(formData);
      await update();
      toast("Settings updated!", { type: "success" });
    });
  };

  if (!data?.user) {
    return null;
  }

  return (
    <div className="flex-1">
      <h3 className="text-base font-semibold leading-6 text-gray-900 mb-1 dark:text-gray-300">
        Picture
      </h3>
      {data?.user && (
        <>
          {data.user.image ? (
            <img
              src={data.user.image || ""}
              alt=""
              className="h-64 w-64 flex-none rounded-lg object-cover mb-1"
            />
          ) : (
            <div className="flex-none rounded-lg object-cover mb-1 italic">
              No image... yet.
            </div>
          )}
        </>
      )}
      <form encType="multipart/form-data">
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          hidden={true}
          ref={ref}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" size="sm">
              Change Avatar
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new" onClick={() => ref.current?.click()}>
              Upload new file
            </DropdownItem>
            <DropdownItem
              key="delete"
              onClick={() => handleImageUpload(null)}
              isDisabled={!data.user.image}
            >
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </form>
    </div>
  );
}
