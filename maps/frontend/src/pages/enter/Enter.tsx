import { useSelector } from "react-redux";
import type { RootState } from "../../reduxes/StoreNeighboard";
import { useEffect } from "react";
export default function Enter() {
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );
  useEffect(() => {
    console.log(neighboards);
  }, [neighboards]);
  return <></>
}
