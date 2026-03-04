import { createContext, useContext, useState } from "react";
import type { objectShchunaType } from "../typesschema/neighboard.type";

export type contextShchunaType = {
  shchuna: objectShchunaType | null;
  setShchuna: (value: objectShchunaType | null) => void;
};
export const Shchuna = createContext<contextShchunaType | null>(null);

export default function ShchunaContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shchuna, setShchuna] = useState<objectShchunaType | null>(null);
  return (
    <Shchuna.Provider value={{ shchuna, setShchuna }}>
      {children}
    </Shchuna.Provider>
  );
}

export const useShchunaContext = () => {
  const context = useContext(Shchuna);
  if (!context) {
    throw new Error("useUserContext must be used within PolygonProvider");
  }
  return context;
};
