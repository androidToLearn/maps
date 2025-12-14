import Loader from "../components/Loader";
import { getId, getRole } from "../service/protected_service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedAdmin({ children }: any) {
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isTiles, setIsTiles] = useState<boolean>(false);
  console.log("ProtectedAdmin");
  const navigator = useNavigate();

  try {
      getRole().then((data) => {
        console.log(localStorage.getItem("token"))
      console.log("data", data);
      
      if(data === 'moderator' || data === 'viewer' || data === 'editor')
      {
        navigator('/tilePage')
        return
      }
      else if(data === 'admin'){
        setIsLoader(false)
        return
      }
      else{
        navigator('/signIn')
        return
      }
    });

    
  } catch (err) {
    navigator("/signIn");
    return;
  }

  return <div>{isLoader ? <Loader /> : children}</div>;
}
