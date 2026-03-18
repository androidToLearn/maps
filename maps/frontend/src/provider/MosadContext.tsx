import { createContext, useContext, useEffect, useState } from "react";
import type { objectMosadType } from "../typesschema/neighboard.type";
import { updateMosadHelper } from "../utils/UpdateMosadHelper";
import type { AppDispatch, RootState } from "../reduxes/StoreNeighboard";
import { useDispatch, useSelector } from "react-redux";
import { replace } from "../reduxes/Neighboards.redux";

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
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (mosad !== null && neighboards !== null) {
      const resultMosadIn = updateMosadHelper.findMosadByChosenMosad(neighboards, mosad)
      if (resultMosadIn === null) {
        return
      }
      const { mosadUpdated, shchuna } = resultMosadIn

      const neighboardsUpdated = updateMosadHelper.getTheNeighboards(neighboards, mosad, shchuna)
      
      if (neighboardsUpdated !== undefined && shchuna !== null && !updateMosadHelper.isSameMosad(mosadUpdated , mosad)) {
        localStorage.setItem("neighboards", JSON.stringify(neighboards));
        dispatch(replace(neighboardsUpdated))
      }
    }
  }, [mosad])


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
