import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const authenticatedInstance = axios.create({
  baseURL: baseUrl,
});

authenticatedInstance.interceptors.request.use((config : any) => {
  const Authorization = `Bearer ${localStorage.getItem("token")}`;
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: Authorization,
      "Content-Type": "application/json",
    },
  };
});
