import { User as UserSchema } from "@/db/schema";
import { User as UserComponent } from "@nextui-org/react";

export function User({ user }: { user: UserSchema }) {
  return (
    <UserComponent
      name={user.name}
      description={<>foo</>}
    />
  );
}
