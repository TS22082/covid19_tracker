import React from "react";
import "./AffectedArea.css";

function AffectedArea(props) {
    const { data } = props;
    const size = Math.log(data.latest)*3;
    console.log(size);
    return <div className="dot" style={{
        width: `${size}px`,
        height: `${size}px`,
        'background-color': 'rgba(255,0,0,0.2)',
        'border-color': 'rgba(255,0,0,1.0)'
    }}>&nbsp;</div>;
}

export default AffectedArea;
