"use client";

import React from "react";

type MessagesTableProps = {
  loading: boolean;
  error?: unknown;
  itemsCount: number;
};

export function MessagesTable({
  loading,
  error,
  itemsCount,
}: MessagesTableProps) {
  if (loading && itemsCount === 0) {
    return (
      <p className="text-center text-muted-foreground">Cargando pedidos...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-destructive">
        Error al cargar los pedidos.
      </p>
    );
  }

  if (!loading && !error && itemsCount === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No se encontraron pedidos con los filtros aplicados.
      </p>
    );
  }

  return null;
}
