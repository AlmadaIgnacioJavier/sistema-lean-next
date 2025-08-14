import axios from "axios";
import { API_URL } from "../constants/api";

export const getStates = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/meli/getStates`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener estados:", error);
    return { success: false, message: "Error al obtener estados" };
  }
};

export const getLocalities = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/meli/getLocalities`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener localidades:", error);
    return { success: false, message: "Error al obtener localidades" };
  }
};
