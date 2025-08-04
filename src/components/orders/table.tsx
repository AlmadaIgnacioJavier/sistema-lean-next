"use client";

import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderRow } from "./orderRow";
import { useAsks } from "@/hooks/asks/useAsks";
import { Button } from "@/components/ui/button";
import { PedidoUnificado } from "@/lib/interfaces/order";
import { getVentasMeli, refreshDataMeli } from "@/lib/services/meli";

export default function OrdersTable() {
  const { asks, loading, error, showMore } = useAsks({ limitQuantity: 10 });

  // React Query para ventas de Meli
  const {
    data: ventasMeli,
    isLoading: ventasLoading,
    isError: ventasError,
    refetch: refetchVentas,
  } = useQuery({
    queryKey: ["ventasMeli"],
    queryFn: getVentasMeli,
  });

  const filteredAsks = useMemo<PedidoUnificado[]>(() => {
    return Object.values(asks);
  }, [asks]);

  useEffect(() => {
    console.log({ ventasMeli });
  }, [ventasMeli]);

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
          <OrderRow
            refetchVentas={refetchVentas}
            key={pedido.id}
            order={pedido}
          />
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
