import { FunctionComponent, useEffect, useState } from "react";
import { formatDistance } from "date-fns";

const TimeDistance: FunctionComponent<{ date: Date }> = ({ date }) => {
  const [baseDate, setBaseDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setBaseDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      {formatDistance(date, baseDate, {
        addSuffix: true,
      })}
    </>
  );
};

export default TimeDistance;
