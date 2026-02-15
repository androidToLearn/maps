import { createContext, useContext, useEffect } from "react";
import type { typeDataToken, User } from "../types/typescript";
import { useState } from "react";
import { fetchInstanceWithToken } from "../instance/Instance";
import { useQuery } from "@tanstack/react-query";
import type { allHistoryType } from "../types/typescript";
import { colorsEnum } from "../services/Enum";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  allHistory : allHistoryType | null;
  setAllHistory : (
      value: allHistoryType | null,
    ) => void ;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [allHistory , setAllHistory] = useState<allHistoryType |  null>([
    [
      {
        color: colorsEnum.color1,
        id: "-2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  ])
  const insertDataToUser = (
    data: typeDataToken,
    user: User | null,
    setUser: (value: User | null) => void,
  ) => {
    const userInLocalStorage = localStorage.getItem("user");
    if (
      userInLocalStorage !== undefined &&
      userInLocalStorage !== null &&
      user === null
    ) {
      setUser({
        name: data["name"],
        role: data["role"],
        idUser: data["id"],
        token: userInLocalStorage,
        isInAdmin: false,
      });
    }
  };
  const { isLoading, data } = useQuery({
    queryKey: ["tokenData"],
    queryFn: async () => {
      return await fetchInstanceWithToken().get("/login/protected");
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      insertDataToUser(data, user, setUser);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ user, setUser , allHistory , setAllHistory }}>
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
