"use client";

import { useEffect, useMemo, useState } from "react";
import { OrderRow } from "./orderRow";
import { useAsks } from "@/hooks/asks/useAsks";
import { Button } from "@/components/ui/button";
import { PedidoUnificado } from "@/lib/interfaces/order";
import { FILTERS_NOT_STATE, ORDER_STATUS } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { MessagesTable } from "./messagesTable";

type OrdersTableProps = {
  addFilter?: boolean;
  initialFilterState?: ORDER_STATUS[];
};

export default function OrdersTable({
  addFilter = true,
  initialFilterState = FILTERS_NOT_STATE.notDelivered,
}: OrdersTableProps) {
  // Estado para alternar entre pedidos despachados o no
  const [showShipped, setShowShipped] = useState<boolean>(false);
  const [statesNot, setStatesNot] =
    useState<ORDER_STATUS[]>(initialFilterState);

  const handleToggle = (checked: boolean) => {
    setShowShipped(checked);
    setStatesNot(
      checked ? FILTERS_NOT_STATE.shipped : FILTERS_NOT_STATE.notDelivered
    );
  };
  const { asks, loading, error, showMore } = useAsks({
    limitQuantity: 20,
    statesNot: statesNot,
  });

  const filteredAsks = useMemo<PedidoUnificado[]>(() => {
    return Object.values(asks);
  }, [asks]);

  return (
    <div className="flex flex-col flex-1 bg-muted">
      <div className="flex flex-col gap-4 p-4">
        {addFilter ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch checked={showShipped} onCheckedChange={handleToggle} />
              <span className="text-sm font-medium">Despachados</span>
            </div>
          </div>
        ) : null}
        <MessagesTable
          loading={loading}
          error={error}
          itemsCount={filteredAsks.length}
        />

        {filteredAsks.length != 0 &&
          filteredAsks.map((pedido: PedidoUnificado) => (
            <OrderRow key={pedido.id} order={pedido} />
          ))}
      </div>

      <div className="flex items-center justify-center p-4">
        <Button
          variant="outline"
          onClick={showMore}
          disabled={loading}
          className="rounded-md"
        >
          {loading ? "Cargando..." : "Cargar más"}
        </Button>
      </div>
    </div>
  );
}
