import { useNavigate } from "react-router-dom";
import { fetchInstance } from "../instance/Instance";
import { useState } from "react";
import Loader from "../components/Loader";
export default function ProtectedTiles({ children }: any) {
  console.log("ProtectedTiles render");
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  fetchInstance(
    "/login/protected",
    isUserHasGoodToken,
    { setIsLoading: setIsLoading, navigate: navigator },
    JSON.stringify({}),
    "GET"
  );

  if (isLoading) {
    return <Loader />;
  }
  return children;
}

function isUserHasGoodToken(data: any, dictValues: any) {
  if (data["message"] === "good") {
    dictValues["setIsLoading"](false);
  } else {
    dictValues["navigator"]("/signIn");
  }
}
