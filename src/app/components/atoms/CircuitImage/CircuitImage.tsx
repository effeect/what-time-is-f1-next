"use client";
import { useState } from "react";
import styles from "./CircuitImage.module.css";

const PLACEHOLDER = "/images/circuits/placeholder.svg";

export default function CircuitImage({
  circuitId,
  circuitName,
}: {
  circuitId: string;
  circuitName: string;
}) {
  const [src, setSrc] = useState(`/images/circuits/${circuitId}.png`);
  return (
    <img
      src={src}
      alt={`${circuitName} track layout`}
      onError={() => {
        if (src !== PLACEHOLDER) setSrc(PLACEHOLDER);
      }}
      className={styles.image}
    />
  );
}
