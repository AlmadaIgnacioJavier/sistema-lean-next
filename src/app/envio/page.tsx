"use client";

import ShippingRuleFormCard from "./components/ShippingRuleFormCard";
import RulesTableCard from "./components/RulesTableCard";
import { useEffect } from "react";
import { getLocalities } from "@/lib/services/shipment";
import { Option } from "@/lib/constants/shipment";
import { useShippingStore } from "./store";

const ShippingRulesPage = () => {
  const { setLocalitiesByProvince, province, resetLocalitiesSelection } =
    useShippingStore();

  useEffect(() => {
    resetLocalitiesSelection();
    if (province) {
      getLocalities(province)
        .then((data) => {
          // Normalize possible response shapes and guard against non-array values
          // Common shapes: Array, { data: Array }, { results: Array }, { localities: Array }, or error object
          const raw = data?.data ?? data;
          let items: any[] = [];

          if (Array.isArray(raw)) {
            items = raw;
          } else if (raw && typeof raw === "object") {
            // try a few common property names that might contain the list
            if (Array.isArray(raw.results)) items = raw.results;
            else if (Array.isArray(raw.localities)) items = raw.localities;
            else if (Array.isArray(raw.items)) items = raw.items;
            else {
              // Not an array - log for debugging and fallback to empty
              console.warn("getLocalities: unexpected response shape", raw);
              items = [];
            }
          } else {
            items = [];
          }

          const opts: Option[] = items.map((item: any) =>
            item && item.value && item.label
              ? { value: item.value, label: item.label }
              : {
                  value: String(item.id ?? ""),
                  label: String(item.name ?? item.label ?? ""),
                }
          );
          setLocalitiesByProvince(opts);
        })
        .catch((error) => {
          console.error("Error al obtener localidades:", error);
          setLocalitiesByProvince([]);
        });
    } else {
      setLocalitiesByProvince([]);
    }
  }, [province, resetLocalitiesSelection, setLocalitiesByProvince]);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <ShippingRuleFormCard />

      {/* Rules table */}
      <div className="mt-8">
        <RulesTableCard />
      </div>
    </div>
  );
};
export default ShippingRulesPage;
