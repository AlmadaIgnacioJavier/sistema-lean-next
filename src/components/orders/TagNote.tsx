"use client";

import React from "react";
import { COLORS } from "@/lib/constants/colors";

type TagNoteType = {
  color?: string;
  value?: string;
};

interface TagNoteProps {
  tagNote?: TagNoteType;
  className?: string;
}

export default function TagNote({ tagNote, className = "" }: TagNoteProps) {
  if (!tagNote || !tagNote.value) return null;

  const colorKey = tagNote.color as keyof typeof COLORS | undefined;
  const colorProps = colorKey ? COLORS[colorKey] : undefined;
  const bgClass = colorProps?.value ?? "bg-gray-200";
  const textClass = colorProps?.textColor ?? "text-black";

  return (
    <span
      className={`ml-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${bgClass} ${textClass} ${className}`}
    >
      {tagNote.value}
    </span>
  );
}
