import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerificationRequestProps {
  url: string;
}

function VerificationRequest({ url }: VerificationRequestProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>TODO: Preview text</Preview>
      <Tailwind>
        <Body className="bg-gray-100 my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-200 my-[40px] mx-auto bg-white p-16 rounded-xl">
            <Text>Hello there,</Text>
            <Text>
              here's your link to safely sign in to your <Link href={url}>hilde.gg</Link>{" "}
              account:
            </Text>
            <Button
              href={url}
              className="bg-green-600 py-3 px-6 text-white font-bold rounded"
            >
              Sign in
            </Button>
            <Text>
              Or paste this link into your browser: <Link>{url}</Link>
            </Text>
            <Hr />
            <Text className="text-gray-400 text-xs">
              This email was automatically generated. If you did not request
              this email you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default VerificationRequest;
