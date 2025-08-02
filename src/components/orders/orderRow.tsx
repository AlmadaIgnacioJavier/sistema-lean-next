"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  EllipsisVertical,
  Pencil,
  Tag,
  BellRing,
  MessageCircle,
  Truck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PRODUCT_STATE, statusColors } from "@/lib/constants";
import { removeAllWindows, showWindowAlert } from "@/lib/utils/general";
import { changeState } from "@/lib/utils/firebase";
import NoteGenerator from "./alertGenerator";
import { PedidoUnificado } from "@/lib/interfaces/order";

interface OrderRowProps {
  order: PedidoUnificado;
}

export function OrderRow({ order }: OrderRowProps) {
  const { cliente, productos, estado, envio, date } = order;

  const [modalOpen, setModalOpen] = useState(false);

  const formattedDate = new Date(date).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const extraActions = [
    {
      label: "Modificar envío",
      icon: <Pencil className="h-4 w-4 text-blue-500" />,
      onClick: () => alert("Modificar tipo de envío"),
    },
    {
      label: "Alerta",
      icon: <BellRing className="h-4 w-4 text-red-500" />,
      onClick: () => setModalOpen(true),
    },
    {
      label: "Nota",
      icon: <MessageCircle className="h-4 w-4 text-green-500" />,
      onClick: () => alert("Agregar nota"),
    },
  ];

  const stateActions = Object.values(PRODUCT_STATE).map((state) => ({
    label: state,
    icon: <Tag className="h-4 w-4 text-blue-500" />,
    onClick: async () => {
      showWindowAlert({
        title: "Cambiando estado",
        text: "Cambiando estado del pedido",
        timeout: 0,
        loader: true,
      });
      await changeState(order.id, state);
      removeAllWindows();
    },
  }));

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 flex flex-wrap md:flex-nowrap md:items-center md:justify-between gap-4 relative">
      {/* Producto y cliente */}
      <div className="flex items-center gap-4 flex-1 min-w-full md:min-w-0">
        <div className="truncate">
          <h3 className="font-semibold text-gray-800 dark:text-slate-200 truncate pr-6 md:pr-0">
            {productos[0].titulo} (x{productos[0].cantidad})
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {cliente.nombre}
          </p>
        </div>
      </div>

      {/* Envío */}
      <div className="flex items-center gap-3 min-w-[160px]">
        <Truck className="h-5 w-5 text-gray-400 dark:text-slate-500" />
        <div>
          <p className="text-sm text-gray-600 dark:text-slate-400 font-medium">
            Tipo de envío
          </p>
          <p className="text-sm text-gray-800 dark:text-slate-200 capitalize max-w-24">
            {envio?.tipo || "Acordar con el cliente"}
          </p>
        </div>
      </div>

      {/* Estado */}
      <div className="flex items-center min-w-[120px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge
              className={`capitalize text-white font-medium px-3 ${
                statusColors[estado || PRODUCT_STATE.SIN_ARMAR]
              }`}
            >
              {estado || PRODUCT_STATE.SIN_ARMAR}
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {stateActions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={action.onClick}>
                {action.icon}
                <span className="ml-2">{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Fecha */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <CalendarDays className="h-5 w-5 text-gray-400 dark:text-slate-500" />
        <div>
          <p className="text-sm text-gray-600 dark:text-slate-400 font-medium">
            Última actualización
          </p>
          <p className="text-sm text-gray-800 dark:text-slate-200 max-w-24">
            {formattedDate} hs
          </p>
        </div>
      </div>

      {/* Menú de acciones */}
      <div className="absolute top-3 right-3 md:relative md:top-auto md:right-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="h-5 w-5 text-gray-600 dark:text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {extraActions.map((action, index) => (
              <DropdownMenuItem key={index} onClick={action.onClick}>
                {action.icon}
                <span className="ml-2">{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Modal para alerta */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-7xl !p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Agregar alerta</DialogTitle>
          </DialogHeader>
          <NoteGenerator order={order} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
