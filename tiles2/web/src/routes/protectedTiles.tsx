import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader/Loader";
import { fetchInstanceWithToken } from "../instance/Instance";
export default function ProtectedTiles({ children }: any) {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  fetchInstanceWithToken()
    .get("/login/protected")
    .then((data) => {
      if (isUserHasGoodToken(data, { setIsLoading: setIsLoading }) === "bad") {
        navigator("/signIn");
      }
    })
    .catch((error) => {
      navigator("/signIn");
    });

  if (isLoading) {
    return <Loader />;
  }
  return children;
}

function isUserHasGoodToken(data: any, dictValues: any) {
  if (data["message"] === "good") {
    dictValues["setIsLoading"](false);
    return "good";
  } else {
    return "bad";
  }
}
