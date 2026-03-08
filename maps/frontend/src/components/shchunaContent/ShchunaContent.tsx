import { useState } from "react";
import type { typeToSearch } from "../../types/TypesAllProject";
import TypeSearch from "../typeSearch/TypeSearch";
import type {
  objectMosadType,
  objectShchunaType,
} from "../../typesschema/neighboard.type";
import AllSchools from "../allSchools/AllSchools";

export default function ShchunaContent({
  shchuna,
}: {
  shchuna: objectShchunaType;
}) {
  const [toSearch, setToSearch] = useState<typeToSearch>({
    isToShowEmptyShchunot: false,
    orderToShowInAB: false,
    showColors: ["red", "yellow", "orange"],
  });

  return (
    <div>
      {" "}
      <TypeSearch setToSearch={setToSearch} />
      <AllSchools shchuna={shchuna} />
    </div>
  );
}
