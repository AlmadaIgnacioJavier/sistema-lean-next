import { addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { logisticsCollectionPath, getLogisticsCollection } from "./firestore";
import { showWindowAlert } from "@/lib/utils/general";

import { rulesCollectionPath, getRulesCollection } from "./firestore";

export const createLogistic = async (payload: Record<string, any> = {}) => {
  try {
    await addDoc(getLogisticsCollection(), {
      ...payload,
      createdAt: serverTimestamp(),
    });

    showWindowAlert({
      title: "Logística creada",
      message: "La configuración de logística se creó correctamente.",
      icon: "success",
    });
  } catch (err) {
    console.error("Error creando logística:", err);
    showWindowAlert({
      title: "Error al crear",
      message: "No se pudo crear la logística. Intente nuevamente.",
      icon: "error",
    });
    throw err;
  }
};

export const deleteLogistic = async (currentLength: number, id?: string) => {
  if (!id) return;

  if (currentLength <= 1) {
    showWindowAlert({
      title: "Operación no permitida",
      message: "No se puede eliminar la última logística.",
      icon: "warning",
    });
    return;
  }

  try {
    await deleteDoc(doc(db, ...logisticsCollectionPath, id));

    showWindowAlert({
      title: "Logística eliminada",
      message: "La logística fue eliminada correctamente.",
      icon: "success",
    });
  } catch (err) {
    console.error("Error eliminando logística:", err);
    showWindowAlert({
      title: "Error al eliminar",
      message: "No se pudo eliminar la logística. Intente nuevamente.",
      icon: "error",
    });
    throw err;
  }
};

export const createRule = async (payload: Record<string, any> = {}) => {
  try {
    await addDoc(getRulesCollection(), {
      ...payload,
      createdAt: serverTimestamp(),
    });

    showWindowAlert({
      title: "Regla creada",
      message: "La regla de envío se creó correctamente.",
      icon: "success",
    });
  } catch (err) {
    console.error("Error creando regla:", err);
    showWindowAlert({
      title: "Error al crear",
      message: "No se pudo crear la regla. Intente nuevamente.",
      icon: "error",
    });
    throw err;
  }
};

export const deleteRule = async (currentLength: number, id?: string) => {
  if (!id) return;

  if (currentLength <= 0) {
    showWindowAlert({
      title: "Operación no permitida",
      message: "No hay reglas para eliminar.",
      icon: "warning",
    });
    return;
  }

  try {
    await deleteDoc(doc(db, ...rulesCollectionPath, id));

    showWindowAlert({
      title: "Regla eliminada",
      message: "La regla fue eliminada correctamente.",
      icon: "success",
    });
  } catch (err) {
    console.error("Error eliminando regla:", err);
    showWindowAlert({
      title: "Error al eliminar",
      message: "No se pudo eliminar la regla. Intente nuevamente.",
      icon: "error",
    });
    throw err;
  }
};
