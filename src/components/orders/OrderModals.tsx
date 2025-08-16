"use client";

import React from "react";
import ModalWraper from "@/components/general/modalWraper";
import AlertGenerator from "./alertGenerator";
import NoteGenerator from "./noteGenerator";
import { PedidoUnificado } from "@/lib/interfaces/order";

interface OrderModalsProps {
  order: PedidoUnificado;
  modalAlertOpen: boolean;
  setModalAlertOpen: (open: boolean) => void;
  modalNotesOpen: boolean;
  setModalNotesOpen: (open: boolean) => void;
}

export default function OrderModals({
  order,
  modalAlertOpen,
  setModalAlertOpen,
  modalNotesOpen,
  setModalNotesOpen,
}: OrderModalsProps) {
  return (
    <>
      <ModalWraper
        open={modalAlertOpen}
        onOpenChange={setModalAlertOpen}
        title="Agregar alerta"
      >
        <AlertGenerator order={order} modalAlertOpen={modalAlertOpen} />
      </ModalWraper>
      <ModalWraper
        open={modalNotesOpen}
        onOpenChange={setModalNotesOpen}
        title="Agregar nota"
      >
        <NoteGenerator order={order} />
      </ModalWraper>
    </>
  );
}
