"use client";

import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { COLORS } from "@/lib/constants/colors";
import type { Alert as PedidoAlerta } from "@/lib/interfaces/order";

interface AlertListProps {
  alertas?: PedidoAlerta[];
}

export default function AlertList({ alertas }: AlertListProps) {
  if (!alertas || alertas.length === 0) return null;

  const getAlertColor = (colorName: string) => {
    const colorConfig = COLORS[colorName as keyof typeof COLORS];
    return colorConfig ? colorConfig.value : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full md:col-span-full mt-4 space-y-2">
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {alertas.map((alerta, index) => (
          <div key={alerta.id ?? index} className="relative group">
            <Alert
              className={`${getAlertColor(
                alerta.color
              )} border-0 shadow-sm w-fit-content flex items-center gap-2`}
            >
              <AlertTriangle
                className={`h-5 w-5 flex justify-center items-center mb-1 h-full !${
                  COLORS[alerta.color]?.textColor
                }`}
              />
              <AlertDescription
                className={`text-sm font-medium ${
                  COLORS[alerta.color]?.textColor
                }`}
              >
                {alerta.text}
              </AlertDescription>
            </Alert>
          </div>
        ))}
      </div>
    </div>
  );
}
