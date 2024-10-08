import React, { useState, useRef, useEffect} from "react";
import { Pannellum, PannellumVideo } from "pannellum-react";
import Grid from "@material-ui/core/Grid";
import Map from "../2DMap";

import FloorChange from "../FloorChange";

import { BsFillArrowLeftCircleFill, 
    BsFillArrowRightCircleFill, 
    BsFillArrowUpCircleFill, 
    BsFillPlayCircleFill, 
    BsFillPauseCircleFill 
} from 'react-icons/bs';
import { FaArrowsRotate } from 'react-icons/fa6';

import "../css/panorama.css"

import myVideo11 from "../../../images/O1/O11.mp4";
import myVideo12 from "../../../images/O1/O12.mp4";
import myVideo13 from "../../../images/O1/O13.mp4";
import myVideo14 from "../../../images/O1/O14.mp4";
import myVideo15 from "../../../images/O1/O15.mp4";
import myVideo16 from "../../../images/O1/O16.mp4";

import arrow from "../../images/arrow.png";

import data1 from "../data/Data1";
import data2 from "../data/Data2";
import data3 from "../data/Data3";
import data4 from "../data/Data4";
import data5 from "../data/Data5";
import data6 from "../data/Data6";
import data52 from "../data/Data52";
import DropDownButton from "../DropDownButton";

const commonTrajectoryData = [data1, data2, data3, data4, data5, data6];
const commonTrajectoryData2 = [data1, data52, data3, data4, data5, data6];

export default function PanoramaV() {
    const O11 = [2, 1, 1, 1];
    const O12 = [1, 3, 5, 2];
    const O13 = [4, 3, 3, 3];
    const O14 = [3, 4, 1, 5];
    const O15 = [6, 5, 5, 5];
    const O16 = [5, 1, 6, 3];

    const O1 = [O11, O12, O13, O14, O15, O16];

    const videoArray = [myVideo11, myVideo12, myVideo13,
        myVideo14, myVideo15, myVideo16];

    const [currentVideo, setcurrentVideo] = useState(myVideo12);
    const [currentNumber, setCurrentNumber] = useState(2);
    const [currentTrajectory, setCurrentTrajectory] = useState(data2);
    const [currentplay, setCurrentPlay] = useState(true);
    const videoRef = useRef(null);
    const [activeButton, setActiveButton] = useState(null);
    const [change, setChange] = useState(true);

    const [currentFloor, setCurrentFloor] = useState(1);
    const [currentVideoArray, setVideoArray] = useState(videoArray);

    const changeVideo = (turnNumber) => {
        const nextNumber = O1[currentNumber - 1][turnNumber];
        const nextVideo = currentVideoArray[nextNumber - 1];
        const nextTrajectory = commonTrajectoryData[nextNumber - 1];
        setCurrentPlay(true);
        setChange(false);
        setCurrentNumber(nextNumber);
        setcurrentVideo(nextVideo);
        setCurrentTrajectory(nextTrajectory);
        setActiveButton(null);

        setTimeout(() => setChange(true), 100);
    };

    const changeFloor = (floor) => {
        setChange(false);
        const array = FloorChange(floor);
        setCurrentFloor(floor);
        setVideoArray(array);
        setCurrentNumber(2); // Reset to the first video of the new floor
        setcurrentVideo(array[1]); // Start with the first video of the new floor
        if(floor === 5) {
            setCurrentTrajectory(commonTrajectoryData2[1]);
        }else{
            setCurrentTrajectory(commonTrajectoryData[1]);
        }
        setCurrentPlay(true); // Ensure the video is playing

        setTimeout(() => setChange(true), 100); // reRender
    }

    const handleVideo = () => {
        if (currentplay) {
            setCurrentPlay(false);
            videoRef.current.video.pause();
        }
        else {
            setCurrentPlay(true);
            videoRef.current.video.play();
        }
    }

    const handleButtonClick = (button, action) => {
        setActiveButton(button);
        action();
    };

    const handleDropdownChange = (floor) => {
        changeFloor(Number(floor));
    };

    const createHotspotTooltip = (hotspotImage) => (hotSpotDiv) => {
        const imageDiv = document.createElement('img');
        imageDiv.setAttribute('src', hotspotImage);
        imageDiv.classList.add('custom-hotspot-image');
        hotSpotDiv.appendChild(imageDiv);
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
                >
                </PannellumVideo>
                <Grid container justifyContent="space-around" alignItems="center" style={{ marginTop: '20px' }}>
                    <Grid item>
                        <div className={`button play ${activeButton === 'play' ? 'active' : ''}`} onClick={() => handleButtonClick('play', handleVideo)}>
                            <h1><BsFillPlayCircleFill size="50px" /></h1>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={`button pause ${activeButton === 'pause' ? 'active' : ''}`} onClick={() => handleButtonClick('pause', handleVideo)}>
                            <h1><BsFillPauseCircleFill size="50px" /></h1>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={`button return ${activeButton === 'return' ? 'active' : ''}`} onClick={() => handleButtonClick('return', () => changeVideo(0))}>
                            <h1><FaArrowsRotate size="50px" /></h1>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={`button left ${activeButton === 'left' ? 'active' : ''}`} onClick={() => handleButtonClick('left', () => changeVideo(1))}>
                            <h1><BsFillArrowLeftCircleFill size="50px" /></h1>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={`button up ${activeButton === 'up' ? 'active' : ''}`} onClick={() => handleButtonClick('up', () => changeVideo(3))}>
                            <h1><BsFillArrowUpCircleFill size="50px" /></h1>
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={`button right ${activeButton === 'right' ? 'active' : ''}`} onClick={() => handleButtonClick('right', () => changeVideo(2))}>
                            <h1><BsFillArrowRightCircleFill size="50px" /></h1>
                        </div>
                    </Grid>
                    <Grid item>
                        <DropDownButton handleDropdownChange={handleDropdownChange} floor={currentFloor}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Map data={currentTrajectory} current={currentplay} change={change} floor={currentFloor}/>
            </Grid>
        </Grid>
    );
}
