import { Marker } from "react-leaflet";
import L from "leaflet";
import icon from "../../../../node_modules/leaflet/dist/images/marker-icon.png"
import iconShadow from "../../../../node_modules/leaflet/dist/images/marker-shadow.png";

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

function Markers({floor}) {
  const cordinate2 = [50, 9]; // center
  const cordinate3 = [50, 27];
  const cordinate4 = [90, 9];
  const cordinate5 = [5,9];

  if (floor === 5) {
    return(
      <>
        <Marker position={cordinate2} icon={colorMarker("blue")} />
        <Marker position={cordinate3} icon={colorMarker("red")} />
        <Marker position={cordinate4} icon={colorMarker("red")} />
        <Marker position={cordinate5} icon={colorMarker("red")} />
      </>
    )
    
  }else {
    return (
      <>
        <Marker position={cordinate2} icon={colorMarker("blue")} />
        <Marker position={cordinate3} icon={colorMarker("red")} />
        <Marker position={cordinate4} icon={colorMarker("red")} />
        <Marker position={cordinate5} icon={colorMarker("red")} />
      </>
    );
  }
}
export default Markers;