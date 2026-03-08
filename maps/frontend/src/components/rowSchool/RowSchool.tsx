import type { objectMosadType } from "../../typesschema/neighboard.type";
import classes from "./rowSchool.module.scss";
import { colorHelper } from "../../utils/ColorHelper";
export default function RowSchool({
  school,
  setMosad,
  setTypeSelected,
}: {
  school: objectMosadType;
  setMosad: (value: objectMosadType) => void;
  setTypeSelected: (value: number) => void;
}) {
  return (
    <div
      className={classes.rowSchool}
      onClick={() => {
        setMosad(school);
        setTypeSelected(2);
      }}
    >
      <p className={classes.textSchoolName}>{school.name}</p>
      <div
        className={classes[`color${colorHelper.getTheColorSchool(school)}`]}
      ></div>
    </div>
  );
}
