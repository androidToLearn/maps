import axios from "axios";

export const fetchInstanceWithoutToken = (
  baseURL1: string,
  methodToDo: any,
  dictValues: any,
  json: any,
  methods: string
) => {

  const instance = axios.create();
  instance.interceptors.request.use((config: any) => {
    return config;
  });
  instance.interceptors.response.use(
    (response: any) => {
      methodToDo(response.data, dictValues);
      return response;
    },
    (error: any) => {
      if (error.response && error.response.status === 401) {
        dictValues["navigate"]("/signIn");
      }
    }
  );

  instance({
    baseURL: import.meta.env.VITE_BASE_URL + baseURL1,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    data: json,
    method: methods,
  });
};

export const fetchInstance = (
  baseURL1: string,
  methodToDo: any,
  dictValues: any,
  json: any,
  methods: string
) => {
  const instance = axios.create({});

  instance.interceptors.request.use((config: any) => {
    if (localStorage.getItem("token") !== null) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    } else {
      dictValues["navigate"]("/signIn");
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: any) => {
      methodToDo(response.data, dictValues);
      return response;
    },
    (error: any) => {
      localStorage.removeItem("token");
      if (error.response && error.response.status !== 200) {
        dictValues["navigate"]("/signIn");
      }
    }
  );

  instance({
    baseURL: import.meta.env.VITE_BASE_URL + baseURL1,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    data: json,
    method: methods,
  });
};
