"use client";

import { Container } from "@/components/container";
import { Card, CardBody } from "@nextui-org/card";
import { LoginForm } from "@/app/[locale]/login/form";

export default async function Login() {
  return (
    <Container>
      <div className="max-w-xl mx-auto my-24">
        <header className="mb-6 text-center">
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            ... and say goodbye to Spreadsheets and paper score sheets!
          </p>
        </header>
        <Card className="text-center py-8 px-4">
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
