import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import { Rule } from "@/lib/constants/shipment";
import { useShippingStore } from "../store";

interface RulesTableItemProps {
  ruleId: string;
}

const RulesTableItem: React.FC<RulesTableItemProps> = ({ ruleId }) => {
  const {
    rules,
    shippingTypes,
    provinces,
    localitiesByProvince,
    carriers,
    removeRule,
  } = useShippingStore();
  const rule = rules.find((r) => r.id === ruleId) as Rule;
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
        .filter((o) => rule.localityValues.includes(o.value))
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
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Editar"
            disabled
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:text-destructive"
            onClick={() => removeRule(rule.id)}
            aria-label="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RulesTableItem;
