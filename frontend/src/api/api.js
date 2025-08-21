import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api", // adjust your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (data) => api.post("/login/", data);
export const registerUser = (data) => api.post("/register/", data);
export const logoutUser = () => api.post("/logout/");

export const getOrders = () => api.get("/orders/");
export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/${id}/`, { status });


export const getMenu = () => api.get("/products/");
export const getCategories = () => api.get("/categories/");


export default api;
