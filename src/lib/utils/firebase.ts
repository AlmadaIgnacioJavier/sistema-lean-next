import { doc, updateDoc } from "firebase/firestore";
import { showWindowAlert } from "./general";
import { PRODUCT_STATE } from "../constants";
import { db } from "../firebase/firebase";

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
