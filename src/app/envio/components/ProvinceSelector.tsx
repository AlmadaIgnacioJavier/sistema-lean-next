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
import { MapPin } from "lucide-react";
import { useShippingStore } from "../store";

export default function ProvinceSelector() {
  const { province, setProvince, provinces } = useShippingStore();
  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
              province
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <MapPin className="h-3 w-3" />
          </div>
          Provincia
        </Label>
        {province && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
      </div>
      <Select value={province} onValueChange={setProvince}>
        <SelectTrigger
          className={`rounded-xl transition-all w-full md:w-auto  ${
            province
              ? "border-primary/50 bg-primary/5"
              : "hover:border-primary/30"
          }`}
        >
          <SelectValue placeholder="Seleccioná una provincia" />
        </SelectTrigger>
        <SelectContent>
          {provinces.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!province && (
        <p className="text-xs text-muted-foreground">
          Requerido para continuar
        </p>
      )}
    </motion.div>
  );
}
