"use client";

import { useEffect, useState } from "react";

export default function DateDisplay({
  dateTimeString,
}: {
  dateTimeString: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span>--</span>;
  }

  const date = new Date(dateTimeString);
  return (
    <>
      {date.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "short",
      })}
    </>
  );
}
