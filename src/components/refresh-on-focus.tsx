"use client";

import { useRouter } from "@/lib/navigation";
import { useEffect } from "react";

export function RefreshOnFocus() {
  const { refresh } = useRouter();

  useEffect(() => {
    const onFocus = () => {
      refresh();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  return null;
}
