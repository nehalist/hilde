import { LoginForm } from "@/app/[locale]/login/form";
import { getProviders } from "next-auth/react";
import { Container } from "@/components/container";

export default async function Login() {
  const providers = await getProviders();

  return (
    <Container>
      <h3 className="text-center text-2xl font-bold leading-8 tracking-tight mt-8 mb-4">
        Sign In
      </h3>
      <LoginForm providers={providers} />
    </Container>
  );
}
