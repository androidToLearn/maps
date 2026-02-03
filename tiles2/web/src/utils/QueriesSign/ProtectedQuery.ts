import { fetchInstanceWithToken } from "../../instance/Instance";
import type { typeDataRegister } from "../../types/typescript";
export class ProtectedQuery {
  async protectedMutate(data: typeDataRegister) {
    localStorage.setItem("token", data["accessToken"]);
    const response = await fetchInstanceWithToken().get("/login/protected");
    if (response !== undefined) {
      return this.moveToTheTilePage(response["message"]);
    }
  }

  moveToTheTilePage(data: string) {
    if (data !== "bad") {
      try {
        localStorage.setItem("message", "");
        return 
      } catch (err) {
        return "moveBack";
      }
    } else {
      localStorage.setItem("message", data);
      return "moveBack";
    }
  }
}
