import { createContext, useContext, useEffect } from "react";
import type { objectMosadType } from "../typesschema/neighboard.type";
import { updateMosadHelper } from "../utils/UpdateMosadHelper";
import type { AppDispatch, RootState } from "../reduxes/StoreNeighboard";
import { useDispatch, useSelector } from "react-redux";
import { replace } from "../reduxes/Neighboards.redux";
import type { objectMosad } from "./MosadContext";

export const MosadToFill = createContext<{ mosadToFill: React.RefObject<objectMosad> , setMosadToFill : (value : objectMosad) => void}|null>(null);

export default function SchoolToFill({
    children,
}: {
    children: React.ReactNode;
}) {
    const mosadToFill = useRef<objectMosad>({'mosad':null});
    const neighboards = useSelector(
        (state: RootState) => state.neighboards.neighboards,
    );
    useEffect(() => {
        localStorage.setItem("neighboards", JSON.stringify(neighboards));
    }
        , [mosadToFill])


    return (
        <MosadToFill.Provider value={{ mosadToFill }}>{children}</MosadToFill.Provider>
    );
}

export const useSchoolToFillContext = () => {
    const context = useContext(MosadToFill);
    if (!context) {
        throw new Error("useContext must be used within Component");
    }
    return context;
};
