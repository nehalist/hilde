"use client";

import { Card, CardBody } from "@nextui-org/card";
import { getProviders, signIn } from "next-auth/react";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { LoginProviderIcon } from "@/components/login-provider-icon";
import { useSearchParams } from "next/navigation";

interface LoginProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export function Login({ providers }: LoginProps) {
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();

  return (
    <>
      <h3 className="text-center text-2xl font-bold leading-8 tracking-tight mb-5">
        Sign In
      </h3>
      <Card>
        <CardBody className="p-6">
          {searchParams.get("login") === "verify-request" ? (
            <p className="text-sm leading-6 text-gray-500 mx-auto">
              Alright! Check your email for your sign in link.
            </p>
          ) : (
            <>
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
                      autoFocus={true}
                    />
                  </label>
                  <Button type="submit" color="primary" fullWidth={true}>
                    Sign in with Email
                  </Button>
                  <p className="text-sm leading-6 text-gray-500 mx-auto">
                    No password required. You&apos;ll receive an email with a
                    sign in link.
                  </p>
                </div>
              </form>

              {providers && (
                <>
                  <div>
                    <div className="relative my-7">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-default-200" />
                      </div>
                      <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white dark:bg-default-50 px-6 text-default-200">
                          Or continue with
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(providers)
                      .filter(p => !["email"].includes(p.id))
                      .map(provider => (
                        <div key={provider.name}>
                          <Button
                            variant="bordered"
                            fullWidth={true}
                            onClick={() => signIn(provider.id)}
                          >
                            <LoginProviderIcon id={provider.id} size="21" />{" "}
                            {provider.name}
                          </Button>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
}
