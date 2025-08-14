import React from "react";
import { useShippingStore } from "../store";

const StepIndicator: React.FC = () => {
  const { shippingType, province, allLocalities, localityValues, carrier } =
    useShippingStore();
  return (
    <div className="mb-8 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              shippingType
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="ml-2 hidden text-sm font-medium text-muted-foreground sm:block">
            Tipo
          </span>
        </div>
        <div className="h-px w-8 bg-border"></div>
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              province
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="ml-2 hidden text-sm font-medium text-muted-foreground sm:block">
            Ubicación
          </span>
        </div>
        <div className="h-px w-8 bg-border"></div>
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              allLocalities || localityValues.length > 0
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            3
          </div>
          <span className="ml-2 hidden text-sm font-medium text-muted-foreground sm:block">
            Localidades
          </span>
        </div>
        <div className="h-px w-8 bg-border"></div>
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              carrier
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            4
          </div>
          <span className="ml-2 hidden text-sm font-medium text-muted-foreground sm:block">
            Transportista
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
