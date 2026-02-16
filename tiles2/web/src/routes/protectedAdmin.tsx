import { useNavigate } from "react-router-dom";
import { useUserContext } from "../provider/AuthContext";
import Loader from "../components/Loader/Loader";
import { useState } from "react";

export default function ProtectedAdmin({ children }: any) {
  const navigator = useNavigate();
  const [isLoad, setIsLoad] = useState(true);
  const { user } = useUserContext();
  if (user === null) {
    return <></>;
  }
  if (user.role === "admin" && isLoad) {
    setIsLoad(false);
  } else {
    try {
      if (user.role !== "admin") {
        //navigator("/signIn");
      }
    } catch (err) {}
  }

  return isLoad ? <Loader /> : children;
}
