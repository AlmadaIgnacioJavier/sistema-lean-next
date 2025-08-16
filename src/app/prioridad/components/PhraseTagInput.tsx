"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function PhraseTagInput({
  value,
  onChange,
  placeholder = "Agregá palabra o frase y presioná Enter",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = React.useState("");

  const addPhrase = (raw: string) => {
    const cleaned = raw.trim();
    if (!cleaned) return;
    if (value.includes(cleaned)) return;
    onChange([...value, cleaned]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input.trim()) {
        addPhrase(input);
        setInput("");
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    if (!text) return;
    const parts = text
      .split(/\n|,|;|\t/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length > 1) {
      e.preventDefault();
      const merged = Array.from(new Set([...value, ...parts]));
      onChange(merged);
    }
  };

  const removeAt = (idx: number) => {
    const copy = [...value];
    copy.splice(idx, 1);
    onChange(copy);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {value.map((v, i) => (
            <motion.div
              key={`${v}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant="secondary"
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/80 hover:to-secondary/60 transition-all duration-200 group"
              >
                <span className="mr-2 text-sm">{v}</span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md hover:bg-muted/60 transition-colors group-hover:bg-red-100 group-hover:text-red-600"
                  onClick={() => removeAt(i)}
                  aria-label={`Eliminar ${v}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="rounded-2xl h-12 border-2 hover:border-primary/50 focus:border-primary transition-all duration-200"
      />
    </div>
  );
}
