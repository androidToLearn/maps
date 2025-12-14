import { fetchInstance } from "../../../web/src/instance/Instance";

export class ProtectedQuery {
  async protectedMutate(data: any, dictValues: any) {
    localStorage.setItem("token", data["accessToken"]);
    try {
      fetchInstance(
        "/login/protected",
        this.moveToTheTilePage,
        dictValues,
        JSON.stringify({}),
        "GET"
      );
    } catch (err) {
      throw { error: err };
    }
  }

  moveToTheTilePage(data: any, dictValues: any) {
    if (data["message"] !== "bad") {
      try {
        localStorage.setItem("message", "");
        dictValues["navigate"]("/tilePage");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("bad token");
      console.log(data["message"]);
      localStorage.setItem("message", data["message"]);
      window.location.reload();
    }
  }
}
