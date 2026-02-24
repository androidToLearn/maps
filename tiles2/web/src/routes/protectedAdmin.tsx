import { useNavigate } from "react-router-dom";
import { fetchInstanceWithToken } from "../instance/Instance";
import { tokenSchema } from "../typesschema/token.types";
import { useState } from "react";
import Loader from "../components/Loader/Loader";

export default function ProtectedAdmin({ children }: any) {
  const navigator = useNavigate();
  const [isLoad, setIsLoad] = useState(true);
  fetchInstanceWithToken()
    .get("/login/protected")
    .then((data) => {
      if (data !== undefined) {
        const result = tokenSchema.safeParse(data);
        if (result.success) {
          if (data["role"] === "admin") {
            setIsLoad(false);
          } else {
            navigator("/signIn");
          }
        } else {
          navigator("/signIn");
        }
      } else {
        navigator("/signIn");
      }
    })
    .catch(() => {
      navigator("/signIn");
    });
  return isLoad ? <Loader /> : children;
}
