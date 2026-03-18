import { useQuery } from "@tanstack/react-query";
import { neighboardFeatcher } from "../utils/NighboardsFetcher";
import { useDispatch, useSelector } from "react-redux";
import { replace } from "../reduxes/Neighboards.redux";
import type { AppDispatch, RootState } from "../reduxes/StoreNeighboard";
import { useEffect } from "react";
import { allJson } from "../typesschema/neighboard.type";
import { useMosadContext } from "./MosadContext";
import { updateMosadHelper } from "../utils/UpdateMosadHelper";

const doQuery = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading } = useQuery({
    queryKey: ["neighborhoods"], // מזהה ייחודי ל-query
    queryFn: async () => {
      //פה יש dataParse
      return await neighboardFeatcher.getNeighbords();
    },
  });
  useEffect(() => {
    console.log('insided')
    if (data !== undefined && data !== null) {
      dispatch(replace(data.features));
    }
  }, [data]);
};

export const AuthContext = ({ children }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { setMosad, mosad } = useMosadContext()
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );
  useEffect(() => {
    if (mosad !== null && neighboards !== null) {
      const resultUpdateFrom = updateMosadHelper.findMosadByChosenMosad(neighboards, mosad)
      if (resultUpdateFrom !== null) {
        const {mosadUpdated } = resultUpdateFrom
        setMosad({...mosadUpdated})
      }
    }
  }, [neighboards])

  const neighboardsFromLocalStorage = localStorage.getItem("neighboards");
  if (
    neighboardsFromLocalStorage !== undefined &&
    neighboardsFromLocalStorage !== null &&
    typeof neighboardsFromLocalStorage === "string"
  ) {
    const neighboardsAndPolygons = JSON.parse(neighboardsFromLocalStorage);
    if (neighboardsAndPolygons !== null) {
      if (allJson.safeParse(neighboardsAndPolygons).success) {
        dispatch(replace(neighboardsAndPolygons));
      }
      else {
        doQuery()
      }
    }
    else {
      doQuery()
    }
  }
  else {
    doQuery()
  }
  return children
}
