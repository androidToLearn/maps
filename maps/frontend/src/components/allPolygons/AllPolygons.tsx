import PolygonInMap from "../polygon/PolygonInMap";
import type { polygonsPropertiesType } from "../../types/TypesAllProject";
import type { objectShchunaType } from "../../typesschema/neighboard.type";
import { useShchunaContext } from "../../provider/ShchunaContext";

export default function AllPolygons({ shchunot }: polygonsPropertiesType) {
  const { shchuna, setShchuna } = useShchunaContext();
  return (
    <div>
      {shchunot.map((shchunaToShow: objectShchunaType, index: number) => {
        return <PolygonInMap shchunaToShow={shchunaToShow} key={index} shchunaSelected = {shchuna} setShchuna = {setShchuna} />;
      })}
    </div>
  );
}
