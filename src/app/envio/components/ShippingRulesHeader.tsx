import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

const ShippingRulesHeader: React.FC = () => (
  <CardHeader className="space-y-1">
    <CardTitle className="text-2xl">Asignación de logística</CardTitle>
    <CardDescription>
      Definí reglas del tipo:{" "}
      <span className="font-medium">“Para los envíos de tipo”</span> →{" "}
      <span className="font-medium">“provincia”</span> →{" "}
      <span className="font-medium">“localidades (multi)”</span> →{" "}
      <span className="font-medium">“se enviará por (transportista)”</span>.
    </CardDescription>
  </CardHeader>
);

export default ShippingRulesHeader;
