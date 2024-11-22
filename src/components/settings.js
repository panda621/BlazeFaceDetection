import React from "react";

const Settings = ({settings, setSettings}) => {
    const handleSettingChange = (settingName, value) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [settingName]: value
        }));
    };
    

    return (
        <div className="settings">
            <h3>Settings</h3>
            
            <div className="setting-item">
                <label>
                    <input
                        type="checkbox"
                        checked={settings.drawBoundingBox}
                        onChange={(e) => handleSettingChange('drawBoundingBox', e.target.checked)}
                    />
                    Show Bounding Box
                </label>
            </div>

            <div className="setting-item">
                <label>
                    <input
                        type="checkbox"
                        checked={settings.drawKeypoints}
                        onChange={(e) => handleSettingChange('drawKeypoints', e.target.checked)}
                    />
                    Show Keypoints
                </label>
            </div>

            <div className="setting-item">
                <label>
                    Confidence Threshold:
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={settings.minFaceConfidence}
                        onChange={(e) => handleSettingChange('minFaceConfidence', parseFloat(e.target.value))}
                    />
                    {settings.minFaceConfidence.toFixed(1)}
                </label>
            </div>

            <div className="setting-item">
                <label>
                    Box Color:
                    <input
                        type="color"
                        value={settings.boxColor}
                        onChange={(e) => handleSettingChange('boxColor', e.target.value)}
                    />
                </label>
            </div>

            <div className="setting-item">
                <label>
                    Keypoint Color:
                    <input
                        type="color"
                        value={settings.keypointColor}
                        onChange={(e) => handleSettingChange('keypointColor', e.target.value)}
                    />
                </label>
            </div>

            <div className="setting-item">
                <label>
                    Line Width:
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={settings.lineWidth}
                        onChange={(e) => handleSettingChange('lineWidth', parseInt(e.target.value))}
                    />
                    {settings.lineWidth}px
                </label>
            </div>
        </div>
    )
}

export default Settings;