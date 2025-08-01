import Swal, { SweetAlertIcon } from "sweetalert2";

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
  icon = "error",
  loader = false,
  timeout = 0,
}: ShowWindowAlertProps): void => {
  Swal.fire({
    title,
    icon,
    text: text || message,
    buttonsStyling: false,
    customClass: {
      popup: "rounded-lg shadow-lg p-6",
      confirmButton:
        "bg-gray-300 hover:bg-gray-300/80 text-gray-800 py-2 px-8 rounded font-semibold focus:outline-none uppercase text-sm",
    },
    timer: timeout,
    timerProgressBar: Boolean(timeout),
    didOpen: () => {
      loader ? Swal.showLoading() : Swal.hideLoading();
    },
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
      popup: "rounded-lg shadow-lg p-6",
      title: `${customClassTitle} text-lg font-bold text-gray-800`,
      confirmButton: `${customClassConfirmButton} bg-red-500 !m-4 hover:bg-red-600/80 text-white font-semibold transition py-2 px-4 rounded focus:outline-none uppercase text-sm`,
      cancelButton: `${customClassCancelButton} bg-gray-300/70 hover:bg-gray-300 text-gray-800 transition font-semibold py-2 px-4 rounded focus:outline-none uppercase text-sm`,
    },
    didOpen: () => {
      Swal.hideLoading();
    },
  }).then((result: any) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

// Cerrar todas las alertas
export const removeAllWindows = (): void => {
  Swal.close();
};
