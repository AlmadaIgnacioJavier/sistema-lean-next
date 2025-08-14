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
import { Package } from "lucide-react";
import { useShippingStore } from "../store";

export default function ShippingTypeSelector() {
  const { shippingType, setShippingType, shippingTypes } = useShippingStore();
  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
              shippingType
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Package className="h-3 w-3" />
          </div>
          Tipo de envío
        </Label>
        {shippingType && (
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        )}
      </div>
      <Select value={shippingType} onValueChange={setShippingType}>
        <SelectTrigger
          className={`rounded-xl transition-all w-full text-center md:text-start md:w-auto ${
            shippingType
              ? "border-primary/50 bg-primary/5"
              : "hover:border-primary/30"
          }`}
        >
          <SelectValue placeholder="Seleccioná un tipo" />
        </SelectTrigger>
        <SelectContent>
          {shippingTypes.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}
