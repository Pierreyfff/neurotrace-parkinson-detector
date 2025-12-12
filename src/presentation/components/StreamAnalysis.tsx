import React, { useRef, useEffect, useState } from 'react';
import type { Analysis } from '../../domain/entities/Analysis';

interface StreamAnalysisProps {
  onPrediction: (prediction: Analysis['prediction']) => void;
  isAnalyzing: boolean;
}

interface PredictionHistory {
  timestamp: number;
  class: string;
  confidence: number;
}

export const StreamAnalysis: React.FC<StreamAnalysisProps> = ({
  onPrediction,
  isAnalyzing,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState<Analysis['prediction'] | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistory[]>([]);
  const [fps, setFps] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);
  const lastFrameTime = useRef(Date.now());

  useEffect(() => {
    return () => stopStream();
  }, []);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);

        // Analizar 2 fps
        intervalRef.current = window.setInterval(() => {
          captureAndAnalyze();
          updateFPS();
        }, 500);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
    setCurrentPrediction(null);
    setPredictionHistory([]);
  };

  const updateFPS = () => {
    const now = Date.now();
    const delta = now - lastFrameTime.current;
    const currentFps = Math.round(1000 / delta);
    setFps(currentFps);
    lastFrameTime.current = now;
  };

  const captureAndAnalyze = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    try {
      const base64Image = canvas.toDataURL('image/png');
      const API_URL = import.meta.env.VITE_API_URL || 'https://neurotrace-parkinson-detector-1.onrender.com';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: base64Image }),
      });

      const result = await response.json();

      if (result.success) {
        setCurrentPrediction(result.prediction);
        onPrediction(result.prediction);

        setPredictionHistory((prev) => {
          const newHistory = [
            ...prev,
            {
              timestamp: Date.now(),
              class: result.prediction.class,
              confidence: result.prediction.confidence,
            },
          ];
          return newHistory.slice(-10);
        });
      }
    } catch (error) {
      console.error('Error analyzing frame:', error);
    }
  };

  const getClassLabel = (className: string): string => {
    const labels: Record<string, string> = {
      other: 'Invalid Image',
      spiral_healthy: 'Healthy Spiral',
      spiral_parkinson: "Parkinson's Spiral",
      wave_healthy: 'Healthy Wave',
      wave_parkinson: "Parkinson's Wave",
    };
    return labels[className] || className;
  };

  const getClassColor = (className: string): string => {
    if (className.includes('parkinson')) return 'text-red-600';
    if (className.includes('healthy')) return 'text-green-600';
    return 'text-gray-600';
  };

  const getVariation = (): string => {
    if (predictionHistory.length < 2) return 'N/A';
    const recentPredictions = predictionHistory.slice(-5);
    const uniqueClasses = new Set(recentPredictions.map((p) => p.class));
    if (uniqueClasses.size === 1) return 'Stable';
    if (uniqueClasses.size === 2) return 'Low';
    return 'High';
  };

  return (
    <div className="space-y-6">
      {/* Video Stream */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Transmisión de Cámara en Vivo</h3>
          <div className="flex items-center gap-4">
            {isStreaming && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span>LIVE</span>
                <span className="text-gray-400">|</span>
                <span>{fps} FPS</span>
              </div>
            )}
            {!isStreaming ? (
              <button
                onClick={startStream}
                disabled={isAnalyzing}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Start Camera
              </button>
            ) : (
              <button
                onClick={stopStream}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Stop Camera
              </button>
            )}
          </div>
        </div>

        <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-contain" />
          <canvas ref={canvasRef} className="hidden" />

          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg">Cámara no activa</p>
                <p className="text-sm mt-2">Haz clic en "Iniciar Cámara" para comenzar</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Predictions */}
      {isStreaming && currentPrediction && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Prediction */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Predicción Actual</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Clase Detectada</span>
                  <span className={`text-sm font-bold ${getClassColor(currentPrediction.class)}`}>
                    {getClassLabel(currentPrediction.class)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Confianza</span>
                  <span className="text-sm font-bold text-gray-900">
                    {(currentPrediction.confidence * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentPrediction.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Variación</span>
                  <span className="text-sm font-bold text-gray-900">{getVariation()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* All Class Probabilities */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Probabilidades de Todas las Clases</h4>
            <div className="space-y-3">
              {Object.entries(currentPrediction.probabilities).map(([className, probability]) => (
                <div key={className}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{getClassLabel(className)}</span>
                    <span className="text-sm font-bold text-gray-900">{(probability * 100).toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        className === currentPrediction.class ? 'bg-primary' : 'bg-gray-400'
                      }`}
                      style={{ width: `${probability * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
