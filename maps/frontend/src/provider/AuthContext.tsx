import { useQuery } from "@tanstack/react-query";
import { neighboardFeatcher } from "../utils/NighboardsFetcher";
import { useDispatch } from "react-redux";
import { replace } from "../reduxes/Neighboards.redux";
import type { AppDispatch } from "../reduxes/StoreNeighboard";
import { useEffect } from "react";
import { allJson } from "../typesschema/neighboard.type";
import AllShchunot from "../components/allShchunot/AllShchunot";
import { shchunot } from "../typesschema/neighboard.type";

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

  const neighboardsFromLocalStorage = localStorage.getItem("neighboards");
  if (
    neighboardsFromLocalStorage !== undefined &&
    neighboardsFromLocalStorage !== null &&
    typeof neighboardsFromLocalStorage === "string"
  ) {
    const neighboardsAndPolygons = JSON.parse(neighboardsFromLocalStorage);
    if (neighboardsAndPolygons !== null) {
      if (shchunot.safeParse(neighboardsAndPolygons).success) {
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
