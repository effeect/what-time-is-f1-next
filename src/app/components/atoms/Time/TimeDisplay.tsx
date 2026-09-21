"use client";

import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

export default function TimeDisplay({
  dateTimeString,
}: {
  dateTimeString: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span>--:--</span>;
  }

  const date = new Date(dateTimeString);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const tzAbbr = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value ?? "";

  return (
    <>
      {time}{" "}
      <Typography component="span" variant="body1" color="text.disabled">
        {tzAbbr}
      </Typography>
    </>
  );
}
