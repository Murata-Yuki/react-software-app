import { Marker } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import icon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import iconShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";

//defaultMarker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const colorMarker = (color) => {
  return L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    className: `default-marker ${color}`,
  });
};

function Markers() {
  const navigate = useNavigate();

  const cordinate2 = [70, 67];
  const handleMarkerClick = () => {
      navigate("/preview");
  };
  return (
    <>
      {/* <Marker position={cordinate1} icon={colorMarker("red")} /> */}
      <Marker position={cordinate2} icon={colorMarker("red")} eventHandlers={{ click: () => handleMarkerClick() }} />
      {/* <Marker position={cordinate3} icon={colorMarker("red")} /> */}
      {/* <Marker position={cordinate4} icon={colorMarker("red")} /> */}
    </>
  );
}
export default Markers;