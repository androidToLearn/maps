
import TypeSearch from "../typeSearch/TypeSearch";
import type {
  objectShchunaType,
} from "../../typesschema/neighboard.type";
import AllSchools from "../allSchools/AllSchools";

export default function ShchunaContent({
  shchuna,
}: {
  shchuna: objectShchunaType;
}) {

  return (
    <div>
      {" "}
      <TypeSearch typeMenu={1}/>
      <AllSchools shchuna={shchuna} />
    </div>
  );
}
