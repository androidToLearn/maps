import { ProtectedQuery } from "./ProtectedQuery";
import { fetchInstance } from "../../instance/Instance";
import type { typeRegisterMutate } from "../../types/typescript";
import type { typeDataRegister } from "../../types/typescript";

export class RegisterQuery {
  async registerMutate(data: typeRegisterMutate) {
    const response = await fetchInstance().post(
      "/login/register",
      JSON.stringify({
        email: data["email"],
        password: data["password"],
        name: data["name"],
      }),
    );
    if (response !== undefined) {
      return await this.toDo(response ,data);
    }
  }

  async toDo(data: typeDataRegister , dictValues : typeRegisterMutate) {
    if ("message" in data) {
      dictValues["setMessage"](data["message"]);
    } else {
      localStorage.setItem("token", data["accessToken"]);
      const protyectedQuery = new ProtectedQuery();
      return await protyectedQuery.protectedMutate(
        data,
      );
    }
  }
}
