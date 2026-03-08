import type {
  objectMosadType,
  objectShchunaType,
} from "../../typesschema/neighboard.type";
import RowSchool from "../rowSchool/RowSchool";
import classes from "./allSchools.module.scss";
import { useMosadContext } from "../../provider/MosadContext";
import { useTypeSelectedContext } from "../../provider/TypeContext";
export default function AllSchools({
  shchuna,
}: {
  shchuna: objectShchunaType;
}) {
  const { setMosad } = useMosadContext();
  const {setTypeSelected} = useTypeSelectedContext()

  return (
    <div className={classes.allRows}>
      {shchuna.properties.schools.map(
        (school: objectMosadType, index: number) => {
          return <RowSchool school={school} key={index} setMosad={setMosad} setTypeSelected={setTypeSelected}/>;
        },
      )}
    </div>
  );
}
