import type { objectMosadType } from "../../typesschema/neighboard.type";
import classes from "./rowSchool.module.scss";
import { colorHelper } from "../../utils/ColorHelper";
import { useStateContext } from "../../provider/StateContext";
import type { objectMosad } from "../../provider/MosadContext";
export default function RowSchool({
  school,
  setMosad,
  setTypeSelected,
}: {
    school: objectMosadType;
    setMosad: React.RefObject<objectMosad>;
  setTypeSelected: (value: number) => void;
}) {

  if (school == null)
  {
    return <></>
  }
  const {state} = useStateContext()
  return (
    <div
      className={classes.rowSchool}
      onClick={() => {
         setMosad.current['mosad'] = school
        setTypeSelected(2);
      }}
    >
      <p className={classes.textSchoolName}>{school.name}</p>
      <div
        className={classes[`color${colorHelper.getTheColorSchool(school , state)}`]}
      ></div>
    </div>
  );
}
