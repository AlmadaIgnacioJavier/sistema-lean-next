import axios from "axios";
import { API_URL } from "../constants/api";
// ALERTAS
export const createAlertMeli = async (
  orderID: string,
  alert: string,
  color: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/meli/createAlert`, {
      orderID,
      alert,
      color,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear alerta:", error);
    return { success: false, message: "Error al crear alerta" };
  }
};

export const updateAlertMeli = async (
  orderID: string,
  alert: string,
  color: string,
  alertId: string
) => {
  try {
    const response = await axios.put(`${API_URL}/api/meli/updateAlert`, {
      orderID,
      alert,
      color,
      alertId,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar alerta:", error);
    return { success: false, message: "Error al actualizar alerta" };
  }
};

export const deleteAlertMeli = async (orderID: string, alertId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/api/meli/deleteAlert`, {
      data: { orderID, alertId },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar alerta:", error);
    return { success: false, message: "Error al eliminar alerta" };
  }
};

// NOTAS
export const createNoteMeli = async (orderID: string, note: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/meli/createNote`, {
      orderID,
      note,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear nota:", error);
    return { success: false, message: "Error al crear nota" };
  }
};

export const updateNoteMeli = async (
  orderID: string,
  note: string,
  noteId: string
) => {
  try {
    const response = await axios.put(`${API_URL}/api/meli/updateNote`, {
      orderID,
      note,
      noteId,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar nota:", error);
    return { success: false, message: "Error al actualizar nota" };
  }
};

// ESTADO
export const setStateMeli = async (orderID: string, state: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/meli/setState`, {
      orderID,
      state,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear/actualizar estado:", error);
    return { success: false, message: "Error al crear/actualizar estado" };
  }
};

export const updateStateMeli = async (
  orderID: string,
  state: string,
  noteId: string
) => {
  try {
    const response = await axios.put(`${API_URL}/api/meli/updateState`, {
      orderID,
      state,
      noteId,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    return { success: false, message: "Error al actualizar estado" };
  }
};

// SHIPMENT TYPE
export const setShipmentTypeMeli = async (
  orderID: string,
  shipmentType: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/meli/setShipmentType`, {
      orderID,
      shipmentType,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear/actualizar shipment type:", error);
    return {
      success: false,
      message: "Error al crear/actualizar shipment type",
    };
  }
};

export const updateShipmentTypeMeli = async (
  orderID: string,
  shipmentType: string,
  noteId: string
) => {
  try {
    const response = await axios.put(`${API_URL}/api/meli/updateShipmentType`, {
      orderID,
      shipmentType,
      noteId,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar shipment type:", error);
    return { success: false, message: "Error al actualizar shipment type" };
  }
};

export const getVentasMeli = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/meli/sells`);
    return response.data;
  } catch (error) {
    console.error("Error al traer ventas desde backend:", error);
    return [];
  }
};

export const refreshDataMeli = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/meli/refreshdata`);
    return response.data;
  } catch (error) {
    console.error("Error al traer ventas desde backend:", error);
    return [];
  }
};
