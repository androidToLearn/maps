import type { User } from "../types/typescript";

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
    const user = localStorage.getItem("user");
    if (user !== null) return JSON.parse(user);
  };

  return { addUser, logout, getUser };
};
