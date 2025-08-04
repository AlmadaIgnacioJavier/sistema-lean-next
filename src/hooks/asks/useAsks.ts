import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  orderBy,
  limit,
  query,
  where,
  documentId,
  Timestamp,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { chunkArray, showWindowAlert } from "@/lib/utils/general";
import { Alert, Note, PedidoUnificado } from "@/lib/interfaces/order";
import { db } from "@/lib/firebase/firebase";
import { COLLECTIONS } from "@/lib/constants/db";

interface UseAsksProps {
  limitQuantity?: number;
}

const parseDate = (date: Date | Timestamp): Date => {
  return date instanceof Timestamp ? date.toDate() : date;
};
export function useAsks({ limitQuantity = 10 }: UseAsksProps = {}) {
  const [asks, setAsks] = useState<PedidoUnificado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [quantity, setQuantity] = useState<number>(limitQuantity);

  const showMore = () => {
    setQuantity((prev) => prev + limitQuantity);
  };

  useEffect(() => {
    setLoading(true);

    const pedidosEstadoQuery = query(
      collection(db, COLLECTIONS.PEDIDOS),
      orderBy("date", "desc"),
      limit(quantity)
    );

    const unsubscribe = onSnapshot(
      pedidosEstadoQuery,
      async (snapshot: QuerySnapshot<DocumentData>) => {
        const combined: Record<string, PedidoUnificado> = {};
        snapshot.forEach((doc) => {
          const pedidoData = doc.data() as PedidoUnificado;
          const date = parseDate(pedidoData.date);

          const alertas = (pedidoData?.alertas || []).map((alert: Alert) => ({
            ...alert,
            createdAt: parseDate(alert.createdAt),
          }));
          const notas = (pedidoData?.notas || []).map((note: Note) => ({
            ...note,
            createdAt: parseDate(note.createdAt),
          }));

          combined[doc.id] = {
            ...pedidoData,
            notas,
            alertas,
            date,
          };
        });

        setAsks(Object.values(combined));
        setLoading(false);
      },
      (err) => {
        console.error("Error en el listener de pedidos:", err);
        showWindowAlert({
          title: "Error de Conexión",
          message: "No se pudieron obtener los pedidos en tiempo real.",
          icon: "error",
        });
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [quantity]);

  return { asks, loading, error, showMore };
}
