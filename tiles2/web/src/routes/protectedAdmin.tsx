import { useNavigate } from "react-router-dom";
import { useUserContext } from "../provider/AuthContext";
import { getRole } from "../services/protected_service";
import Loader from "../components/Loader/Loader";
import { useState } from "react";

export default function ProtectedAdmin({ children }: any) {
  const navigator = useNavigate();
  const [isLoad , setIsLoad] = useState(true)
  const { user } = useUserContext();
  if (user === null) {
    navigator("/signIn");
    return <></>;
  }

  getRole().then((data) => {
    if (data === "admin") {
      setIsLoad(false)
    }
  }).catch((err) => {
    navigator('/signIn')
  });

  return isLoad ? <Loader/> : children;
}
