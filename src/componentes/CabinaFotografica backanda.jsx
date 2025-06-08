import React, { useRef, useState, useEffect } from 'react';
import { Camera, X } from 'react-feather';
import "../assets/scss/_03-Componentes/_CabinaFotograficaCamera.scss";

const CabinaFotograficaCamera = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Inicialización mínima de la cámara
  useEffect(() => {
    const initCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user"
          },
          audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setStreaming(true);
            setIsLoading(false);
          };
        }
      } catch (err) {
        console.error("Error al iniciar la cámara:", err);
        setError("No se pudo acceder a la cámara. Verifica los permisos.");
        setIsLoading(false);
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="cabina-container">
      <h2 className="cabina-title">Cabina Fotográfica</h2>

      {error && (
        <div className="error-message">
          <X size={18} />
          <span>{error}</span>
          <button 
            className="retry-button"
            onClick={handleRetry}
          >
            Reintentar
          </button>
        </div>
      )}

      <div className={`video-container ${!streaming ? 'loading' : ''}`}>
        <video
          ref={videoRef}
          className="video-preview"
          autoPlay
          playsInline
          muted
          style={{ transform: 'scaleX(-1)' }}
        />

        {!streaming && (
          <div className="loading-state">
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <p>Iniciando cámara...</p>
              </>
            ) : (
              <>
                <Camera size={48} />
                <p>Cámara no disponible</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CabinaFotograficaCamera;