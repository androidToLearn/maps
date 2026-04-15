import { Polygon } from "react-leaflet";
import { colorHelper } from "../../utils/ColorHelper";
import type { shchunot } from "../../types/TypesAllProject";
import { useStateContext } from "../../provider/StateContext";

export default function PolygonInMap({
  shchunaToShow,
  shchunaSelected,
  setShchuna,
}: shchunot) {

  const {state} = useStateContext()
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
        color: colorHelper.getColorShcuna(shchunaToShow , state),
        fillColor: colorHelper.getColorShcuna(shchunaToShow , state),
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
