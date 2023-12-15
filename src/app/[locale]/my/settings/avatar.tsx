"use client";

import { updateUserImage } from "@/app/[locale]/my/settings/actions";
import { useEffect, useRef, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export function Avatar() {
  const { data, update } = useSession();
  const uploadButtonRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(updateUserImage, null);

  useEffect(() => {
    if (!state) {
      return;
    }
    switch (state.status) {
      case "success":
        update();
        toast("Profile updated.", {
          type: "success",
        });
        break;
      case "error":
        toast(state.message, {
          type: "error",
        });
    }
  }, [state]);

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
              src={data.user.image}
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
      <form action={formAction} ref={formRef}>
        <input
          type="file"
          name="image"
          onChange={() => formRef.current?.requestSubmit()}
          hidden={true}
          ref={uploadButtonRef}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" size="sm">
              Change Avatar
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="new"
              onClick={() => uploadButtonRef.current?.click()}
            >
              Upload new file
            </DropdownItem>
            <DropdownItem
              key="delete"
              onClick={() => {
                formRef.current?.reset();
                formRef.current?.requestSubmit();
              }}
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
