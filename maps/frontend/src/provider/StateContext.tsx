import { createContext, useContext, useState } from "react";

export type numberType = {
  state: number | string ;
  setState: (value: number | string) => void;
};
export const State = createContext<numberType | null>(null);

export default function ShchunaContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<number | string>(1);
  return (
    <State.Provider value={{ state, setState }}>
      {children}
    </State.Provider>
  );
}

export const useStateContext = () => {
  const context = useContext(State);
  if (!context) {
    throw new Error("useUserContext must be used within PolygonProvider");
  }
  return context;
};
