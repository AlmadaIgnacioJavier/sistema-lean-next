import { useEffect, useState } from "react";
import { onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { buildLogisticsQuery } from "./utils/firestore";
import { parseDate } from "./utils/parseDate";
import {
  createLogistic as createLogisticOp,
  deleteLogistic as deleteLogisticOp,
} from "./utils/operations";
import { showWindowAlert } from "@/lib/utils/general";

// Tipo mínimo para los items de logística. Se puede extender según la estructura real.
export interface LogisticsItem {
  id: string;
  name: string;
  // puede ser Date o Timestamp dependiendo de cómo venga desde Firestore
  createdAt: Date | null;
}

interface UseLogisticsProps {
  limitQuantity?: number;
}

// parseDate moved to ./utils/parseDate

/**
 * Hook que escucha en tiempo real la colección `config/shipping/logistics`.
 * Inspirado en `useAsks`.
 */
export function useLogistics({ limitQuantity = 20 }: UseLogisticsProps = {}) {
  const [logistics, setLogistics] = useState<LogisticsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [quantity, setQuantity] = useState<number>(limitQuantity);

  const showMore = () => setQuantity((prev) => prev + limitQuantity);

  // Crea una nueva logística en la colección. `payload` puede incluir campos como `name`.
  const createLogistic = async (payload: Partial<LogisticsItem> = {}) => {
    return createLogisticOp(payload as Record<string, any>);
  };

  // Elimina una logística por id. Si solo queda 1 logística, no permite eliminar.
  const deleteLogistic = async (id: string) => {
    return deleteLogisticOp(logistics.length, id);
  };

  useEffect(() => {
    setLoading(true);

    const logisticsQuery = buildLogisticsQuery(quantity);

    const unsubscribe = onSnapshot(
      logisticsQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const items: LogisticsItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as any;
          const createdAt = parseDate(data?.createdAt);

          items.push({ id: doc.id, ...data, createdAt });
        });

        setLogistics(items);
        setLoading(false);
      },
      (err) => {
        console.error("Error en listener de logistics:", err);
        showWindowAlert({
          title: "Error de Conexión",
          message:
            "No se pudieron obtener las configuraciones de logística en tiempo real.",
          icon: "error",
        });
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [quantity]);

  return {
    logistics,
    loading,
    error,
    showMore,
    createLogistic,
    deleteLogistic,
  } as const;
}
