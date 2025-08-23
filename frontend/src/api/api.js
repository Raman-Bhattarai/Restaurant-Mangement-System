import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token correctly
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // For DRF TokenAuthentication, use "Token <token>"
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const loginUser = (data) => api.post("/login/", data);
export const registerUser = (data) => api.post("/register/", data);
export const logoutUser = () => api.post("/logout/");

// Get currently logged-in user
export const getUserProfile = () => api.get("/user/me/");


// Orders
export const placeOrder = (data) => api.post("/orders/", data);
export const getOrders = () => api.get("/orders/");
export const updateOrder = (id, data) => api.patch(`/orders/${id}/`, data);

// Products & Categories
export const getMenu = () => api.get("/products/");
export const getCategories = () => api.get("/categories/");

export default api;
