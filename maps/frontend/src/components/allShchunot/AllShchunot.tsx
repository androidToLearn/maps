import TypeSearch from "../typeSearch/TypeSearch";
import AllShchunotMenu from "../allShchunotMenu/AllShchunotMenu";

export default function AllShchunot() {

  return (
    <div>
      {" "}
      <TypeSearch typeMenu={0}/>{" "}
      <AllShchunotMenu/>
    </div>
  );
}
