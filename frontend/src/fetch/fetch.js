import axios from "axios";

const apiCocina = import.meta.env.VITE_API_COCINA;
const apiBodega = import.meta.env.VITE_API_BODEGA;

export const fetchStatistics = async () => {
  try {
    const response = await axios.get(`${apiBodega}/api/statistics`);
    return response.data;
  } catch (error) {
    throw new Error("Error al cargar los datos");
  }
};

export const fetchPurchases = async () => {
  try {
    const response = await axios.get(`${apiBodega}/api/purchases`);
    return response.data;
  } catch (error) {
    throw new Error("Error al cargar los datos");
  }
};

export const fetchFinishedOrders = async () => {
  try {
    const response = await axios.get(`${apiCocina}/api/orders/finished-orders`);
    return response.data;
  } catch (error) {
    throw new Error("Error al cargar los datos");
  }
};

export const fetchPendingOrders = async () => {
  try {
    const response = await axios.get(`${apiCocina}/api/orders/pending-orders`);
    return response.data;
  } catch (error) {
    throw new Error("Error al cargar los datos");
  }
};
