import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from "@/lib/constants/shipment";
import { motion, AnimatePresence } from "framer-motion";

import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Seleccionar...",
  disabled,
}: {
  options: Option[];
  selected: string[]; // option values
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const selectedSet = new Set(selected);

  const toggle = (value: string) => {
    const set = new Set(selected);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    onChange(Array.from(set));
  };

  const clearAll = () => onChange([]);

  const selectedLabels = options
    .filter((o) => selectedSet.has(o.value))
    .map((o) => o.label);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            aria-expanded={open}
            className={`w-full bg-muted outline outline-1 outline-slate-400 p-2 shadow justify-between rounded-2xl !min-h-13 !max-h-[20em] ${
              disabled && "opacity-60 cursor-not-allowed"
            }`}
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1 items-center text-left">
              {selectedLabels.length === 0 ? (
                <span className="text-muted-foreground text-sm">
                  {placeholder}
                </span>
              ) : (
                <div className="flex flex-wrap gap-1 w-full">
                  <AnimatePresence>
                    {selectedLabels.map((label) => (
                      <motion.span
                        key={label}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs bg-background"
                      >
                        {label}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[520px] p-0" align="start">
          <Command className="">
            <div className="px-2 pt-2">
              <CommandInput placeholder="Buscar localidad..." />
            </div>
            <CommandEmpty className="p-4">Sin resultados</CommandEmpty>
            <ScrollArea className="h-[260px]">
              <CommandGroup>
                {options.map((opt) => {
                  const isSelected = selectedSet.has(opt.value);
                  return (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => toggle(opt.value)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-background"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span>{opt.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
            <div className="flex items-center justify-between gap-2 p-2 border-t">
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Limpiar
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Listo
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
