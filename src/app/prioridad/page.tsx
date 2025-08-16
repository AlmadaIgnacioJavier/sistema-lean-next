"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import TagNote from "@/components/orders/TagNote";
// ————————————————————————————————————————————————
// shadcn/ui
// ————————————————————————————————————————————————
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";

import {
  Plus,
  X,
  Trash2,
  Palette,
  Upload,
  Save,
  Edit3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// ————————————————————————————————————————————————
// Colors — aligned with your /mnt/data/colors.ts enum
// Map each enum name to Tailwind bg & text utilities
// ————————————————————————————————————————————————
export enum Colors {
  Rojo = "Rojo",
  Naranja = "Naranja",
  Amarillo = "Amarillo",
  Verde = "Verde",
  Turquesa = "Turquesa",
  Azul = "Azul",
  Índigo = "Índigo",
  Púrpura = "Púrpura",
  Rosa = "Rosa",
  Gris = "Gris",
}

const COLOR_MAP: Record<Colors, { bg: string; text: string }> = {
  [Colors.Rojo]: { bg: "bg-red-500", text: "text-white" },
  [Colors.Naranja]: { bg: "bg-orange-400", text: "text-black" },
  [Colors.Amarillo]: { bg: "bg-yellow-300", text: "text-black" },
  [Colors.Verde]: { bg: "bg-green-500", text: "text-white" },
  [Colors.Turquesa]: { bg: "bg-teal-400", text: "text-black" },
  [Colors.Azul]: { bg: "bg-blue-500", text: "text-white" },
  [Colors.Índigo]: { bg: "bg-indigo-500", text: "text-white" },
  [Colors.Púrpura]: { bg: "bg-purple-500", text: "text-white" },
  [Colors.Rosa]: { bg: "bg-pink-400", text: "text-black" },
  [Colors.Gris]: { bg: "bg-gray-400", text: "text-black" },
};

// ————————————————————————————————————————————————
// Types
// ————————————————————————————————————————————————
export type ShippingType =
  | "me1" // Mercado Envíos
  | "full"
  | "flex"
  | "correo"
  | "retiro"
  | "moto"
  | "acuerdo";

export interface UrgencyRule {
  id: string;
  shippingType: ShippingType;
  keywords: string[]; // phrases allowed
  labelText: string; // texto del chip/alerta
  color: Colors; // color from enum
  enabled: boolean;
}

// Demo options (edit to your real ones)
const SHIPPING_TYPES: { value: ShippingType; label: string }[] = [
  { value: "me1", label: "Mercado Envíos" },
  { value: "full", label: "ME Full" },
  { value: "flex", label: "ME Flex" },
  { value: "correo", label: "Correo" },
  { value: "retiro", label: "Retiro en tienda" },
  { value: "moto", label: "Moto mensajería" },
  { value: "acuerdo", label: "Acuerdo con comprador" },
];

// ————————————————————————————————————————————————
// PhraseTagInput — admite frases de varias palabras
// Enter / Coma / Pegar multilinea para agregar
// ————————————————————————————————————————————————
function PhraseTagInput({
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
      .split(/\n|,|;|\t/) // soporta varias separaciones
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

// ————————————————————————————————————————————————
// ColorPicker — swatches basados en enum + Tailwind
// ————————————————————————————————————————————————
function ColorPicker({
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

// ————————————————————————————————————————————————
// RulePreview chip — para visualizar el resultado
// ————————————————————————————————————————————————
function RulePreview({ text, color }: { text: string; color: Colors }) {
  const { bg, text: txt } = COLOR_MAP[color];
  return (
    <span
      className={`inline-flex items-center rounded-xl px-3 py-1 text-sm font-medium ${bg} ${txt}`}
    >
      {text || "Texto de alerta"}
    </span>
  );
}

// ————————————————————————————————————————————————
// Main Page
// ————————————————————————————————————————————————
export default function UrgencyRulesPage() {
  const form = useForm<{
    shippingType: ShippingType;
    keywords: string[];
    labelText: string;
    color: Colors;
  }>({
    defaultValues: {
      shippingType: "me1",
      keywords: [],
      labelText: "Prioridad alta",
      color: Colors.Rojo,
    },
  });

  const [rules, setRules] = React.useState<UrgencyRule[]>([]);
  const [editing, setEditing] = React.useState<string | null>(null);

  const values = form.getValues();

  const onSubmit = (data: {
    shippingType: ShippingType;
    keywords: string[];
    labelText: string;
    color: Colors;
  }) => {
    if (!data.keywords.length) {
      toast.error("Agregá al menos una palabra clave", {
        icon: <AlertCircle className="h-4 w-4" />,
      });
      return;
    }
    if (!data.labelText.trim()) {
      toast.error("El texto no puede estar vacío", {
        icon: <AlertCircle className="h-4 w-4" />,
      });
      return;
    }

    if (editing) {
      setRules((prev) =>
        prev.map((r) => (r.id === editing ? { ...r, ...data } : r))
      );
      setEditing(null);
      toast.success("Regla actualizada correctamente", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    } else {
      const newRule: UrgencyRule = {
        id: crypto.randomUUID(),
        shippingType: data.shippingType,
        keywords: data.keywords,
        labelText: data.labelText.trim(),
        color: data.color,
        enabled: true,
      };
      setRules((prev) => [newRule, ...prev]);
      toast.success("Nueva regla creada", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    }
    form.reset({ ...data, keywords: [] });
  };

  const editRule = (id: string) => {
    const r = rules.find((x) => x.id === id);
    if (!r) return;
    setEditing(id);
    form.reset({
      shippingType: r.shippingType,
      keywords: r.keywords,
      labelText: r.labelText,
      color: r.color,
    });
  };

  const removeRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    toast.success("Regla eliminada", {
      icon: <CheckCircle2 className="h-4 w-4" />,
    });
  };

  const toggleEnable = (id: string, v: boolean) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: v } : r))
    );
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(rules, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "urgency-rules.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Archivo exportado correctamente", {
      icon: <CheckCircle2 className="h-4 w-4" />,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-6">
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
              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="rounded-xl h-11 px-6 border-2 hover:border-primary/50 transition-all duration-200"
                  onClick={exportJSON}
                  disabled={rules.length === 0}
                >
                  <Save className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Exportar JSON</span>
                  <span className="sm:hidden">Exportar</span>
                </Button>
              </motion.div>
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
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 rounded-3xl border-2 border-border/50 p-6 lg:p-8 bg-card/50 backdrop-blur-sm"
              >
                {/* Main form fields */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Tipo de envío */}
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
                      <SelectTrigger className="rounded-2xl h-12 border-2 hover:border-primary/50 transition-all duration-200">
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

                  {/* Texto de alerta */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-foreground">
                      Texto de la etiqueta
                    </Label>
                    <Input
                      value={form.watch("labelText")}
                      onChange={(e) =>
                        form.setValue("labelText", e.target.value)
                      }
                      placeholder="Ej: Entregar hoy / Prioridad alta"
                      className="rounded-2xl h-12 border-2 hover:border-primary/50 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  {/* Color */}
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
                </div>

                {/* Palabras clave */}
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
                    cualquiera de las frases. Pegá una lista separada por
                    líneas, comas o punto y coma para cargarlas masivamente.
                  </p>
                </div>

                {/* Preview and actions */}
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
                        tagNote={{
                          value: values.labelText,
                          color: values.color,
                        }}
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
                          <Button
                            type="submit"
                            className="rounded-xl h-11 px-6"
                          >
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
                              !values.keywords.length ||
                              !values.labelText.trim()
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

            <Separator className="my-8" />

            {/* Lista de reglas */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-xl font-bold text-foreground">
                  Reglas creadas
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {rules.length} {rules.length === 1 ? "regla" : "reglas"}
                  </span>
                </div>
              </div>

              {/* Responsive table/cards */}
              <div className="rounded-3xl border-2 border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm">
                {/* Desktop table */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30">
                        <TableHead className="w-16 font-semibold">
                          Estado
                        </TableHead>
                        <TableHead className="font-semibold">
                          Tipo de envío
                        </TableHead>
                        <TableHead className="font-semibold">
                          Palabras clave
                        </TableHead>
                        <TableHead className="font-semibold">
                          Etiqueta
                        </TableHead>
                        <TableHead className="font-semibold">Color</TableHead>
                        <TableHead className="w-32 text-right font-semibold">
                          Acciones
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {rules.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="text-center text-muted-foreground py-12"
                            >
                              <div className="flex flex-col items-center gap-3">
                                <div className="text-4xl">📝</div>
                                <p className="text-lg font-medium">
                                  No hay reglas todavía
                                </p>
                                <p className="text-sm">
                                  Creá la primera regla usando el formulario de
                                  arriba
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          rules.map((r, index) => (
                            <motion.tr
                              key={r.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              transition={{ delay: index * 0.05 }}
                              className={`border-border/30 transition-all duration-200 hover:bg-muted/20 ${
                                r.enabled ? "" : "opacity-60"
                              }`}
                            >
                              <TableCell>
                                <Checkbox
                                  checked={r.enabled}
                                  onCheckedChange={(v) =>
                                    toggleEnable(r.id, Boolean(v))
                                  }
                                  className="rounded-md"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {SHIPPING_TYPES.find(
                                  (t) => t.value === r.shippingType
                                )?.label ?? r.shippingType}
                              </TableCell>
                              <TableCell>
                                <ScrollArea className="max-h-20 w-full">
                                  <div className="flex max-w-[20rem] flex-wrap gap-1.5">
                                    {r.keywords.map((k, i) => (
                                      <Badge
                                        key={`${r.id}-${i}`}
                                        variant="secondary"
                                        className="rounded-xl text-xs"
                                      >
                                        {k}
                                      </Badge>
                                    ))}
                                  </div>
                                </ScrollArea>
                              </TableCell>
                              <TableCell>
                                <RulePreview
                                  text={r.labelText}
                                  color={r.color}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="inline-flex items-center gap-2 text-sm">
                                  <span
                                    className={`h-3 w-3 rounded-full ${
                                      COLOR_MAP[r.color].bg
                                    }`}
                                  />
                                  {r.color}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="inline-flex items-center gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-xl h-8 w-8 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                    onClick={() => editRule(r.id)}
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-xl h-8 w-8 hover:bg-red-100 hover:text-red-600 transition-colors"
                                    onClick={() => removeRule(r.id)}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))
                        )}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {rules.length === 0 ? (
                      <div className="text-center text-muted-foreground py-12 px-6">
                        <div className="flex flex-col items-center gap-3">
                          <div className="text-4xl">📝</div>
                          <p className="text-lg font-medium">
                            No hay reglas todavía
                          </p>
                          <p className="text-sm">
                            Creá la primera regla usando el formulario de arriba
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 space-y-4">
                        {rules.map((r, index) => (
                          <motion.div
                            key={r.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-4 rounded-2xl border-2 border-border/30 bg-card/50 space-y-4 transition-all duration-200 ${
                              r.enabled
                                ? "hover:border-primary/30"
                                : "opacity-60"
                            }`}
                          >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={r.enabled}
                                  onCheckedChange={(v) =>
                                    toggleEnable(r.id, Boolean(v))
                                  }
                                  className="rounded-md"
                                />
                                <div>
                                  <p className="font-semibold text-sm">
                                    {SHIPPING_TYPES.find(
                                      (t) => t.value === r.shippingType
                                    )?.label ?? r.shippingType}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span
                                      className={`h-3 w-3 rounded-full ${
                                        COLOR_MAP[r.color].bg
                                      }`}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                      {r.color}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="rounded-xl h-8 w-8 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                  onClick={() => editRule(r.id)}
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="rounded-xl h-8 w-8 hover:bg-red-100 hover:text-red-600 transition-colors"
                                  onClick={() => removeRule(r.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>

                            {/* Preview */}
                            <div>
                              <RulePreview text={r.labelText} color={r.color} />
                            </div>

                            {/* Keywords */}
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-2">
                                PALABRAS CLAVE
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {r.keywords.map((k, i) => (
                                  <Badge
                                    key={`${r.id}-${i}`}
                                    variant="secondary"
                                    className="rounded-xl text-xs"
                                  >
                                    {k}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ayuda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="rounded-3xl border-2 border-border/30 bg-gradient-to-br from-card to-muted/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Cómo funciona
            </CardTitle>
            <CardDescription>Guía rápida para el equipo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                      1
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      Palabras clave
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                      La regla se aplica cuando el <strong>título</strong>{" "}
                      contiene cualquiera de las frases definidas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                      2
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                      Filtro de envío
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                      El <strong>tipo de envío</strong> filtra qué pedidos
                      evaluar antes de revisar las palabras clave.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/30 md:col-span-2 lg:col-span-1">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">
                      3
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                      Etiqueta visual
                    </h4>
                    <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                      El <strong>texto</strong> y <strong>color</strong> definen
                      la etiqueta de alerta que se muestra.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-lg">⚡</span>
                <div>
                  <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    Ejemplos de uso
                  </h4>
                  <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                    <li>
                      • <strong>"día de la madre"</strong> → Etiqueta roja
                      "Entregar HOY"
                    </li>
                    <li>
                      • <strong>"urgente", "inmediato"</strong> → Etiqueta
                      naranja "Prioridad alta"
                    </li>
                    <li>
                      • <strong>"regalo", "cumpleaños"</strong> → Etiqueta azul
                      "Fecha especial"
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
