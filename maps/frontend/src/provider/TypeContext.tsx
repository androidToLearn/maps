import { createContext, useContext, useState } from "react";

export type typeSelectedType = {
  typeSelected: number;
  setTypeSelected: (value: number) => void;
};
export const TypeSelected = createContext<typeSelectedType | null>(null);

export default function TypeSelectedCompon({
  children,
}: {
  children: React.ReactNode;
}) {
  const [typeSelected, setTypeSelected] = useState<number>(0);
  return (
    <TypeSelected.Provider value={{ typeSelected, setTypeSelected }}>
      {children}
    </TypeSelected.Provider>
  );
}

export const useTypeSelectedContext = () => {
  const context = useContext(TypeSelected);
  if (!context) {
    throw new Error("useTypeSelected must be used within PolygonProvider");
  }
  return context;
};
