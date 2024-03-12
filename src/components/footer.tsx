import { Container } from "@/components/container";
import packageJson from "../../package.json";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="border-t border-default-100 mt-12 text-sm leading-5 pt-2 text-default-500 text-right">
          <b>
            <span className="hilde">Hilde</span> v{packageJson.version}
          </b>{" "}
          - by{" "}
          <a href="https://nehalist.io" className="hover:underline">
            nehalist.io
          </a>
        </div>
      </Container>
    </footer>
  );
}
