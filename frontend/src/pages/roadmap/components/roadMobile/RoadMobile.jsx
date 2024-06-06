import React from "react";
import useRoadMap from "../../hooks/useRoadMapEffects";
import { MobileData } from "./components/MobileData";

const RoadMobile = () => {
    const { containerRef } = useRoadMap(MobileData());

    return (    
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "50vh",
            }}
        />
    );
};

export default RoadMobile;