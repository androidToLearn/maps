import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import classes from "./theMap.module.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../reduxes/StoreNeighboard";
import AllMarks from "../allMarks/AllMarks";
import AllPolygons from "../allPolygons/AllPolygons";
import { useState } from "react";
import type { propertiesMapTypes } from "../../types/TypesAllProject";
import { useShchunaContext } from "../../provider/ShchunaContext";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

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
      </MapContainer>
    </div>
  );
}
