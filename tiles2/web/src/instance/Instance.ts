import {
  authenticatedInstance,
  authenticatedInstanceWithoutToken,
} from "./CreateRouteInstance";
import type { TypePostSomething } from "../types/typescript";
import type { typeSignOrRegister } from "../types/typescript";

export const fetchInstanceWithToken = () => {
  return {
    async get(url: string) {
      const response = await authenticatedInstance.get(url);
      if (response.status === 200 || response.status == 201) {
        return response.data;
      } else {
        throw new Error("status code " + response.status);
      }
    },

    async post(url: string, body: TypePostSomething) {
      const response = await authenticatedInstance.post(url, body);
      if (response.status === 200 || response.status == 201) {
        return response.data;
      } else {
        throw new Error("status code " + response.status);
      }
    },
  };
};

export const fetchInstance = () => {
  return {
    async get(url: string) {
      const response = await authenticatedInstanceWithoutToken.get(url);
      if (response.status === 200 || response.status == 201) {
        return response.data;
      } else {
        throw new Error("status code " + response.status);
      }
    },

    async post(url: string, body: typeSignOrRegister) {
      console.log(body);
      const response = await authenticatedInstanceWithoutToken.post(url, body);
      if (response.status === 200 || response.status == 201) {
        return response.data;
      } else {
        throw new Error("status code " + response.status);
      }
    },
  };
};
