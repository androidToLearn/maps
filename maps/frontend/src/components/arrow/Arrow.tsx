import { Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Arrow() {
    const positions = [
        [34.79624294387394, 32.130387818159626],
        [32.09, 34.79],
    ];

    const lastPoint = positions[positions.length - 1];

    const triangleIcon = new window.L.DivIcon({
        html: `<div style="
      width: 0;
      height: 0;
      border-left: 10rem solid transparent;
      border-right: 10rem solid transparent;
      border-bottom: 10rem solid red;
    "></div>`,
        className: "",
        iconSize: [20, 20],
    });

    return <div> <Polyline positions={positions} color="blue" />

        <Marker position={lastPoint} icon={triangleIcon} /></div>
           
       
}