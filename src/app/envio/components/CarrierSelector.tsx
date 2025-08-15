"use client";

import { useMemo, useState } from "react";
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
import ModalWraper from "@/components/general/modalWraper";
import LogisticsModal from "./LogisticsModal";
import { LogisticsItem, useLogistics } from "@/hooks/shipping/useLogistics";
import ConfirmDialog from "@/components/general/ConfirmDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Option } from "@/lib/constants/shipment";
import { Separator } from "@/components/ui/separator";

export default function CarrierSelector() {
  const { carrier, setCarrier } = useShippingStore();
  const { createLogistic, logistics, deleteLogistic, loading } = useLogistics();

  const carriers: Option[] = useMemo(() => {
    if (!logistics || !Array.isArray(logistics)) return [];
    return logistics.map((logistic: LogisticsItem) => ({
      value: logistic.id,
      label: logistic.name,
    }));
  }, [logistics]);

  // Hook to create logistics

  // Modal state and form
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      setSaving(true);
      await createLogistic({ name: name.trim() });
      setName("");
      setOpen(false);
    } catch (err) {
      console.error("Error creating logistic:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteLogistic(id);
    } catch (err) {
      console.error("Error deleting logistic:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
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
          <div className="flex items-center gap-2">
            {carrier && <div className="h-2 w-2 rounded-full bg-green-500" />}
            <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
              Gestionar logisticas
            </Button>
          </div>
        </div>

        <Select value={carrier} onValueChange={setCarrier} disabled={loading}>
          <SelectTrigger
            className={`rounded-xl transition-all w-full md:w-auto ${
              carrier
                ? "border-primary/50 bg-primary/5"
                : "hover:border-primary/30"
            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2 text-muted-foreground text-xs">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Cargando logísticas...
              </span>
            ) : (
              <SelectValue placeholder="Seleccioná logística" />
            )}
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

      <LogisticsModal
        open={open}
        setOpen={setOpen}
        name={name}
        setName={setName}
        logistics={logistics}
        deletingId={deletingId}
        onDelete={handleDelete}
        onCreate={handleCreate}
        saving={saving}
      />
    </>
  );
}
