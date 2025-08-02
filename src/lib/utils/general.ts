import { toast } from "react-hot-toast";
import type { SweetAlertIcon } from "sweetalert2";
import Swal from "sweetalert2";

// Verifica si un valor es un objeto
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && typeof obj === "object";

// Tipos para la función showWindowAlert
interface ShowWindowAlertProps {
  title?: string;
  text?: string;
  message?: string;
  icon?: SweetAlertIcon;
  loader?: boolean;
  timeout?: number;
}

// Alerta simple
export const showWindowAlert = ({
  title = "",
  text = "",
  message = "",
  icon,
  loader = false,
  timeout = 0,
}: ShowWindowAlertProps): void => {
  removeAllWindows(); // Cierra cualquier alerta previa
  // remove all toasts
  toast.dismiss();
  let iconEmoji = "";
  let toastFn: any = toast;
  switch (icon) {
    case "success": {
      toastFn = toast.success;
      break;
    }
    case "error": {
      toastFn = toast.error;
      break;
    }
  }
  if (loader) {
    toastFn = toast.loading;
  }

  const toastText = `${iconEmoji} ${title ? title + ": " : ""}${
    text || message
  }`;
  toastFn(toastText, {
    duration: timeout > 0 ? timeout : 4000,
    className:
      "rounded-lg shadow-lg p-4 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 font-medium text-sm",
  });
};

// Tipos para la función showWindowOptionsAlert
interface ShowWindowOptionsAlertProps {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
  customClassConfirmButton?: string;
  customClassCancelButton?: string;
  customClassTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Alerta con opciones (confirmar / cancelar)
export const showWindowOptionsAlert = ({
  title = "¿Estás seguro?",
  text = "No podrás revertir esta acción",
  icon = "warning",
  confirmButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  customClassConfirmButton = "",
  customClassCancelButton = "",
  customClassTitle = "",
  onConfirm = () => {},
  onCancel = () => {},
}: ShowWindowOptionsAlertProps): void => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    buttonsStyling: false,
    customClass: {
      container: "!z-[1000]",
      htmlContainer: "!z-[1000]",
      popup: "rounded-lg shadow-lg p-6 !z-[100000]",
      title: `${customClassTitle} text-lg font-bold text-gray-800`,
      confirmButton: `${customClassConfirmButton} bg-red-500 !m-4 hover:bg-red-600/80 text-white font-semibold transition py-2 px-4 rounded focus:outline-none uppercase text-sm`,
      cancelButton: `${customClassCancelButton} bg-gray-300/70 hover:bg-gray-300 text-gray-800 transition font-semibold py-2 px-4 rounded focus:outline-none uppercase text-sm`,
    },

    didOpen: () => {
      Swal.hideLoading();
      const popup = document.querySelector(".swal2-popup");
      if (popup) {
        (popup as HTMLElement).style.zIndex = "1000000"; // más alto que cualquier modal de ShadCN
      }
    },
  }).then((result: any) => {
    if (result.isConfirmed) {
      onConfirm();
    } else {
      onCancel();
    }
  });
};

// Cerrar todas las alertas
export const removeAllWindows = (): void => {
  Swal.close();
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
