"use client";

import React, { useState } from "react";
import { Truck, Info } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PedidoUnificado } from "@/lib/interfaces/order";

interface OrderShippingProps {
  envio?: PedidoUnificado["envio"];
  order: PedidoUnificado;
}

export default function OrderShipping({ envio, order }: OrderShippingProps) {
  const [showAddressPopover, setShowAddressPopover] = useState(false);

  return (
    <div className="flex min-w-[200px] gap-3 items-start">
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-gray-400 dark:text-slate-500" />
          <span className="text-sm text-gray-600 dark:text-slate-400 font-medium">
            Tipo de envío
          </span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-sm text-gray-800 dark:text-slate-200 capitalize max-w-32 block mt-1">
            {envio?.tipo || "Acordar con el cliente"}
          </span>
          {envio?.direccion && (
            <Popover
              open={showAddressPopover}
              onOpenChange={setShowAddressPopover}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Más información de envío"
                  onMouseEnter={() => setShowAddressPopover(true)}
                  onMouseLeave={() => setShowAddressPopover(false)}
                  className="ml-1 p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-slate-200"
                >
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                onMouseEnter={() => setShowAddressPopover(true)}
                onMouseLeave={() => setShowAddressPopover(false)}
                className="w-64"
              >
                <div className="text-sm text-gray-700 dark:text-slate-200">
                  <div className="font-semibold">Dirección de entrega</div>
                  <div className="mt-1 break-words">
                    {envio.direccion}
                    {envio.localidad && <span>, {envio.localidad}</span>}
                    {envio.codigoPostal && (
                      <span>, CP {envio.codigoPostal}</span>
                    )}
                    {envio.provincia && <span>, {envio.provincia}</span>}
                  </div>
                  <div className="mt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        [
                          envio.direccion,
                          envio.localidad,
                          envio.codigoPostal
                            ? `CP ${envio.codigoPostal}`
                            : null,
                          envio.provincia,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline text-xs hover:text-blue-800"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {order.logisticaAsignada && order.logisticaAsignada.length > 0 && (
          <div className="flex items-center gap-2 mt-2 bg-blue-50 dark:bg-blue-950 rounded px-2 py-1">
            <Truck className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
              {order.logisticaAsignada}
            </span>
            {order.logisticaAsignadaManualmente ? (
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 border border-green-300 dark:border-green-700 font-semibold shadow-sm">
                Asignado manualmente
              </span>
            ) : (
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700 font-semibold shadow-sm">
                Asignado automáticamente
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
