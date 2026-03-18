import { useSelector } from "react-redux";
import type { RootState } from "../../reduxes/StoreNeighboard";
import { mosdotHelper } from "../../utils/MosadHelper";
import type { objectMosadType } from "../../typesschema/neighboard.type";
import RowTransfer from "../rowTransfer/RowTransfer";
import classes from './allMosadTransfer.module.scss'
import { schoolsHelper } from "../../utils/SchoolsHelper";
import { useTypeSearchContext } from "../../provider/TypeSearchContext";
import { useMosadContext } from "../../provider/MosadContext";

export default function AllMosadTransfer() {
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );
  if (neighboards === null) {
    return <></>;
  }
  const {toSearch} = useTypeSearchContext()
  const {mosad} = useMosadContext()
  if(mosad === null)
  {
    return <></>
  }
  const { schools, shchunot } = mosdotHelper
    .getAllMosdot(neighboards)
  const mosadToShow = schoolsHelper.getTheSchoolsTransfer(schools, toSearch, mosad)
  return (
    <div className={classes.allRows}>
      {
        mosadToShow.map((school: objectMosadType, index: number) => {
          return <RowTransfer key={index} school={school} shchuna = {shchunot[index]}/>;
        })}
    </div>
  );
}
