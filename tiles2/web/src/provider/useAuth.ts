import type { User } from "../types/typesAllProject";
import { useUserContext } from "./AuthContext";

export const useAuth = () => {
  const addUser = (
    user: User | null,
    setUser: (value: User | null) => void,
  ) => {
    setUser(user);

    if (user !== null) {
      localStorage.setItem("user", user.token);
    }
  };

  const logout = (setUser: (value: User | null) => void) => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const getUser = () => {
    const { user } = useUserContext();
    if (user !== null) {
      return user;
    }
  };

  return { addUser, logout, getUser };
};
