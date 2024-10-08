import React, { useState, useRef, useCallback } from 'react';
import { Pannellum } from "pannellum-react";
import myImage from "../../../images/introduction/research/okuyuki2.jpg";
import hotspotImage from "../../../images/introduction/miyashita/3dreconst.jpg"
import "../css/customHotspot.css";

export default function SumiLab() {
    const hotspotTooltip = useCallback((hotSpotDiv) => {
        const imageDiv = document.createElement('img');
        imageDiv.setAttribute('src', hotspotImage);
        imageDiv.classList.add('custom-hotspot-image');
        hotSpotDiv.appendChild(imageDiv);
    }, []);

    return (
        <Pannellum
            width="100%"
            height="830px"
            image={myImage}
            pitch={-10}
            yaw={20}
            hfov={130}
            autoLoad
            showZoomCtrl={true}
            compass
        >
            {/* <Pannellum.Hotspot
                type="custom"
                pitch={-10}
                yaw={-40}
                tooltip={hotspotTooltip}
            /> */}
            {/* <Pannellum.Hotspot
                type="custom"
                pitch={-10}
                yaw={-40}
                tooltip={hotspotTooltip}
            />
            <Pannellum.Hotspot
                type="custom"
                pitch={-10}
                yaw={-40}
                tooltip={hotspotTooltip}
            /> */}
        </Pannellum>
    );
}
