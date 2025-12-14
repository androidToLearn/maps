import { ProtectedQuery } from "./ProtectedQuery";
import { fetchInstanceWithoutToken } from "../../../web/src/instance/Instance";

export class RegisterQuery {
  async registerMutate(data: any, dictValues: any) {
    try {
      fetchInstanceWithoutToken(
        "/login/register",
        this.toDo,
        dictValues,
        JSON.stringify({
          email: data["email"],
          password: data["password"],
          name: data["name"],
          role: "viewer",
        }),
        "post"
      );
    } catch (err) {
      console.log("error1error", err);
    }
  }

  toDo(data: any, dictVakues: any) {
    if ("message" in data) {
      dictVakues["setMessage"](data["message"]);
    } else {
      localStorage.setItem("token", data["accessToken"]);
      const protyectedQuery = new ProtectedQuery();
      protyectedQuery.protectedMutate(
        { accessToken: data["accessToken"] },
        { navigate: dictVakues["navigate"] }
      );
    }
  }
}
