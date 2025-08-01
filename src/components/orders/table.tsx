"use client";

import { useMemo } from "react";
import { OrderRow } from "./orderRow";
import { useAsks } from "@/hooks/asks/useAsks";
import { Button } from "@/components/ui/button";
import { PedidoUnificado } from "@/lib/interfaces/order";

export default function Table() {
  const { asks, loading, error, showMore } = useAsks({ limitQuantity: 10 });

  const filteredAsks = useMemo<PedidoUnificado[]>(() => {
    return Object.values(asks);
  }, [asks]);

  return (
    <div className="flex flex-col flex-1 bg-muted">
      <div className="flex flex-col gap-4 p-4">
        {loading && filteredAsks.length === 0 && (
          <p className="text-center text-muted-foreground">
            Cargando pedidos...
          </p>
        )}
        {error && (
          <p className="text-center text-destructive">
            Error al cargar los pedidos.
          </p>
        )}
        {!loading && !error && filteredAsks.length === 0 && (
          <p className="text-center text-muted-foreground">
            No se encontraron pedidos con los filtros aplicados.
          </p>
        )}

        {filteredAsks.map((pedido) => (
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
