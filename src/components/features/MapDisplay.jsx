import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import classes from "./MapDisplay.module.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: shadow,
});

const MapDisplay = ({ lat, lon, city }) => {
  return (
    <section className={classes.section} aria-label="Location map">
      <h2 className={classes.heading}>Map</h2>
      <div className={classes.mapWrapper}>
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
          className={classes.mapContainer}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>{city}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default MapDisplay;
