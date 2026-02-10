import { createContext, useContext } from "react";
import type { User } from "../types/typescript";
import { useState } from "react";
import { fetchInstanceWithToken } from "../instance/Instance";
import type { UserInServer } from "../types/typescript";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const userInLocalStorage = localStorage.getItem("user");
  if (
    userInLocalStorage !== undefined &&
    userInLocalStorage !== null &&
    user === null
  ) {
    setUser({
      name: "",
      role: "",
      idUser: "",
      token: userInLocalStorage,
      isInAdmin: false,
    });
    fetchInstanceWithToken()
      .get("/users/userById")
      .then((data: UserInServer) => {
        setUser({
          name: data["name"],
          role: data["role"],
          idUser: data["_id"],
          token: userInLocalStorage,
          isInAdmin: false,
        });
      });
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};
