import { FunctionComponent } from "react";

export const RatingChange: FunctionComponent<{ rating: number }> = ({ rating }) => {
  if (rating > 0) {
    return <span className="text-xs text-green-500">+{rating}</span>;
  } else if (rating < 0) {
    return <span className="text-xs text-red-500">{rating}</span>;
  }
  return null;
};
