import React from "react";
import useRoadMap from "../../hooks/useRoadMapEffects";
import { FrontendData } from "./components/FrontendData";

const RoadFrontend = () => {
    const { containerRef } = useRoadMap(FrontendData());

    return (    
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "94vh",
            }}
        />
    );
};

export default RoadFrontend;