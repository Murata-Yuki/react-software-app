import { useEffect, useState } from "react";
import { CRS, LatLng, latLngBounds } from "leaflet";
import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import "../../../../node_modules/leaflet/dist/leaflet.css";
import AirplaneMarker from "./AirplaneMarker";
import Markers from './Markers';
import axios from 'axios'; // axiosをインポート

let imageBounds = [
  [0, 0], // padding
  [90, 30], // image dimensions
];

// API経由で画像URLを取得
const fetchFloorImages = async () => {
  try {
    const response = await axios.get('http://localhost:8080/floorImageDB');
    const images = response.data.map(image => image.url); // URLのリストを作成
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

const OverlayImage = ({ floor }) => {
  const map = useMap();
  const [currentImage, setImage] = useState(null);
  const [floorImages, setFloorImages] = useState([]);
  const [imageList, setImageList] = useState([]); // 画像のリストを保存

  useEffect(() => {
    // 初期読み込み時にAPIから画像を取得
    fetchFloorImages().then((images) => {
      setFloorImages(images);
      setImageList(images); // 画像リストに保存
      if (images.length > 0) {
        setImage(images[0]); // 初期画像を設定
      }
    });
  }, []);

  useEffect(() => {
    map.fitBounds(imageBounds);
  }, [map]);

  useEffect(() => {
    if (floorImages.length > 0) {
      const selectedImage = floorImages[floor - 1]; // floorに対応するインデックスで取得
      if (selectedImage) {
        setImage(selectedImage);
      }
    }
  }, [floor, floorImages]);

  if (!currentImage) return null; // 画像がロードされるまで何も表示しない

  return (
    <ImageOverlay bounds={new latLngBounds(imageBounds)} url={currentImage} transparent={true} />
  );
};

export default function Map({ data, current, change, floor }) {
  const [currentTrack, setCurrentTrack] = useState([]);
  const [currentCursor, setCurrentCursor] = useState(0);
  const mapCenter = new LatLng(800, 300);

  useEffect(() => {
    if (!change) {
      setCurrentCursor(0);
      return;
    }
    const interval = setInterval(() => {
      if (currentCursor >= data.length - 1) {
        // 最後のデータに到達した場合
        setCurrentTrack(data[currentCursor]);
        return;
      }

      if (!current) {
        setCurrentTrack(data[currentCursor]);
      } else {
        setCurrentCursor((prevCursor) => {
          const newCursor = prevCursor + 1;
          setCurrentTrack(data[newCursor]);
          return newCursor;
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval); // クリーンアップ時にタイマーをクリア
    };
  }, [data, current, change, currentCursor]); // 依存配列に currentCursor を追加

  return (
    <MapContainer center={mapCenter} crs={CRS.Simple} maxZoom={5} minZoom={2} scrollWheelZoom={false} style={{ height: 900, width: 600 }}>
      <OverlayImage floor={Number(floor)} />
      <AirplaneMarker data={currentTrack} />
      <Markers floor={Number(floor)} />
    </MapContainer>
  );
}
