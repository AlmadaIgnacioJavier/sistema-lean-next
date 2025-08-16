"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-hot-toast";

import TagNote from "@/components/orders/TagNote";
import PhraseTagInput from "./PhraseTagInput";
import ColorPicker from "./ColorPicker";
import {
  Colors,
  COLOR_MAP,
  ShippingType,
  SHIPPING_TYPES,
  UrgencyRule,
} from "./types";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Palette,
  Save,
  Edit3,
  Plus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

type FormShape = {
  shippingType: ShippingType;
  keywords: string[];
  labelText: string;
  color: Colors;
  createdDays: number;
};

interface Props {
  form: UseFormReturn<FormShape>;
  editing: string | null;
  setEditing: (id: string | null) => void;
  onSubmit: (data: FormShape) => void;
  rules: UrgencyRule[];
}

export default function UrgencyForm({
  form,
  editing,
  setEditing,
  onSubmit,
  rules,
}: Props) {
  const values = form.getValues();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Reglas de urgencia de pedidos
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground max-w-2xl">
                Definí etiquetas de alerta según el tipo de envío y palabras
                clave del título de la publicación.
              </CardDescription>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>{rules.filter((r) => r.enabled).length} activas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-gray-400" />
              <span>{rules.filter((r) => !r.enabled).length} inactivas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>{rules.length} total</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 rounded-3xl border-2 border-border/50 p-6 lg:p-8 bg-card/50 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">
                    Tipo de envío
                  </Label>
                  <Select
                    value={form.watch("shippingType")}
                    onValueChange={(v: ShippingType) =>
                      form.setValue("shippingType", v)
                    }
                  >
                    <SelectTrigger className="rounded-2xl h-12 border-2 hover:border-primary/50 transition-all duration-200 ">
                      <SelectValue placeholder="Seleccioná un tipo" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {SHIPPING_TYPES.map((t) => (
                        <SelectItem
                          key={t.value}
                          value={t.value}
                          className="rounded-lg"
                        >
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">
                    Texto de la etiqueta
                  </Label>
                  <Input
                    value={form.watch("labelText")}
                    onChange={(e) => form.setValue("labelText", e.target.value)}
                    placeholder="Ej: Entregar hoy / Prioridad alta"
                    className="rounded-2xl h-12 border-2 hover:border-primary/50 focus:border-primary transition-all duration-200"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Palette className="h-4 w-4" /> Color
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="justify-between rounded-2xl h-12 border-2 hover:border-primary/50 transition-all duration-200 w-full"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span
                            className={`h-4 w-4 rounded-full ${
                              COLOR_MAP[form.watch("color")].bg
                            }`}
                          />
                          {form.watch("color")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Cambiar
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 rounded-2xl" align="end">
                      <div className="p-2">
                        <ColorPicker
                          value={form.watch("color")}
                          onChange={(c) => form.setValue("color", c)}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground">
                    Días de haberse vendido
                  </Label>
                  <Select
                    value={form.watch("createdDays").toString()}
                    onValueChange={(v) =>
                      form.setValue("createdDays", parseInt(v))
                    }
                  >
                    <SelectTrigger className="rounded-2xl h-12 border-2 hover:border-primary/50 transition-all duration-200">
                      <SelectValue placeholder="Seleccioná los días" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((days) => (
                        <SelectItem
                          key={days}
                          value={days.toString()}
                          className="rounded-lg"
                        >
                          {days === 0
                            ? "Hoy"
                            : `${days} ${days === 1 ? "día" : "días"}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-semibold text-foreground">
                  Palabras clave del título
                  <span className="text-xs text-muted-foreground font-normal ml-2">
                    (podés usar frases completas)
                  </span>
                </Label>
                <PhraseTagInput
                  value={form.watch("keywords")}
                  onChange={(arr) => form.setValue("keywords", arr)}
                />
                <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/30">
                  💡 <strong>Tip:</strong> Coinciden si el título contiene
                  cualquiera de las frases. Pegá una lista separada por líneas,
                  comas o punto y coma para cargarlas masivamente.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-4 border-t border-border/30">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Previsualización:
                  </span>
                  <motion.div
                    key={`${values.labelText}-${values.color}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TagNote
                      tagNote={{ value: values.labelText, color: values.color }}
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <AnimatePresence mode="wait">
                    {editing ? (
                      <motion.div
                        key="editing"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col sm:flex-row gap-2"
                      >
                        <Button type="submit" className="rounded-xl h-11 px-6">
                          <Edit3 className="h-4 w-4 mr-2" /> Guardar cambios
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-xl h-11 px-6"
                          onClick={() => {
                            setEditing(null);
                            form.reset();
                          }}
                        >
                          Cancelar
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="adding"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <Button
                          type="submit"
                          className="rounded-xl h-11 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                          disabled={
                            !values.keywords.length || !values.labelText.trim()
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" /> Agregar regla
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
