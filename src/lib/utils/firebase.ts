import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { showWindowAlert } from "./general";
import { PRODUCT_STATE } from "../constants";
import { db } from "../firebase/firebase";
import { Alert } from "../interfaces/order";
import { COLLECTIONS } from "../constants/db";

export const changeState = async (
  id: string | undefined,
  estado: string
): Promise<void> => {
  try {
    const verifyState = Object.values(PRODUCT_STATE).includes(estado as any);
    if (!verifyState || !id) {
      showWindowAlert({
        title: "Error",
        message: "Estado no válido o ID no encontrado",
        icon: "error",
        timeout: 2000,
      });
      return;
    }
    await updateDoc(doc(db, "pedidos_estado", id), { estado });
  } catch (err: unknown) {
    console.error("Error al cambiar estado:", err);
    showWindowAlert({
      title: "Error",
      message: "Error al cambiar estado",
      icon: "error",
      timeout: 2000,
    });
  }
};
export const changeAlert = async (
  id: string | undefined,
  alertas: Alert[]
): Promise<boolean> => {
  try {
    if (!id || !alertas) {
      showWindowAlert({
        title: "Error",
        message: "Ocurrió un error al modificar la alerta",
        icon: "error",
        timeout: 2000,
      });
      return false;
    }

    await updateDoc(doc(db, COLLECTIONS.PEDIDOS_ESTADO, id), {
      alertas: alertas.map((alert) => ({
        ...alert,
        createdAt:
          alert.createdAt instanceof Date
            ? Timestamp.fromDate(alert.createdAt)
            : alert.createdAt,
      })),
    });
    showWindowAlert({
      title: "Éxito",
      message: "Alerta modificada correctamente",
      icon: "success",
      timeout: 2000,
    });
    return true;
  } catch (err: unknown) {
    showWindowAlert({
      title: "Error",
      message: "Error al cambiar nota",
      icon: "error",
      timeout: 2000,
    });
    return false;
  }
};
export const addAlert = async (
  id: string | undefined,
  alert: Alert
): Promise<boolean> => {
  try {
    if (!id || !alert) {
      showWindowAlert({
        title: "Error",
        message: "Ocurrió un error al generar la alerta",
        icon: "error",
        timeout: 2000,
      });
      return false;
    }

    // Consultar el documento actual
    const docRef = doc(db, COLLECTIONS.PEDIDOS_ESTADO, id);
    const docSnap = await getDoc(docRef);
    let alertas: Alert[] = [];
    if (docSnap.exists()) {
      const data = docSnap.data();
      alertas = Array.isArray(data.alertas) ? data.alertas : [];
    }
    // Agregar la nueva alerta
    const newAlertas = [
      ...alertas,
      {
        ...alert,
        createdAt: Timestamp.fromDate(alert.createdAt),
      },
    ];
    await updateDoc(docRef, { alertas: newAlertas });

    showWindowAlert({
      title: "Alerta añadida correctamente",
      icon: "success",
      timeout: 2000,
    });
    return true;
  } catch (err: unknown) {
    showWindowAlert({
      title: "Error",
      message: "Error al añadir nota",
      icon: "error",
      timeout: 2000,
    });
    return false;
  }
};
