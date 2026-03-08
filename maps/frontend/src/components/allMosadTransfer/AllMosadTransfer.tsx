import { useSelector } from "react-redux";
import type { RootState } from "../../reduxes/StoreNeighboard";
import { mosdotHelper } from "../../utils/MosadHelper";
import type { objectMosadType } from "../../typesschema/neighboard.type";
import RowTransfer from "../rowTransfer/RowTransfer";
import classes from './allMosadTransfer.module.scss'

export default function AllMosadTransfer() {
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );
  if (neighboards === null) {
    return <></>;
  }
  return (
    <div className={classes.allRows}>
      {mosdotHelper
        .getAllMosdot(neighboards)
        .map((school: objectMosadType, index: number) => {
          return <RowTransfer key={index} school = {school}/>;
        })}
    </div>
  );
}
