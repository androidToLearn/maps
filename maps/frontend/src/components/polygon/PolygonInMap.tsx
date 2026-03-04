import { Polygon } from "react-leaflet";
import { colorHelper } from "../../utils/ColorHelper";
import type { shchunot } from "../../types/TypesAllProject";

export default function PolygonInMap({
  shchunaToShow,
  shchunaSelected,
  setShchuna,
}: shchunot) {
  if(shchunaToShow === null)
  {
    return <></>
  }
  if (
    shchunaSelected !== null &&
    shchunaSelected.properties.UniqueId == shchunaToShow.properties.UniqueId
  ) {
    return <></>;
  }
  return (
    <Polygon
      positions={shchunaToShow.geometry.coordinates}
      pathOptions={{
        color: "white",
        fillColor: colorHelper.getColorShcuna(shchunaToShow),
        fillOpacity: 0.5,
      }}
      eventHandlers={{
        click: () => {
          setShchuna(shchunaToShow);
        },
      }}
    />
  );
}
