import type {
  objectMosadType,
  objectShchunaType,
} from "../../typesschema/neighboard.type";
import RowSchool from "../rowSchool/RowSchool";
import classes from "./allSchools.module.scss";
import { useMosadContext } from "../../provider/MosadContext";
import { useTypeSelectedContext } from "../../provider/TypeContext";
import { schoolsHelper } from "../../utils/SchoolsHelper";
import { useTypeSearchContext } from "../../provider/TypeSearchContext";
export default function AllSchools({
  shchuna,
}: {
  shchuna: objectShchunaType;
}) {
  const { setMosad } = useMosadContext();
  const {setTypeSelected} = useTypeSelectedContext()
  const {toSearch} = useTypeSearchContext()

  const schools = schoolsHelper.getTheSchools(shchuna.properties.schools , toSearch)
  return (
    <div className={classes.allRows}>
      {schools.map(
        (school: objectMosadType, index: number) => {
          return <RowSchool school={school} key={index} setMosad={setMosad} setTypeSelected={setTypeSelected}/>;
        },
      )}
    </div>
  );
}
