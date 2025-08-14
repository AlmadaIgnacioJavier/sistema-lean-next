"use client";

import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Truck } from "lucide-react";
import { useShippingStore } from "../store";

export default function CarrierSelector() {
  const { carrier, setCarrier, carriers } = useShippingStore();
  return (
    <motion.div
      className="flex flex-col gap-3 lg:col-span-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
              carrier
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Truck className="h-3 w-3" />
          </div>
          Se enviará por
        </Label>
        {carrier && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
      </div>
      <Select value={carrier} onValueChange={setCarrier}>
        <SelectTrigger
          className={`rounded-xl transition-all w-full md:w-auto ${
            carrier
              ? "border-primary/50 bg-primary/5"
              : "hover:border-primary/30"
          }`}
        >
          <SelectValue placeholder="Seleccioná logística" />
        </SelectTrigger>
        <SelectContent>
          {carriers.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!carrier && (
        <p className="text-xs text-muted-foreground">
          Seleccioná el transportista que manejará estos envíos
        </p>
      )}
    </motion.div>
  );
}
