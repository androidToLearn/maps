import type { shchunaSelected } from "../../types/TypesAllProject";
import type { objectMosadType } from "../../typesschema/neighboard.type";
import Mark from "../marks/Mark";
import { colorHelper } from "../../utils/ColorHelper";
import { useStateContext } from "../../provider/StateContext";

export default function AllMarks({ shchunaSelected }: shchunaSelected) {
  if (shchunaSelected === null) {
    return <></>;
  }
  const {state} = useStateContext()
  return (
    <div>
      {shchunaSelected.properties.schools.map(
        (school: objectMosadType, i: number) => {
          return (
            <Mark
              key={i}
              position={[school.longitude, school.latitude]}
              props={school.address}
              color={colorHelper.getTheColorSchool(school , state)}
            ></Mark>
          );
        },
      )}
    </div>
  );
}
