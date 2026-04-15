import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { objectMosadType } from "../typesschema/neighboard.type";
import { updateMosadHelper } from "../utils/UpdateMosadHelper";
import type { AppDispatch, RootState } from "../reduxes/StoreNeighboard";
import { useDispatch, useSelector } from "react-redux";
import { replace } from "../reduxes/Neighboards.redux";


export const Mosad = createContext<{ 'mosad': objectMosad, 'setMosad': (value: objectMosad)=>void} | null>(null);

export type objectMosad = { 'mosad': objectMosadType | null }

export default function MosadContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mosad , setMosad] = useState<objectMosad>({'mosad':null})
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );

  useEffect(() => {
    localStorage.setItem("neighboards", JSON.stringify(neighboards));
  }
    , [mosad])


  return (
    <Mosad.Provider value={{mosad , setMosad}}>{children}</Mosad.Provider>
  );
}

export const useMosadContext = () => {
  const context = useContext(Mosad);
  if (!context) {
    throw new Error("useUserContext must be used within PolygonProvider");
  }
  return context;
};
