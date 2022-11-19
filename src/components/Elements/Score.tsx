import { FunctionComponent } from "react";

export const Score: FunctionComponent<{ score: number }> = ({score}) => (
  <span className="border rounded p-1 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 font-extralight mr-1">
    {score}
  </span>
);
