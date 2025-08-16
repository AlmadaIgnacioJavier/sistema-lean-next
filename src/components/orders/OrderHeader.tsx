import React from "react";
import { CalendarDays } from "lucide-react";
import TagNote from "./TagNote";
import { formatDate } from "@/lib/utils/general";
import { PedidoUnificado } from "@/lib/interfaces/order";

type Props = Pick<
  PedidoUnificado,
  "productos" | "cliente" | "date" | "tagNote"
>;

export default function OrderHeader({
  productos,
  cliente,
  date,
  tagNote,
}: Props) {
  return (
    <div className="flex items-center gap-4 flex-1 min-w-full md:min-w-0">
      <div className="truncate flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 dark:text-slate-400">
          <CalendarDays className="h-3 w-3" />
          <span>{date ? formatDate(date) : ""}</span>
          <TagNote tagNote={tagNote} />
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-slate-200 truncate pr-6 md:pr-0">
          {productos[0].titulo} (x{productos[0].cantidad})
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          {cliente.nombre}
        </p>
      </div>
    </div>
  );
}
