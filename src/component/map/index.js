import { CRS, LatLng, latLngBounds } from 'leaflet';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import images from "../../images/sagamihara_pc.svg"
import '../../../node_modules/leaflet/dist/leaflet.css'
import Markers from './Markers';

let imageBounds = [
  [0, 0], // padding
  [100, 100], // image dimensions
];

const OverlayImage = () => {
  const map = useMap();
  map.fitBounds(imageBounds);

  return (
    <ImageOverlay
      bounds={new latLngBounds(imageBounds)}
      url={images}
      transparent={true}
    />
  );
}

export default function Map(){
  return (
    <MapContainer
      center={new LatLng(800,800)}
      crs={CRS.Simple}
      maxZoom={5}
      minZoom={3}
      scrollWheelZoom={false}
      style={{height:1800, width:1800}} //zentai no ookisa
      >
      <OverlayImage />
      <Markers />
    </MapContainer>
  )
}