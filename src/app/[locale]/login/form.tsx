import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      method="post"
      action="/api/auth/signin/email"
      onSubmit={() => signIn("email", { email })}
    >
      <div className="flex flex-col gap-3">
        <label>
          <Input
            label="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <Button type="submit" color="primary" fullWidth={true}>
          Sign in with Email
        </Button>
        <p className="text-sm leading-6 text-gray-500 mx-auto">
          No password required. You&apos;ll receive an email with a sign in
          link.
        </p>
      </div>
    </form>
  );
}
