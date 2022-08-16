import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { icon } from "./constants";

const position = [51.505, -0.09];

function makeDraggable(map, popup) {
  const pos = map.latLngToLayerPoint(popup.getLatLng());
  L.DomUtil.setPosition(popup._wrapper.parentNode, pos);
  const draggable = new L.Draggable(popup._container, popup._wrapper);
  draggable.enable();

  draggable.on("dragend", function () {
    const pos = map.layerPointToLatLng(this._newPos);
    popup.setLatLng(pos);
  });
}

export default function App() {
  const [mapRef, setMapRef] = useState(null);
  const [popupRef, setPopupRef] = useState(null);

  useEffect(() => {
    if (!mapRef || !popupRef) return;

    mapRef.on("click", function (event) {
      makeDraggable(mapRef, popupRef);
    });
  }, [mapRef, popupRef]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh" }}
      ref={setMapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup ref={setPopupRef}>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
