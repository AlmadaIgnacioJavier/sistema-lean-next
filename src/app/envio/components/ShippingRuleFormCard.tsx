import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ShippingRulesHeader from "./ShippingRulesHeader";
import StepIndicator from "./StepIndicator";
import ShippingTypeSelector from "./ShippingTypeSelector";
import ProvinceSelector from "./ProvinceSelector";
import LocalitiesSelector from "./LocalitiesSelector";
import CarrierSelector from "./CarrierSelector";
import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useShippingStore } from "../store";
import { useRules } from "@/hooks/shipping/useRules";

const ShippingRuleFormCard: React.FC = () => {
  const { shippingType, province, allLocalities, localityValues, carrier } =
    useShippingStore();
  const { createRule } = useRules();

  const handleAddRule = async () => {
    const payload = {
      shippingType,
      province,
      allLocalities,
      localityValues: allLocalities ? [] : localityValues,
      carrier,
    } as Record<string, any>;

    try {
      await createRule(payload);
    } catch (err) {
      console.error("Error creando regla:", err);
    }
  };

  return (
    <Card className="border-muted-foreground/10 shadow-sm">
      <ShippingRulesHeader />
      <Separator />
      <CardContent className="pt-8">
        <StepIndicator />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ShippingTypeSelector />
          <ProvinceSelector />
          <LocalitiesSelector />
          <CarrierSelector />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-4">
        <Button
          className="w-full md:w-auto rounded-2xl"
          onClick={handleAddRule}
        >
          <ListPlus className="mr-2 h-4 w-4" /> Agregar regla
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShippingRuleFormCard;
