import React from 'react';
import Grid from "@material-ui/core/Grid";
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillArrowLeftCircleFill, BsFillArrowUpCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaArrowsRotate } from 'react-icons/fa6';
import DropDownButton from './DropDownButton';

const ButtonGroup = ({ activeButton, handleButtonClick, handleVideo, changeVideo, handleDropdownChange, currentFloor }) => {
    return (
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
    );
};

export default ButtonGroup;
