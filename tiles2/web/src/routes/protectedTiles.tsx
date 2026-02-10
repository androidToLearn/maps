import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader/Loader";
import { fetchInstanceWithToken } from "../instance/Instance";
import type { messageType } from "../types/typescript";
import type { setIsLoadingType } from "../types/typescript";
export default function ProtectedTiles({ children }: any) {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log("ProtectedTiles...");

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

  console.log('return children')
  return children;
}

function isUserHasGoodToken(data: messageType, dictValues: setIsLoadingType) {
  if (data["message"] === "good") {
    dictValues["setIsLoading"](false);
    return "good";
  } else {
    return "bad";
  }
}
