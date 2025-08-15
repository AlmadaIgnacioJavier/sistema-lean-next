"use client";

import React from "react";
import ModalWraper from "@/components/general/modalWraper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/general/ConfirmDialog";
import { Separator } from "@/components/ui/separator";
import { LogisticsItem } from "@/hooks/shipping/useLogistics";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  name: string;
  setName: (s: string) => void;
  logistics?: LogisticsItem[] | null;
  deletingId: string | null;
  onDelete: (id: string) => Promise<void> | void;
  onCreate: () => Promise<void> | void;
  saving: boolean;
}

export default function LogisticsModal({
  open,
  setOpen,
  name,
  setName,
  logistics,
  deletingId,
  onDelete,
  onCreate,
  saving,
}: Props) {
  return (
    <ModalWraper
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setName("");
      }}
      title="Gestionar logisticas"
    >
      <div className="px-6 pb-6">
        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-sm">Logísticas existentes</Label>
            <div className="mt-4 flex flex-col gap-1 max-h-60 overflow-y-auto">
              {logistics && logistics.length > 0 ? (
                logistics.map((l: LogisticsItem) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between rounded-md border px-3 y-1.5"
                  >
                    <div className="text-sm">{l.name}</div>
                    <div>
                      <ConfirmDialog
                        title={`Eliminar ${l.name}?`}
                        description={`Se eliminará la logística ${l.name}. Esta acción no se puede deshacer.`}
                        confirmText="Eliminar"
                        cancelText="Cancelar"
                        onConfirm={() => onDelete(l.id)}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={!!deletingId}
                        >
                          {deletingId === l.id ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </ConfirmDialog>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">
                  No hay logisticas creadas.
                </p>
              )}
            </div>
          </div>
          <Separator />

          <div className="">
            <Label className="text-sm">Crear nueva logística</Label>
            <div className="mt-2 flex flex-col gap-3">
              <Input
                placeholder="Nombre de la logística"
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cerrar
                </Button>
                <Button onClick={onCreate} disabled={saving || !name.trim()}>
                  {saving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWraper>
  );
}
