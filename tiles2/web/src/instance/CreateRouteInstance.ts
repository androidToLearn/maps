import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const authenticatedInstance = axios.create({
  baseURL: baseUrl,
});

export const authenticatedInstanceWithoutToken = axios.create({
  baseURL: baseUrl,
});

authenticatedInstance.interceptors.request.use((config: any) => {
  const user = localStorage.getItem("user");
  if (user !== null) {
      const Authorization = `Bearer ${user}`;
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: Authorization,
          "Content-Type": "application/json",
        },
      };
    }
  } 
);
