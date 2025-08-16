"use client";

import { useEffect, useState } from "react";
import { Pencil, BellRing, MessageCircle, FileText } from "lucide-react";
import OrderShipping from "./OrderShipping";
import OrderHeader from "./OrderHeader";

import AlertList from "./AlertList";
import NotesList from "./NotesList";
import StateDropdown from "./StateDropdown";
import OrderActions from "./OrderActions";
import { PedidoUnificado } from "@/lib/interfaces/order";
import OrderModals from "./OrderModals";

interface OrderRowProps {
  order: PedidoUnificado;
}

export function OrderRow({ order }: OrderRowProps) {
  const {
    cliente,
    productos,
    estado,
    envio,
    date,
    alertas = [],
    tagNote,
  } = order;

  const [modalAlertOpen, setModalAlertOpen] = useState(false);
  const [modalNotesOpen, setModalNotesOpen] = useState(false);

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
    {
      label: "Generar remito",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      onClick: () => alert("generar remito"),
    },
  ];

  useEffect(() => {
    console.log({ order });
  }, [order]);

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl p-4 border border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="group   flex flex-wrap md:flex-nowrap md:items-center md:justify-between gap-4 relative w-full">
        {/* Fecha arriba a la izquierda */}
        {/* Producto y cliente */}
        <OrderHeader
          productos={productos}
          cliente={cliente}
          date={date}
          tagNote={tagNote}
        />

        {/* Envío */}
        <OrderShipping envio={envio} order={order} />

        {/* Estado */}
        <StateDropdown estado={estado} orderId={order.id} />

        <OrderActions extraActions={extraActions} />

        {/* Alertas activas */}
      </div>
      <AlertList alertas={alertas} />
      <NotesList notas={order.notas} />
      <OrderModals
        order={order}
        modalAlertOpen={modalAlertOpen}
        setModalAlertOpen={setModalAlertOpen}
        modalNotesOpen={modalNotesOpen}
        setModalNotesOpen={setModalNotesOpen}
      />
    </div>
  );
}
