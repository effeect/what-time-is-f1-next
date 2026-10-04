"use client";

import Box from "@mui/material/Box";

// Hides itself on load failure, so a mapped-but-not-yet-downloaded circuit
// degrades silently instead of showing a broken image.
export default function TrackMapImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        maxWidth: "100%",
        width: 320,
        height: "auto",
        mx: "auto",
        display: "block",
      }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
