import React from "react";
import "./AffectedArea.css";

function AffectedArea() {
    const { size } = this.props;
    return <div className="dot" style={{ width: size, height: size }></div>;
}

export default AffectedArea;
