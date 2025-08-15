import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import RulesTableItem from "./RulesTableItem";
import { useRules } from "@/hooks/shipping/useRules";
const RulesTable: React.FC = () => {
  const { rules, deleteRule } = useRules();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo de envío</TableHead>
          <TableHead>Provincia</TableHead>
          <TableHead>Localidades</TableHead>
          <TableHead>Logistica</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rules.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5}>
              <div className="text-sm text-muted-foreground py-4">
                Sin reglas aún. Creá la primera arriba.
              </div>
            </TableCell>
          </TableRow>
        ) : (
          rules.map((r) => (
            <RulesTableItem key={r.id} ruleId={r.id} deleteRule={deleteRule} />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default RulesTable;
