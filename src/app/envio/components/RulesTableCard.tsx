import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import RulesTable from "./RulesTable";
const RulesTableCard: React.FC = () => (
  <Card className="border-muted-foreground/10">
    <CardHeader>
      <CardTitle className="text-xl">Reglas creadas</CardTitle>
      <CardDescription>
        Administrá y revisá las reglas configuradas.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <RulesTable />
    </CardContent>
  </Card>
);

export default RulesTableCard;
