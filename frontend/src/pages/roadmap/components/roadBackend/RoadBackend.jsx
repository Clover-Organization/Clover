import React from "react";
import useRoadMap from "../../hooks/useRoadMapEffects";
import { BackendData } from "./components/BackendData";

const RoadBackend = () => {
    const { containerRef } = useRoadMap(BackendData());

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

export default RoadBackend;