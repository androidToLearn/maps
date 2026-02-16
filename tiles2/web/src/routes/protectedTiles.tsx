import { useUserContext } from "../provider/AuthContext";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function ProtectedTiles({ children }: any) {
  console.log("ProtectedTiles...");
  const { user } = useUserContext();
  const navigate = useNavigate()
  console.log('-user' ,user)
  //לא יכול להיות תוקן מזוייף כי יש user
  if (user !== null && user.token !== null) {
    return children;
  }
  else{
    navigate('/signIn')
  }
  return <Loader/>;
}
