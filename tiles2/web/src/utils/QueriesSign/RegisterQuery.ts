import { fetchInstance } from "../../instance/Instance";
import { useAuth } from "../../provider/useAuth";
import type { typeRegisterMutate } from "../../types/typescript";
import type { typeDataRegister } from "../../types/typescript";

export class RegisterQuery {
  async registerMutate(data: typeRegisterMutate) {
    const response = await fetchInstance().post("/login/register", {
      email: data["email"],
      password: data["password"],
      name: data["name"],
    });
    if (response !== undefined) {
      return await this.toDo(response, data);
    }
  }

  async toDo(data: typeDataRegister, dictValues: typeRegisterMutate) {

    if ("message" in data) {
      dictValues["setMessage"](data["message"]);
      return 'bad'
    } else {
      const { addUser } = useAuth();
      const setUser = dictValues["setUser"];
       
      addUser({ name: data['name'], role: 'viewer', idUser:  data['idUser'], token: data["accessToken"], isInAdmin: false }, setUser);
      
      return "good";
    }
  }
}
