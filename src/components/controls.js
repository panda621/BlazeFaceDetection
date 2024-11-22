import React from "react";

const Controls = ({
    isDetecting,
    setIsDetecting,
    onScreenshot,
    cameras, 
    selectedCamera,
    setSelectedCamera
}) => {
    return(
        <div className="controls">
            <h3>Controls</h3>
            <button onClick={() => setIsDetecting(!isDetecting)}
                className={`control-button ${isDetecting ? "active" : ""}`}
            >
                {isDetecting ? "Pause Detection": "Start Detection"}
            </button>
            <button onClick={onScreenshot}
                className="control-button"
            >
                Take Screenshot
            </button>
            <select
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="camera-select"
            >
                {cameras.map(camera => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId}`}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Controls;