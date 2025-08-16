"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Colors, COLOR_MAP } from "./types";

export default function ColorPicker({
  value,
  onChange,
}: {
  value: Colors;
  onChange: (c: Colors) => void;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">Elegir color</h4>
      <div className="grid grid-cols-5 gap-3">
        {(Object.keys(Colors) as (keyof typeof Colors)[]).map((k) => {
          const c = Colors[k];
          const { bg, text } = COLOR_MAP[c];
          const selected = value === c;
          return (
            <motion.button
              key={c}
              type="button"
              onClick={() => onChange(c)}
              className={`relative h-10 w-10 rounded-2xl ${bg} ${text} ring-offset-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring/60 hover:scale-105 hover:shadow-lg`}
              aria-label={c}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {selected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-background text-foreground shadow-lg border-2 border-background"
                  >
                    <span className="text-xs">✓</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Seleccioná el color que mejor represente la urgencia
      </p>
    </div>
  );
}
