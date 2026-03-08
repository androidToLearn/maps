import type { objectMosadType } from "../../typesschema/neighboard.type";
import classes from "./rowTransfer.module.scss";
import { colorHelper } from "../../utils/ColorHelper";
import { useState } from "react";

export default function RowTransfer({ school }: { school: objectMosadType }) {
  const [isToShowT, setIsToShowT] = useState(false);
  return (
    <div className={classes.allRow}>
      <div
        className={classes.rowTransfer}
        onClick={() => {
          setIsToShowT(!isToShowT);
        }}
      >
        <p className={classes.km}>3קמ</p>
        <p className={classes.text}>{school.name}</p>
        <div
          className={classes[`color${colorHelper.getTheColorSchool(school)}`]}
        >
          <p className={classes.totalText}>
            {school.shelter_area - school.total_students}
          </p>
        </div>
      </div>

      {isToShowT ? (
        <div className={classes.underContent}>
          <div className={classes.twobuttons}>
            <button className={classes.startButton}>העבר</button>
            <input type="number" className={classes.endButton} placeholder={'כמות ל'}/>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
