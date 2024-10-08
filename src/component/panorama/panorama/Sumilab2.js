import React, { useCallback} from 'react';
import { Pannellum } from "pannellum-react";
import { useNavigate } from 'react-router-dom';
import myImage from "../../../images/introduction/research/sumi_ocan.jpg";
import hotspotImage1 from "../../../images/introduction/miyashita/3dreconst.jpg";
import hotspotImage2 from "../../../images/introduction/suzuki/images.png";
import hotspotImage3 from "../../../images/introduction/endo/mokuteki.png";
import "../css/customHotspot.css";

export default function SumiLab2() {
    const navigate = useNavigate();

    const createHotspotTooltip = useCallback((hotspotImage) => (hotSpotDiv) => {
        const imageDiv = document.createElement('img');
        imageDiv.setAttribute('src', hotspotImage);
        imageDiv.classList.add('custom-hotspot-image');
        hotSpotDiv.appendChild(imageDiv);
    }, []);

    const handleClick = (url) => () => {
        navigate(url);
    };
    
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
            mouseZoom={true}
        >
            <Pannellum.Hotspot
                type="custom"
                pitch={-10}
                yaw={-40}
                tooltip={createHotspotTooltip(hotspotImage1)}
                handleClick={handleClick("/zhou")}
            />
            <Pannellum.Hotspot
                type="custom"
                pitch={-10}
                yaw={0}
                tooltip={createHotspotTooltip(hotspotImage2)}
                handleClick={handleClick("/suzuki")}
            />
            <Pannellum.Hotspot
                type="custom"
                pitch={-10}
                yaw={-20}
                tooltip={createHotspotTooltip(hotspotImage3)}
                handleClick={handleClick("/endo")}
            />
            
        </Pannellum>
    );
}
