import type { dictMessageAndAccessToken } from "../../types/typesAllProject";
import { fetchInstance } from "../../instance/Instance";
import type { typeSignInDict } from "../../types/typesAllProject";
import { useAuth } from "../../provider/useAuth";
export class SignInQuery {
  async signMutate(data: typeSignInDict) {
    const signIn = await fetchInstance().post("/login/signIn", {
      email: data["email"],
      password: data["password"],
    });
    if (signIn !== undefined) {
      return this.doNavigate(signIn, data);
    }
  }

  doNavigate(data: dictMessageAndAccessToken, dictValues: typeSignInDict) {
    const setUser = dictValues["setUser"];
    const { addUser } = useAuth();
    if (data["message"] == "bad email or password") {
      dictValues["setMessage"](data["message"]);
    } else {
      if (data["accessToken"] === undefined) {
        return "home";
      }
      addUser(
        {
          name: data["name"],
          role: data["role"],
          idUser: data["idUser"],
          token: data["accessToken"],
          isInAdmin: false,
        },
        setUser,
      );
    }
    return data;
  }
}
