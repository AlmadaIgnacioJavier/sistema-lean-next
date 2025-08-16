import { useEffect, useState } from "react";
import { onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { buildRulesQuery } from "./utils/firestore";
import { parseDate } from "./utils/parseDate";
import {
  createRule as createRuleOp,
  deleteRule as deleteRuleOp,
} from "./utils/operations";
import { showWindowAlert } from "@/lib/utils/general";
import type { Rule } from "@/lib/constants/shipment";

interface UseRulesProps {
  limitQuantity?: number;
}

/**
 * Hook que escucha en tiempo real la colección `config/shipping/rules`.
 */
export function useRules({ limitQuantity = 50 }: UseRulesProps = {}) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [quantity, setQuantity] = useState<number>(limitQuantity);

  const showMore = () => setQuantity((prev) => prev + limitQuantity);

  const createRule = async (payload: Partial<Rule> = {}) => {
    try {
      await createRuleOp(payload as Record<string, any>);
    } catch (err) {
      // Re-throw after operation shows alerts
      throw err;
    }
  };

  const deleteRule = async (id: string) => {
    return deleteRuleOp(rules.length, id);
  };

  useEffect(() => {
    setLoading(true);

    const rulesQuery = buildRulesQuery(quantity);

    const unsubscribe = onSnapshot(
      rulesQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const items: Rule[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          const createdAt = parseDate(data?.createdAt);

          // Normalize localityValues: older records may store string[] (values only).
          let localityValues: any = [];
          if (Array.isArray(data?.localityValues)) {
            if (data.localityValues.length === 0) localityValues = [];
            else if (typeof data.localityValues[0] === "string") {
              localityValues = data.localityValues.map((v: string) => ({
                value: v,
                label: v,
              }));
            } else {
              localityValues = data.localityValues;
            }
          }

          items.push({
            id: doc.id,
            ...data,
            localityValues,
            createdAt,
          } as unknown as Rule);
        });

        setRules(items);
        setLoading(false);
      },
      (err) => {
        console.error("Error en listener de rules:", err);
        showWindowAlert({
          title: "Error de Conexión",
          message: "No se pudieron obtener las reglas de envío en tiempo real.",
          icon: "error",
        });
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [quantity]);

  return {
    rules,
    loading,
    error,
    showMore,
    createRule,
    deleteRule,
  } as const;
}
