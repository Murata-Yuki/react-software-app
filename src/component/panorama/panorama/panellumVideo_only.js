import React, { useState, useEffect } from "react";
import { PannellumVideo } from "pannellum-react";
import axios from "axios";
import "../css/panorama.css";

export default function PanoramaV() {
    const [videos, setVideos] = useState([]); // ビデオのURLを保存する状態
    const [currentVideo, setCurrentVideo] = useState(null); // 現在のビデオ

    useEffect(() => {
        axios
            .get("http://localhost:8080/videos")
            .then((response) => {
                const videoUrls = response.data.map(video => video.url.replace(/..\/..\/images/, 'images')); // URLを修正
                setVideos(videoUrls); // 状態を更新
                console.log(videoUrls);
                if (videoUrls.length > 0) {
                    setCurrentVideo(videoUrls[0]); // 最初のビデオを設定
                }
            })
            .catch((error) => {
                console.log("Error fetching videos:", error);
            });
    }, []);  // コンポーネントがマウントされたときに一度だけ実行

    return (
        <div>
            {currentVideo ? (
                <PannellumVideo
                    width="100%"
                    height="700px"
                    video={currentVideo}
                    pitch={10}
                    yaw={0}
                    hfov={110}
                    showZoomCtrl={true}
                    autoplay={true}
                    controls={true}
                    onLoad={() => console.log("Panorama video loaded")}
                />
            ) : (
                <p>Loading video...</p> // ビデオが読み込まれるまでの表示
            )}
        </div>
    );
}
