import { signUp } from "@/app/signup/actions";

export default function SignUpPage() {
  return (
    <form action={signUp}>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="username"
        placeholder="username"
        required
      />
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
        Create Account
      </button>
    </form>
  );
}
