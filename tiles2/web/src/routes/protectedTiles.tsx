import { useUserContext } from "../provider/AuthContext";
import Loader from "../components/Loader/Loader";

export default function ProtectedTiles({ children }: any) {
  console.log("ProtectedTiles...");
  const { user } = useUserContext();
  //לא יכול להיות תוקן מזוייף כי יש user
  if (user !== null && user.token !== null) {
    return children;
  }
  return <Loader/>;
}
