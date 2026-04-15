import type { objectMosadType } from "../../typesschema/neighboard.type";
import classes from "./mosadContent.module.scss";
import AllMosadTransfer from "../allMosadTransfer/AllMosadTransfer";
import type { RootState } from "../../reduxes/StoreNeighboard";
import { useSelector } from "react-redux";
import { useMosadContext, type objectMosad } from "../../provider/MosadContext";

export default function MosadContent({
  mosad,
  setIsShowRelative,
  isShowRelative,
}: {
    mosad: React.RefObject<objectMosad | null>;
  setIsShowRelative: (value: boolean) => void;
  isShowRelative: boolean;
}) {

  const clickSendHome = () => {
    if(mosad!==null && mosad.current !== null)
    {
      (mosad.current['mosad'] as objectMosadType).total_students = 0
    }
    const neighboards = useSelector(
      (state: RootState) => state.neighboards.neighboards,
    );
    if (neighboards !== null) {
      localStorage.setItem("neighboards", JSON.stringify(neighboards));
    }
  }
  
  if(mosad.current == null)
  {
    return <></>
  }
  const theMosadCurrentToManage = mosad.current['mosad']
  if (theMosadCurrentToManage == null)
  {
    return <></>
  }
  return (
    <div>
      <p className={classes.mainP}>{theMosadCurrentToManage.name}</p>
      <div className={classes.mainContext}>
        <p className={classes.textAddress}>{theMosadCurrentToManage.address}</p>
        <p className={classes.psik}>,</p>
        <p className={classes.textType}>{theMosadCurrentToManage.type}</p>
      </div>
      <div className={classes.subContent}>
        <p className={classes.namePlaceText}>כמות תלמידים</p>
        <p className={classes.dataPlace}>{theMosadCurrentToManage.total_students}</p>
        <p className={classes.namePlaceText}>יכול להכיל</p>
        <p className={classes.dataPlace}>{theMosadCurrentToManage.shelter_area}</p>
      </div>
      <div className={classes.thierdContext}>
        <p className={classes.textTheirdType}>מקומות פנויים</p>
        <div className={classes.textThierdNumber}>
          <p className={classes.number}>
            {theMosadCurrentToManage.shelter_area - theMosadCurrentToManage.total_students}
          </p>
        </div>
      </div>
      <div className={classes.fourRow}>
        <p className={classes.textRight}>העבר אל</p>
        <button className={classes.btnHome} onClick={() => {
          clickSendHome()
        }}>שלח הביתה</button>
        <input
          type="button"
          className={classes.btnSearch}
          onClick={() => {
            setIsShowRelative(!isShowRelative);
          }}
        />
      </div>


      <AllMosadTransfer />
    </div>
  )
}
