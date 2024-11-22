import React from "react";

const Stats = ({stats}) => {
    return(
        <div className="stats">
            <h3>Statistics</h3>
            <p>Detected Faces: {stats.faces}</p>
            <p>FPS: {stats.fps}</p>
        </div>
    );
}

export default Stats;