import { ClientSafeProvider } from "next-auth/react";
import { FaDiscord, FaGithub } from "react-icons/fa";

interface LoginProviderIconProps {
  id: ClientSafeProvider["id"];
  size?: number | string;
}

export function LoginProviderIcon({ id, size }: LoginProviderIconProps) {
  switch (id) {
    case "github":
      return <FaGithub size={size} />;
    case "discord":
      return <FaDiscord size={size} />;
  }

  return null;
}
