import { PointTuple, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import customIcon from "../assets/images/icon-location.svg";

const customMarker = icon({
  iconUrl: customIcon,
  iconSize: [32, 32],
});

const Map = ({ coordinates }: { coordinates: PointTuple }) => {
  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={customMarker}>
        <Popup>Hello There</Popup>
      </Marker>
      <ZoomControl position={"bottomleft"} />
    </MapContainer>
  );
};
export default Map;
