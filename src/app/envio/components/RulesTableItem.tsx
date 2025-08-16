import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/general/ConfirmDialog";
import { Rule } from "@/lib/constants/shipment";
import { useShippingStore } from "../store";
import { useRules } from "@/hooks/shipping/useRules";

interface RulesTableItemProps {
  ruleId: string;
  deleteRule: (id: string) => void;
}

const RulesTableItem: React.FC<RulesTableItemProps> = ({
  ruleId,
  deleteRule,
}) => {
  const { shippingTypes, provinces, localitiesByProvince, carriers } =
    useShippingStore();

  console.log({ carriers });

  const { rules } = useRules();
  const rule = rules.find((r) => r.id === ruleId) as Rule | undefined;
  if (!rule) return null;
  const st =
    shippingTypes.find((t) => t.value === rule.shippingType)?.label ??
    rule.shippingType;
  const prov =
    provinces.find((p) => p.value === rule.province)?.label ?? rule.province;
  const carr =
    carriers.find((c) => c.value === rule.carrier)?.label ?? rule.carrier;
  const locs = rule.allLocalities
    ? "Todas las localidades"
    : (localitiesByProvince ?? [])
        .filter((o) =>
          (rule.localityValues as any[]).some((lv) => lv.value === o.value)
        )
        .map((o) => o.label)
        .join(", ");

  return (
    <TableRow className="align-top">
      <TableCell>{st}</TableCell>
      <TableCell>{prov}</TableCell>
      <TableCell className="max-w-[360px]">
        <div className="text-sm">{locs || "—"}</div>
      </TableCell>
      <TableCell>{carr}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <ConfirmDialog
            title="¿Eliminar regla?"
            description="Esta acción no se puede deshacer. ¿Deseas eliminar la regla de envío?"
            confirmText="Eliminar"
            cancelText="Cancelar"
            onConfirm={() => deleteRule(rule.id)}
          >
            <Button
              variant="secondary"
              size="icon"
              className="rounded-md bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/20 text-red-600 dark:text-white transition-colors active:bg-red-200 dark:active:bg-red-800/70"
              aria-label="Eliminar"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </ConfirmDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RulesTableItem;
