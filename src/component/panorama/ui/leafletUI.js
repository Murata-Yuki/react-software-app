import { useEffect, useState } from "react";
import { CRS, LatLng, latLngBounds, DivIcon } from "leaflet";
import { MapContainer, ImageOverlay, useMap, Marker } from "react-leaflet";
import "leaflet-polylinedecorator";
import "../../../../node_modules/leaflet/dist/leaflet.css";
import Markers from './Markers'; // マーカーコンポーネントのインポート
import image1 from "../../../images/O1/O1.jpg"; // 背景画像のパス

let imageBounds = [
  [0, 0], // padding
  [90, 30], // image dimensions
];

const OverlayImage = () => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      console.log('Map is loaded:', map); // マップがロードされているか確認
      map.fitBounds(imageBounds); // マップの表示範囲を設定
    }
  }, [map]);

  return (
    <ImageOverlay bounds={new latLngBounds(imageBounds)} url={image1} transparent={true} />
  );
};

// 矢印ポリラインと映像選択
const ArrowPolyline = ({ positions, onArrowClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!positions || positions.length < 2) return;

    // 矢印を表示するためのポリラインを作成
    const polyline = window.L.polyline(positions, { color: 'blue' }).addTo(map);

    // 矢印デコレーターを追加
    const decorator = window.L.polylineDecorator(polyline, {
      patterns: [
        {
          offset: '10%', // 矢印のオフセット
          repeat: '20%', // 矢印の繰り返し間隔
          symbol: window.L.Symbol.arrowHead({
            pixelSize: 15, // 矢印のサイズ
            pathOptions: { fillOpacity: 1, color: 'red' } // 矢印のスタイル
          })
        }
      ]
    }).addTo(map);

    // 矢印をクリックした時に映像を選択
    polyline.on('click', onArrowClick);

    return () => {
      map.removeLayer(decorator);
      map.removeLayer(polyline);
    };
  }, [positions, map, onArrowClick]);

  return null; // 実際の Polyline は map 内に直接追加される
};

// サムネイル表示用のマーカー
const ThumbnailMarker = ({ position, thumbnail }) => {
  const thumbnailIcon = new DivIcon({
    html: `<img src="${thumbnail}" alt="Thumbnail" style="width: 100px; height: 100px;" />`
  });

  return <Marker position={position} icon={thumbnailIcon} />;
};

// メインコンポーネント
export default function LeafletUI() {
  const mapCenter = new LatLng(45, 15); // 初期中心座標を調整
  const [selectedThumbnail, setSelectedThumbnail] = useState(null); // サムネイルの状態
  const [selectedPosition, setSelectedPosition] = useState(null); // サムネイルを表示する位置

  // 各マーカーの座標
  const arrowPositions = [
    [50, 9],  // マーカー1
    [50, 27], // マーカー2
    [90, 9],  // マーカー3
    [5, 9]    // マーカー4
  ];

  // 矢印クリック時に映像を選択する処理
  const handleArrowClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*'; // ビデオファイルを選択するためのフィルター
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const videoUrl = e.target.result;
          const videoElement = document.createElement('video');
          videoElement.src = videoUrl;

          // サムネイルを生成
          videoElement.addEventListener('loadeddata', () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 100;
            canvas.height = 100;

            // ビデオの最初のフレームを描画
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL(); // サムネイルのData URLを取得
            setSelectedThumbnail(thumbnail); // サムネイルを保存
            setSelectedPosition([50, 18]); // サムネイルを表示する位置を設定（矢印の上）
          });
        };
        reader.readAsDataURL(file); // ビデオを読み込む
      }
    };
    input.click(); // ファイル選択ダイアログを開く
  };

  return (
    <MapContainer
      center={mapCenter}
      crs={CRS.Simple}
      maxZoom={5}
      minZoom={2}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100vw" }} // マップのスタイルを調整
    >
      <OverlayImage />
      <Markers /> {/* マーカーを表示 */}
      <ArrowPolyline positions={arrowPositions} onArrowClick={handleArrowClick} /> {/* マーカー間に矢印を描画 */}
      {selectedThumbnail && selectedPosition && (
        <ThumbnailMarker position={selectedPosition} thumbnail={selectedThumbnail} /> // サムネイルを表示
      )}
    </MapContainer>
  );
}
