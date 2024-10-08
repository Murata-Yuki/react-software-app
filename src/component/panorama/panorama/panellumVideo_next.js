import axios from "axios";
import "../css/panorama.css";
import React, { useState, useRef, useEffect } from "react";
import { PannellumVideo } from "pannellum-react";
import Grid from "@material-ui/core/Grid";
import Map from "../leaflet/2DMap";
import DataChange from "../data/DataChange";
import ButtonGroup from "../button/ButtonGroup";

export default function PanoramaV() {
    const [currentVideo, setCurrentVideo] = useState(null); // 現在のビデオ
    const [currentNumber, setCurrentNumber] = useState(2); // 現在のビデオ番号2桁目
    const [currentTrajectory, setCurrentTrajectory] = useState(DataChange(2,16)); // 現在のビデオの軌跡
    const [currentPlay, setCurrentPlay] = useState(true); // playかpauseか
    const videoRef = useRef(null); // ref
    const [activeButton, setActiveButton] = useState(null); // buttonがクリック中か否か
    const [change, setChange] = useState(true); 
    const [currentVideoArray, setVideoArray] = useState(null); // 現在のビデオリスト
    const [currentFloorTurn, setFloorTurn] = useState(null); // 進む方向
    const [currentFloor, setCurrentFloor] = useState(null); // 現在の階層

    useEffect(() => {
        axios
            .get("http://localhost:8080/videos")
            .then((response) => {
                const videoUrls = response.data.map(video => video.url.replace(/..\/..\/images/, 'images')); // URLを修正
                setVideoArray(videoUrls); // 状態を更新
                setCurrentVideo(videoUrls[1]); // 最初のビデオを設定
            })
            .catch((error) => {
                console.log("Error fetching videos:", error);
            });
        axios
            .get("http://localhost:8080/trajectories")
            .then((response) => {
                if (response.data.length > 0) {
                    const trajectoryData = response.data.map(trajectory => trajectory.trajectoryData);
                    setFloorTurn(trajectoryData[0]); // trajectoryDataを状態に保存
                } else {
                    console.log("No data received from API");
                }
            })
            .catch((error) => {
                console.log("Error fetching trajectories:", error);
            });
        axios
            .get("http://localhost:8080/floor")
            .then((response) => {
                const floorList = response.data.map(floor => floor.floorNumber);
                setCurrentFloor(floorList[0][0]);
            })
            .catch((error) => {
                console.log("Error fetching floor:", error);
            });
    }, []);  // コンポーネントがマウントされたときに一度だけ実行

    const changeVideo = (turnNumber) => {
        const nextNumber = currentFloorTurn[currentNumber - 1][turnNumber];
        const FloorUseVideo = (currentFloor - 1) * 6
        const nextVideo = currentVideoArray[FloorUseVideo + nextNumber - 1];
        const nextTrajectory = DataChange(nextNumber,16);
        setCurrentPlay(true);
        setChange(false);
        setCurrentNumber(nextNumber);
        setCurrentVideo(nextVideo);
        setCurrentTrajectory(nextTrajectory);
        setActiveButton(null);

        setTimeout(() => setChange(true), 100);
    };

    const changeFloor = (floor) => {
        setChange(false);
        setCurrentFloor(floor);
        setCurrentNumber(2); // 新しいフロアの最初のビデオにリセット
        const FloorUseVideo = (floor - 1) * 6;
        setCurrentVideo(currentVideoArray[FloorUseVideo + 1]); // 新しいフロアの最初のビデオを開始
        setCurrentTrajectory(DataChange(2,16));
        setCurrentPlay(true); // ビデオを再生状態に設定

        setTimeout(() => setChange(true), 100);
    };

    const handleVideo = () => {
        if (currentPlay) {
            setCurrentPlay(false);
            videoRef.current.video.pause();
        } else {
            setCurrentPlay(true);
            videoRef.current.video.play();
        }
    };

    const handleButtonClick = (button, action) => {
        setActiveButton(button);
        if (button === 'play' || button === 'pause') {
            handleVideo();
        } else {
            action();
        }
    };
    
    const handleDropdownChange = (floor) => {
        changeFloor(Number(floor));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <PannellumVideo
                    ref={videoRef}
                    width="100%"
                    height="700px"
                    video={currentVideo}
                    pitch={10}
                    yaw={0}
                    hfov={110}
                    showZoomCtrl={true}
                    autoplay={true}
                    controls={true}
                    onLoad
                />
                <ButtonGroup
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
                    handleVideo={handleVideo}
                    changeVideo={changeVideo}
                    handleDropdownChange={handleDropdownChange}
                    currentFloor={currentFloor}
                />
            </Grid>
            <Grid item xs={4}>
                <Map data={currentTrajectory} current={currentPlay} change={change} floor={currentFloor}/>
            </Grid>
        </Grid>
    );
}
