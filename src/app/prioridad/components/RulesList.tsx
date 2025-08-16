"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UrgencyRule, Colors, COLOR_MAP, SHIPPING_TYPES } from "./types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import RulePreview from "./RulePreview";
import { Trash2, Edit3 } from "lucide-react";

interface Props {
  rules: UrgencyRule[];
  editRule: (id: string) => void;
  removeRule: (id: string) => void;
  toggleEnable: (id: string, v: boolean) => void;
}

export default function RulesList({
  rules,
  editRule,
  removeRule,
  toggleEnable,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground">Reglas creadas</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {rules.length} {rules.length === 1 ? "regla" : "reglas"}
          </span>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm">
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30">
                <TableHead className="font-semibold">Tipo de envío</TableHead>
                <TableHead className="font-semibold">Palabras clave</TableHead>
                <TableHead className="font-semibold">Etiqueta</TableHead>
                <TableHead className="font-semibold">Color</TableHead>
                <TableHead className="font-semibold">Días vendido</TableHead>
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
                      colSpan={7}
                      className="text-center text-muted-foreground py-12"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-4xl">📝</div>
                        <p className="text-lg font-medium">
                          No hay reglas todavía
                        </p>
                        <p className="text-sm">
                          Creá la primera regla usando el formulario de arriba
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
                      <TableCell className="font-medium">
                        {SHIPPING_TYPES.find((t) => t.value === r.shippingType)
                          ?.label ?? r.shippingType}
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
                        <RulePreview text={r.labelText} color={r.color} />
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
                      <TableCell>
                        <div className="text-sm font-medium">
                          {r.createdDays === 0
                            ? "Hoy"
                            : `${r.createdDays} ${
                                r.createdDays === 1 ? "día" : "días"
                              }`}
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

        <div className="lg:hidden">
          <AnimatePresence>
            {rules.length === 0 ? (
              <div className="text-center text-muted-foreground py-12 px-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl">📝</div>
                  <p className="text-lg font-medium">No hay reglas todavía</p>
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
                      r.enabled ? "hover:border-primary/30" : "opacity-60"
                    }`}
                  >
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

                    <div>
                      <RulePreview text={r.labelText} color={r.color} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          DÍAS DE VENDIDO
                        </p>
                        <p className="text-sm font-medium">
                          {r.createdDays === 0
                            ? "Hoy"
                            : `${r.createdDays} ${
                                r.createdDays === 1 ? "día" : "días"
                              }`}
                        </p>
                      </div>
                    </div>

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
  );
}
