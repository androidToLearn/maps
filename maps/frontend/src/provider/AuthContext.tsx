import { useQuery } from "@tanstack/react-query";
import { neighboardFeatcher } from "../utils/NighboardsFetcher";
import { useDispatch } from "react-redux";
import { replace } from "../reduxes/Neighboards.redux";
import type { AppDispatch } from "../reduxes/StoreNeighboard";
import { useEffect } from "react";
import { allJson } from "../typesschema/neighboard.type";

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
      if (data !== undefined && data !== null) {
        localStorage.setItem("neighboards", JSON.stringify(data.features));
        dispatch(replace(data.features));
      }
    }, [data, dispatch]);
  };

export const AuthContext = ({ children }: any) => {
  const dispatch = useDispatch<AppDispatch>();

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
      else{
        doQuery()
      }
    }
    else{
        doQuery()
    }
  }
  else{
    doQuery()
  }
  return children
}
