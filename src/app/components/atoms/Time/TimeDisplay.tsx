// Needs to be done on the client side
"use client";
import { useEffect, useState } from "react";

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
    return <span className="title is-2">--:--</span>;
  }
  console.log(dateTimeString);
  const time = dateTimeString.endsWith("Z")
    ? dateTimeString.substring(0, 5)
    : dateTimeString.substring(0, 5);

  console.log(time);
  // Convert to local time if needed
  const date = new Date(`2000-01-01T${time}`);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
