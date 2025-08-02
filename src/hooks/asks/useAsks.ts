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
import { showWindowAlert } from "@/lib/utils/general";
import { PedidoUnificado } from "@/lib/interfaces/order";
import { db } from "@/lib/firebase/firebase";
import { COLLECTIONS } from "@/lib/constants/db";

interface UseAsksProps {
  limitQuantity?: number;
}

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
      collection(db, COLLECTIONS.PEDIDOS_ESTADO),
      orderBy("date", "desc"),
      limit(quantity)
    );

    const unsubscribe = onSnapshot(
      pedidosEstadoQuery,
      async (snapshot: QuerySnapshot<DocumentData>) => {
        const estadoData: Record<string, any> = {};
        const pedidosIds: string[] = [];

        snapshot.forEach((doc) => {
          console.log(doc.data());
          estadoData[doc.id] = doc.data();
          pedidosIds.push(doc.id);
        });

        if (pedidosIds.length === 0) {
          setLoading(false);
          return;
        }

        const pedidosQuery = query(
          collection(db, COLLECTIONS.PEDIDOS),
          where(documentId(), "in", pedidosIds)
        );
        const pedidosSnapshot = await getDocs(pedidosQuery);

        const combined: Record<string, PedidoUnificado> = {};

        pedidosSnapshot.forEach((doc) => {
          const pedidoData = doc.data();
          const date =
            pedidoData.date instanceof Timestamp
              ? pedidoData.date.toDate()
              : pedidoData.date;

          const alerts = estadoData[doc.id]?.alertas || [];
          alerts.forEach((alert: any) => {
            alert.createdAt =
              alert.createdAt instanceof Timestamp
                ? alert.createdAt.toDate()
                : alert.createdAt;
          });
          combined[doc.id] = {
            id: doc.id,
            ...estadoData[doc.id],
            ...pedidoData,
            alertas: alerts,
            date,
          };
        });

        const sorted = Object.values(combined).sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );

        setAsks(sorted);
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
