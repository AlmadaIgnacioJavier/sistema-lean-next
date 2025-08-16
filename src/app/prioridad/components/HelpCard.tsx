"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function HelpCard() {
  return (
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
          <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-800/30">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-200 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                  1
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Palabras clave
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  La regla se aplica cuando el <strong>título</strong> contiene
                  cualquiera de las frases definidas.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-green-100 dark:bg-green-950/20 border border-green-300 dark:border-green-800/30">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-green-200 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                  2
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                  Filtro de envío
                </h4>
                <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                  El <strong>tipo de envío</strong> filtra qué pedidos evaluar
                  antes de revisar las palabras clave.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-100 dark:bg-purple-950/20 border border-purple-300 dark:border-purple-800/30 md:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-200 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">
                  3
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                  Etiqueta visual
                </h4>
                <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                  El <strong>texto</strong> y <strong>color</strong> definen la
                  etiqueta de alerta que se muestra.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800/30">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-lg">⚡</span>
            <div>
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
                Ejemplos de uso
              </h4>
              <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                <li>
                  • <strong>"día de la madre"</strong> → Etiqueta roja "Entregar
                  HOY"
                </li>
                <li>
                  • <strong>"urgente", "inmediato"</strong> → Etiqueta naranja
                  "Prioridad alta"
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
  );
}
