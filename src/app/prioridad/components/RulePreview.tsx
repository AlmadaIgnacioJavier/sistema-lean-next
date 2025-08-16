"use client";

import { COLOR_MAP, Colors } from "./types";

export default function RulePreview({
  text,
  color,
}: {
  text: string;
  color: Colors;
}) {
  const { bg, text: txt } = COLOR_MAP[color];
  return (
    <span
      className={`inline-flex items-center rounded-xl px-3 py-1 text-sm font-medium ${bg} ${txt}`}
    >
      {text || "Texto de alerta"}
    </span>
  );
}
