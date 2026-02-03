import type { dictValuesUserInsert } from "./../../types/typescript";
import { fetchInstanceWithToken } from "../../instance/Instance";
import type { typeDataUser } from "./../../types/typescript";

export class UserQuery {
  async setUserMutate() {
    const response = await fetchInstanceWithToken().get("/login/protected");

    if (response !== undefined) {
      return response;
    }
    return undefined;
  }

  async fetchUserDataById(dictValues: dictValuesUserInsert) {
    //take the id in server
    const response = await fetchInstanceWithToken().get("/users/userById");
    if (response !== undefined) {
      this.setData(response, dictValues);
    } else {
      return "bad";
    }
  }

  setData(data: typeDataUser, dictValues: dictValuesUserInsert) {
    dictValues["setName"](data["name"]);
    dictValues["setProfile"](data["role"]);
    dictValues["setIdUser"](data["_id"]);
  }
}
