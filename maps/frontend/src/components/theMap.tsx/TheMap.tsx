import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import classes from "./theMap.module.scss";
import AllMarks from "../allMarks/AllMarks";
import AllPolygons from "../allPolygons/AllPolygons";
import type { propertiesMapTypes } from "../../types/TypesAllProject";
import Arrow from "../arrow/Arrow";
import { useShchunaContext } from "../../provider/ShchunaContext";

export default function TheMap({
  position,
  zoom,
  shchunot,
}: propertiesMapTypes) {
  const { shchuna } = useShchunaContext();
  return (
    <div className={classes.theMapDiv}>
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ width: "100vw", height: "100vh" }}
        className={classes.divMap1}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <AllMarks shchunaSelected={shchuna} />
        <AllPolygons shchunot={shchunot} />
        <Arrow />

      </MapContainer>
    </div>
  );
}
