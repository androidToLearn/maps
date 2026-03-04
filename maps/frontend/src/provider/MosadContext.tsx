import { createContext, useContext, useState } from "react";
import type { objectMosadType } from "../typesschema/neighboard.type";

export type objectMosadContext = {
  mosad: objectMosadType | null;
  setMosad: (value: objectMosadType | null) => void;
};
export const Mosad = createContext<objectMosadContext | null>(null);

export default function MosadContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mosad, setMosad] = useState<objectMosadType | null>(null);
  return (
    <Mosad.Provider value={{ mosad, setMosad }}>{children}</Mosad.Provider>
  );
}

export const useMosadContext = () => {
  const context = useContext(Mosad);
  if (!context) {
    throw new Error("useUserContext must be used within PolygonProvider");
  }
  return context;
};
