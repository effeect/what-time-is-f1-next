"use client";

// MUI Button that navigates with Next.js client-side routing
import NextLink from "next/link";
import Button, { ButtonProps } from "@mui/material/Button";

export default function LinkButton({
  href,
  ...props
}: ButtonProps & { href: string }) {
  return <Button component={NextLink} href={href} {...props} />;
}
