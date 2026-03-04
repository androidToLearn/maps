import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import classes from "./mark.module.scss";
import type { markPropertiesType } from "../../types/TypesAllProject";

export default function Mark({ position, props, color }: markPropertiesType) {
  const myIcon = L.icon({
    iconUrl: "public/redschool.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: classes[`circle${color}`],
  });
  return (
    <Marker position={position} icon={myIcon}>
      <Popup>{props}</Popup>
    </Marker>
  );
}
