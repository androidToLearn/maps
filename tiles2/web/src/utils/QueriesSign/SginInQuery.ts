import type { dictMessageAndAccessToken } from './../../types/typescript';
import { fetchInstance } from "../../instance/Instance";
import type { typeSignInDict } from "../../types/typescript"; 
export class SignInQuery {
  async signMutate(data: typeSignInDict) {
    const signIn = await fetchInstance().post(
      "/login/signIn",
      JSON.stringify({
        email: data["email"],
        password: data["password"],
      }),
    );
    if (signIn !== undefined) {
      return this.doNavigate(signIn, data);
    }
  }

  doNavigate(data: dictMessageAndAccessToken, dictValues: typeSignInDict) {
    if (data["message"] == "bad email or password") {
      dictValues["setMessage"](data["message"]);
    } else {
      if (data["accessToken"] === undefined) {
        return "home";
      }

      localStorage.setItem("token", data["accessToken"]);
      return data;
    }
  }
}
