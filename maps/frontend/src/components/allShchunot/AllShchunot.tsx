import { useState } from "react";
import type { typeToSearch } from "../../types/TypesAllProject";
import TypeSearch from "../typeSearch/TypeSearch";
import AllShchunotMenu from "../allShchunotMenu/AllShchunotMenu";

export default function AllShchunot() {
  const [toSearch, setToSearch] = useState<typeToSearch>({
    isToShowEmptyShchunot: false,
    orderToShowInAB: false,
    showColors: ["red", "yellow", "orange"],
  });
  return (
    <div>
      {" "}
      <TypeSearch setToSearch={setToSearch} />{" "}
      <AllShchunotMenu/>
    </div>
  );
}
