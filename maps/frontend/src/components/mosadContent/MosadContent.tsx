import type { objectMosadType } from "../../typesschema/neighboard.type";
import classes from "./mosadContent.module.scss";
import AllMosadTransfer from "../allMosadTransfer/AllMosadTransfer";

export default function MosadContent({
  mosad,
  setIsShowRelative,
  isShowRelative,
}: {
  mosad: objectMosadType;
  setIsShowRelative: (value: boolean) => void;
  isShowRelative: boolean;
}) {
 
  return (
    <div>
      <p className={classes.mainP}>{mosad.name}</p>
      <div className={classes.mainContext}>
        <p className={classes.textAddress}>{mosad.address}</p>
        <p className={classes.psik}>,</p>
        <p className={classes.textType}>{mosad.type}</p>
      </div>
      <div className={classes.subContent}>
        <p className={classes.namePlaceText}>כמות תלמידים</p>
        <p className={classes.dataPlace}>{mosad.total_students}</p>
        <p className={classes.namePlaceText}>יכול להכיל</p>
        <p className={classes.dataPlace}>{mosad.shelter_area}</p>
      </div>
      <div className={classes.thierdContext}>
        <p className={classes.textTheirdType}>מקומות פנויים</p>
        <div className={classes.textThierdNumber}>
          <p className={classes.number}>
            {mosad.shelter_area - mosad.total_students}
          </p>
        </div>
      </div>
      <div className={classes.fourRow}>
        <p className={classes.textRight}>העבר אל</p>
        <button className={classes.btnHome}>שלח הביתה</button>
        <input
          type="button"
          className={classes.btnSearch}
          onClick={() => {
            setIsShowRelative(!isShowRelative);
          }}
        />
      </div>

       
    <AllMosadTransfer/>
    </div>
  );
}
