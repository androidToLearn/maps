import { fetchInstanceWithToken } from "../../instance/Instance";
export class ProtectedQuery {
  async protectedMutate() {
    const response = await fetchInstanceWithToken().get("/login/protected");
    if (response !== undefined) {
      return this.moveToTheTilePage(response["message"]);
    }
  }

  moveToTheTilePage(data: string) {
    if (data !== "bad") {
      try {
        localStorage.setItem("message", "");
        return data;
      } catch (err) {
        return "moveBack";
      }
    } else {
      localStorage.setItem("message", data);
      return "moveBack";
    }
  }
}
