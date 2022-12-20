import { FunctionComponent, useEffect, useState } from "react";
import { differenceInHours, format, formatDistance } from "date-fns";

const threshold = 24;

export const TimeDistance: FunctionComponent<{ date: Date }> = ({ date }) => {
  const [baseDate, setBaseDate] = useState(new Date());
  const distance = differenceInHours(date, baseDate) * -1;
  const formattedDate = format(date, "dd.LL.yyyy HH:mm");

  useEffect(() => {
    if (distance >= threshold) {
      return;
    }
    const interval = setInterval(() => setBaseDate(new Date()), 60000);
    return () => clearInterval(interval);
  });

  if (distance >= threshold) {
    return <time dateTime={formattedDate}>{formattedDate}</time>;
  }

  return (
    <time dateTime={formattedDate}>
      {formatDistance(date, baseDate, {
        addSuffix: true,
      })}
    </time>
  );
};
