import { fetchInstanceWithoutToken } from "../../../web/src/instance/Instance";

export class SignInQuery {
  signMutate(data: any) {
    try {
      fetchInstanceWithoutToken(
        "/login/signIn",
        this.doNavigate,
        data,
        JSON.stringify({
          email: data["email"],
          password: data["password"],
        }),
        "post"
      );
    } catch (err) {
      throw { error: err };
    }
  }

  doNavigate(data: any, dictValues: any) {
    if (data["message"] == "bad email or password") {
      dictValues["setMessage"](data["message"]);
    } else {
      const navigator = dictValues["navigate"];
      console.log(data["accessToken"]);
      if (data["accessToken"] === undefined) {
        console.log("bad token");
        navigator("/signIn");
      }

      localStorage.setItem("token", data["accessToken"]);
      console.log(localStorage.getItem("token"));

      dictValues["mutation"].mutate({
        accessToken: data["accessToken"],
        navigate: dictValues["navigate"],
      });
    }
  }
}
