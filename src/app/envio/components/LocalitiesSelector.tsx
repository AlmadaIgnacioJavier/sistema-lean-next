"use client";

import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ListPlus } from "lucide-react";
import MultiSelect from "./multiSelect";
import { useShippingStore } from "../store";

export default function LocalitiesSelector() {
  const {
    province,
    allLocalities,
    setAllLocalities,
    localityValues,
    setLocalityValues,
    localitiesByProvince: provinceLocalities,
    provinces,
  } = useShippingStore();
  return (
    <motion.div
      className="flex flex-col gap-3 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
              allLocalities || localityValues.length > 0
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <ListPlus className="h-3 w-3" />
          </div>
          Localidades
        </Label>
        <div className="flex items-center gap-3">
          {(allLocalities || localityValues.length > 0) && (
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Label
              htmlFor="all-localities"
              className="cursor-pointer font-medium"
            >
              Todas
            </Label>
            <Switch
              id="all-localities"
              checked={allLocalities}
              onCheckedChange={setAllLocalities}
              disabled={!province}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <MultiSelect
          options={provinceLocalities}
          selected={localityValues}
          onChange={setLocalityValues}
          placeholder={
            province ? "Seleccionar localidades" : "Elegí primero una provincia"
          }
          disabled={allLocalities || !province}
        />

        {/* Province selection hint */}
        {!province && (
          <div className="rounded-lg border border-dashed border-muted-foreground/25 p-3">
            <p className="text-xs text-muted-foreground text-center">
              👆 Primero seleccioná una provincia
            </p>
          </div>
        )}

        {/* All localities indicator */}
        {allLocalities && province && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-lg bg-primary/10 border border-primary/20 p-3"
          >
            <p className="text-xs text-primary font-medium text-center">
              ✨ Todas las localidades de{" "}
              {provinces.find((p) => p.value === province)?.label} están
              incluidas
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
