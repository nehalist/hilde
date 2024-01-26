"use client";

import { useEffect, useState } from "react";
import { differenceInHours, format, formatDistance } from "date-fns";
import { useLocale } from "next-intl";

const threshold = 24;

export function TimeDistance({ date }: { date: Date }) {
  const [baseDate, setBaseDate] = useState(new Date());
  const distance = differenceInHours(date, baseDate) * -1;
  const formattedDate = format(date, "dd.LL.yyyy HH:mm");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (distance >= threshold) {
      return;
    }
    const interval = setInterval(() => setBaseDate(new Date()), 60000);
    return () => clearInterval(interval);
  });

  if (!mounted) {
    return null;
  }

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
}
