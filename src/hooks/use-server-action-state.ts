"use client";

import { ServerActionState } from "@/utils/server-action-helper";
import { useEffect } from "react";
import { useRouter } from "@/lib/navigation";
import { toast } from "react-toastify";

type UseServerActionStateOptions = {
  onSuccess?: (state: ServerActionState) => {
    message?: string;
    redirect?: string;
  };
  onError?: (state: ServerActionState) => {
    message?: string;
  };
};

export function useServerActionState<TData = any>(
  state: ServerActionState<TData> | null,
  options: UseServerActionStateOptions,
) {
  const router = useRouter();

  useEffect(() => {
    if (!state) {
      return;
    }

    switch (state.status) {
      case "success":
        if (options.onSuccess) {
          const { message, redirect } = options.onSuccess(state);
          if (message) {
            toast(message, { type: "success" });
          }
          if (redirect) {
            router.push(redirect);
          }
        }
        router.refresh();
        break;
      case "error":
        if (options.onError) {
          const { message } = options.onError(state);
          if (message) {
            toast(message, { type: "error" });
          }
        }
        break;
    }
  }, [state, options, router]);
}
