import { useUserContext } from "./AuthContext";
import type { User } from "../types/typescript";

export const useAuth = () => {
  const addUser = (
    user: User | null,
    setUser: (value: User | null) => void,
  ) => {
    setUser(user);

    if (user !== null) {
      localStorage.setItem("user", user.token);
      localStorage.setItem("isInAdmin", JSON.stringify(user.isInAdmin));
    }
  };

  const logout = (setUser: (value: User | null) => void) => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isInAdmin");
  };

  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    const isInAdmin = localStorage.getItem("isInAdmin");
    const constext = useUserContext();
    const { user, setUser } = constext;
    if (user !== null) {
      if (userInLocal !== null ) {
        user.token = userInLocal
      }
      if(isInAdmin !== null && JSON.parse(isInAdmin) !== null)
      {
        user.isInAdmin = JSON.parse(isInAdmin)
      }
      setUser(user)
      return user
    }
    return undefined
  };

  return { addUser, logout, getUser };
};
