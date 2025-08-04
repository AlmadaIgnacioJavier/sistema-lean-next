"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CalendarDays,
  EllipsisVertical,
  Pencil,
  Tag,
  BellRing,
  MessageCircle,
  Truck,
  AlertTriangle,
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
import { COLORS } from "@/lib/constants/colors";
import {
  formatDate,
  removeAllWindows,
  showWindowAlert,
} from "@/lib/utils/general";
import { changeState } from "@/lib/utils/firebase";
import AlertGenerator from "./alertGenerator";
import NoteGenerator from "./noteGenerator";
import { PedidoUnificado } from "@/lib/interfaces/order";
import ModalWraper from "../general/modalWraper";

interface OrderRowProps {
  order: PedidoUnificado;
  refetchVentas?: () => void;
}

export function OrderRow({ order, refetchVentas }: OrderRowProps) {
  const { cliente, productos, estado, envio, date, alertas = [] } = order;

  const [modalAlertOpen, setModalAlertOpen] = useState(false);
  const [modalNotesOpen, setModalNotesOpen] = useState(false);

  // Función para obtener el color de la alerta
  const getAlertColor = (colorName: string) => {
    const colorConfig = COLORS[colorName as keyof typeof COLORS];
    return colorConfig ? colorConfig.value : "bg-gray-100 text-gray-800";
  };

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
      onClick: () => setModalAlertOpen(true),
    },
    {
      label: "Nota",
      icon: <MessageCircle className="h-4 w-4 text-green-500" />,
      onClick: () => setModalNotesOpen(true),
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
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl p-4 border border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="group   flex flex-wrap md:flex-nowrap md:items-center md:justify-between gap-4 relative w-full">
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

        {/* Alertas activas */}
      </div>
      {alertas && alertas.length > 0 && (
        <div className="w-full md:col-span-full mt-4 space-y-2">
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="relative group">
                <Alert
                  className={`${getAlertColor(
                    alerta.color
                  )} border-0 shadow-sm w-fit-content flex items-center gap-2`}
                >
                  <AlertTriangle
                    className="h-5 w-5 flex justify-center items-center mb-1 h-full  "
                    color="white"
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
      )}
      {order.notas && order.notas.length > 0 && (
        <div className="w-full md:col-span-full mt-4 space-y-2">
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {order.notas.map((nota) => (
              <div key={nota.id} className="relative group">
                <Alert className="bg-blue-100 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-200 shadow-sm w-fit-content flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 flex justify-center items-center mb-1 h-full text-blue-800 dark:text-blue-200" />
                  <AlertDescription className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {nota.text}
                  </AlertDescription>
                </Alert>
              </div>
            ))}
          </div>
        </div>
      )}
      <ModalWraper
        open={modalAlertOpen}
        onOpenChange={setModalAlertOpen}
        title="Agregar alerta"
      >
        <AlertGenerator order={order} refetchVentas={refetchVentas} />
      </ModalWraper>
      <ModalWraper
        open={modalNotesOpen}
        onOpenChange={setModalNotesOpen}
        title="Agregar nota"
      >
        <NoteGenerator order={order} refetchVentas={refetchVentas} />
      </ModalWraper>
    </div>
  );
}
