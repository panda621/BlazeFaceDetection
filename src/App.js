import React, { useRef, useEffect, useState } from 'react';
import * as faceDetection from '@tensorflow-models/face-detection';
import '@tensorflow/tfjs';
import './App.css';
import Controls from './components/controls';
import Stats from './components/stats';
import Settings from './components/settings';

const App = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [detector, setDetector] = useState(null);
    const [isDetecting, setIsDetecting] = useState(true);
    const [stats, setStats] = useState({ faces: 0, fps: 0 });
    const [settings, setSettings] = useState({
        minFaceConfidence: 0.5,
        drawBoundingBox: true,
        drawKeypoints: true,
        boxColor: '#00ff00',
        keypointColor: '#ff0000',
        lineWidth: 2,
    });
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');

    useEffect(() => {
        const getCameras = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
            setSelectedCamera(videoDevices[0].deviceId);
        }
        };
        getCameras();
    }, []);

    // Initialize face detector
    useEffect(() => {
        const initializeDetector = async () => {
        const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
        const detectorConfig = {
            runtime: 'tfjs',
            refineLandmarks: true,
            minFaceConfidence: settings.minFaceConfidence,
        };
        const detector = await faceDetection.createDetector(model, detectorConfig);
        setDetector(detector);
        };
        initializeDetector();
    }, [settings.minFaceConfidence]);

    // Set up video stream
    useEffect(() => {
        const setupCamera = async () => {
        if (!selectedCamera) return;
        
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
            deviceId: selectedCamera,
            width: 640,
            height: 480 
            },
            audio: false,
        });
        
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
        };
        setupCamera();
    }, [selectedCamera]);

    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId;
        
        const detectFaces = async () => {
                if (!detector || !videoRef.current || !canvasRef.current || !isDetecting) return;

                const video = videoRef.current;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                const detectFrame = async () => {
                    if (!isDetecting) return;

                    // Calculate FPS
                    frameCount++;
                    const currentTime = performance.now();
                    if (currentTime - lastTime >= 1000) {
                    setStats(prev => ({ ...prev, fps: frameCount }));
                    frameCount = 0;
                    lastTime = currentTime;
                    }

                    // Detect faces
                    const faces = await detector.estimateFaces(video);
                    setStats(prev => ({ ...prev, faces: faces.length }));
                    
                    // Clear canvas and draw video frame
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Draw face detections
                    faces.forEach(face => {
                    // Only draw bounding box if enabled
                    if (settings.drawBoundingBox) {
                        // Save current context state
                        ctx.save();
                        
                        // Set styles for bounding box
                        ctx.strokeStyle = settings.boxColor;
                        ctx.lineWidth = settings.lineWidth;
                        
                        // Draw the box
                        ctx.strokeRect(
                        face.box.xMin,
                        face.box.yMin,
                        face.box.width,
                        face.box.height
                        );
                        
                        // Restore context state
                        ctx.restore();
                    }

                    // Only draw keypoints if enabled
                    if (settings.drawKeypoints) {
                        // Save current context state
                        ctx.save();
                        
                        // Set styles for keypoints
                        ctx.fillStyle = settings.keypointColor;
                        
                        // Draw each keypoint
                        face.keypoints.forEach(keypoint => {
                        ctx.beginPath();
                        ctx.arc(keypoint.x, keypoint.y, 3, 0, 2 * Math.PI);
                        ctx.fill();
                        
                        // Optionally add keypoint labels
                        ctx.fillText(keypoint.name, keypoint.x + 5, keypoint.y - 5);
                        });
                        
                        // Restore context state
                        ctx.restore();
                    }
                    });

                    // Request next frame
                    animationFrameId = requestAnimationFrame(detectFrame);
                };

                detectFrame();
            };

            if (detector) {
            detectFaces();
            }

            // Cleanup function
            return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [detector, isDetecting, settings]); 

    const takeScreenshot = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'face-detection-screenshot.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    // Render JSX
    return (
        <div className="App">
            <h1>Advanced Face Detection</h1>
            
            <div className="main-container">
                <div className="video-container">
                    <video
                        ref={videoRef}
                        style={{ display: 'none' }}
                        width="640"
                        height="480"
                    />
                    <canvas
                        ref={canvasRef}
                        width="640"
                        height="480"
                        className="detection-canvas"
                    />
                </div>

                <div className="controls-container">
                    <Controls 
                        isDetecting={isDetecting}
                        setIsDetecting={setIsDetecting}
                        onScreenshot={takeScreenshot}
                        cameras={cameras}
                        selectedCamera={selectedCamera}
                        setSelectedCamera={setSelectedCamera}
                    />
                    
                    <Stats stats={stats} />
                    
                    <Settings 
                        settings={settings}
                        setSettings={setSettings}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;