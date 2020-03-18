import React from "react";
import "./AffectedArea.css";

function AffectedArea(props) {
    const { data } = props;
    const size = Math.log(data.latest)*3;
    return <div className="dot" style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'rgba(255,0,0,0.2)',
        border: '1px solid rgba(255,0,0,1.0)'
    }}>&nbsp;</div>;
}

export default AffectedArea;
