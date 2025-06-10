import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, Smile, Camera, User, Power, RefreshCw, Image, Download, Printer, Share2 } from 'react-feather';
import CabinaFotograficaTutorial from './CabinaFotograficaTutorial';
import CabinaFotograficaGuestForm from './CabinaFotograficaGuestForm';
import CabinaFotograficaAudio from './CabinaFotograficaAudio';
import CabinaFotograficaGallery from './CabinaFotograficaGallery';
import "../assets/scss/_03-Componentes/_CabinaFotografica.scss";

export const FILTERS = [
  { id: 'none', name: 'Normal', css: 'none' },
  { id: 'cyberpunk', name: 'Cyberpunk', css: 'contrast(1.5) saturate(2) hue-rotate(10deg)' },
  { id: 'holographic', name: 'Holográfico', css: 'brightness(1.2) contrast(1.2) hue-rotate(180deg)' },
  { id: 'neon', name: 'Neon', css: 'contrast(1.8) brightness(1.1) saturate(1.5)' },
  { id: 'infrared', name: 'Infrarrojo', css: 'sepia(1) hue-rotate(260deg) contrast(2)' },
  { id: 'matrix', name: 'Matrix', css: 'grayscale(1) contrast(2) brightness(0.7)' }
];

export const MASKS = [
  { 
    id: 'cybermask', 
    name: 'Máscara Cyber', 
    url: '/img/futurista/mask-cyber.png',
    position: { top: '15%', left: '50%', width: '50%', transform: 'translateX(-50%)' }
  },
  { 
    id: 'visor', 
    name: 'Visor HUD', 
    url: '/img/futurista/mask-visor.gif',
    position: { top: '10%', left: '50%', width: '80%', transform: 'translateX(-50%)' }
  },
  { 
    id: 'circuit', 
    name: 'Circuitos', 
    url: '/img/futurista/mask-circuit.png',
    position: { top: '0%', left: '50%', width: '100%', transform: 'translateX(-50%)' }
  },
  { 
    id: 'energy', 
    name: 'Energía', 
    url: '/img/futurista/mask-energy.gif',
    position: { top: '20%', left: '50%', width: '70%', transform: 'translateX(-50%)' }
  },
  { 
    id: 'neon-frame', 
    name: 'Marco Neon', 
    url: '/img/futurista/mask-neonframe.png',
    position: { top: '5%', left: '50%', width: '90%', transform: 'translateX(-50%)' }
  },
  { 
    id: 'data', 
    name: 'Flujo de Datos', 
    url: '/img/futurista/mask-data.gif',
    position: { bottom: '15%', left: '50%', width: '100%', transform: 'translateX(-50%)' }
  }
];

const CONFIG = {
  PHOTO_SEQUENCE_COUNT: 3,
  MAX_PHOTOS_IN_GALLERY: 6,
  COUNTDOWN_DURATION: 800,
  FLASH_DURATION: 300,
  PHOTO_DELAY: 1500
};

const CabinaFotografica = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [showTutorial, setShowTutorial] = useState(true);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestData, setGuestData] = useState({ name: '', phone: '' });
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [activeEffect, setActiveEffect] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [subtitle, setSubtitle] = useState('');
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showMasks, setShowMasks] = useState(false);

  const [cameraState, setCameraState] = useState({
    isActive: true,
    isLoading: true,
    error: null,
    availableCameras: [],
    selectedCameraId: '',
    filter: 'none',
    mask: null,
    countdown: 0,
    countdownMessage: '',
    showCountdown: false,
    flashActive: false,
    photosTaken: 0,
    isTakingPhotos: false,
    showCameraSelector: false,
    stream: null
  });

  const resetLocalStorage = useCallback(() => {
    localStorage.removeItem('cabinaFotograficaFotos');
    setRecentPhotos([]);
  }, []);

  const triggerEffect = useCallback(() => {
    const effects = ['confetti'];
    setActiveEffect(effects[Math.floor(Math.random() * effects.length)]);
    setTimeout(() => setActiveEffect(null), 2000);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedPhotos = localStorage.getItem('cabinaFotograficaFotos');
        if (savedPhotos) {
          const parsedPhotos = JSON.parse(savedPhotos);
          setRecentPhotos(parsedPhotos.slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY));
        }
        
        const savedGuestData = localStorage.getItem('cabinaFotograficaInvitados');
        if (savedGuestData) setGuestData(JSON.parse(savedGuestData));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadInitialData();
    loadAvailableCameras();
  }, []);

  const loadAvailableCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setCameraState(prev => ({
        ...prev,
        availableCameras: videoDevices,
        selectedCameraId: videoDevices[0]?.deviceId,
        isLoading: false
      }));
    } catch (err) {
      setCameraState(prev => ({ ...prev, error: "Error loading cameras", isLoading: false }));
    }
  };


  useEffect(() => {
    let stream = null;

    const initCamera = async () => {
      try {
        setCameraState(prev => ({ ...prev, isLoading: true, error: null }));

        const constraints = {
          video: {
            deviceId: cameraState.selectedCameraId ? { exact: cameraState.selectedCameraId } : undefined,
            facingMode: "user"
          },
          audio: false
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setCameraState(prev => ({ ...prev, isLoading: false, stream, isActive: true }));
          };
        }
      } catch (err) {
        setCameraState(prev => ({ ...prev, error: "Camera access denied", isLoading: false }));
        if (stream) stream.getTracks().forEach(track => track.stop());
      }
    };

    if (cameraState.isActive && cameraState.selectedCameraId) initCamera();

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
      if (videoRef.current?.srcObject) videoRef.current.srcObject = null;
    };
  }, [cameraState.selectedCameraId, cameraState.isActive]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    if (cameraState.filter !== 'none') {
      const filter = FILTERS.find(f => f.id === cameraState.filter)?.css;
      if (filter) {
        context.filter = filter;
        context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        context.filter = 'none';
      }
    }
    
    context.setTransform(1, 0, 0, 1, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.7);
  }, [cameraState.filter]);

  const handlePhotosTaken = useCallback(async (photos) => {
    if (photos.length === 0) return;
    
    const newPhoto = { 
      url: photos[0], // Usamos solo la primera foto para la miniatura
      individualUrls: photos,
      timestamp: Date.now()
    };

    setRecentPhotos(prev => {
      const updatedPhotos = [newPhoto, ...prev].slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY);
      localStorage.setItem('cabinaFotograficaFotos', JSON.stringify(updatedPhotos));
      return updatedPhotos;
    });
    
    setCapturedPhotos(photos);
    setShowResultModal(true);
    setCurrentPhotoIndex(0);
  }, []);

  const takePhotoSequence = useCallback(async () => {
    if (cameraState.isTakingPhotos || !cameraState.isActive) return;

    setCameraState(prev => ({ ...prev, isTakingPhotos: true, photosTaken: 0 }));
    setCurrentStep('start');
    setCapturedPhotos([]);
    
    try {
      const photos = [];
      
      for (let i = 0; i < CONFIG.PHOTO_SEQUENCE_COUNT; i++) {
        setCameraState(prev => ({ 
          ...prev, 
          photosTaken: i + 1,
          showCountdown: true,
          countdownMessage: `CAPTURA ${i + 1} DE ${CONFIG.PHOTO_SEQUENCE_COUNT}`,
          countdown: 3
        }));

        for (let j = 3; j > 0; j--) {
          await new Promise(resolve => setTimeout(resolve, CONFIG.COUNTDOWN_DURATION));
          setCameraState(prev => ({ ...prev, countdown: j }));
        }

        setCameraState(prev => ({ ...prev, countdown: 0, countdownMessage: '¡SONRÍE!' }));
        await new Promise(resolve => setTimeout(resolve, 200));

        setCameraState(prev => ({ ...prev, flashActive: true }));
        triggerEffect();
        
        const photoUrl = capturePhoto();
        if (photoUrl) {
          photos.push(photoUrl);
          setCapturedPhotos(prev => [...prev, photoUrl]);
        }
        
        await new Promise(resolve => setTimeout(resolve, CONFIG.FLASH_DURATION));
        setCameraState(prev => ({ ...prev, flashActive: false }));

        if (i < CONFIG.PHOTO_SEQUENCE_COUNT - 1) {
          await new Promise(resolve => setTimeout(resolve, CONFIG.PHOTO_DELAY));
        }
      }
      
      if (photos.length > 0) await handlePhotosTaken(photos);
    } finally {
      setCameraState(prev => ({ 
        ...prev, 
        isTakingPhotos: false, 
        photosTaken: 0,
        showCountdown: false 
      }));
    }
  }, [cameraState.isActive, cameraState.isTakingPhotos, triggerEffect, capturePhoto, handlePhotosTaken]);

  const handleFilterChange = (filterId) => {
    setCameraState(prev => ({ ...prev, filter: filterId }));
    setShowFilters(false);
  };

  const handleMaskChange = (maskId) => {
    setCameraState(prev => ({ ...prev, mask: maskId === prev.mask ? null : maskId }));
    setShowMasks(false);
  };

  const toggleCamera = () => {
    setCameraState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const switchCamera = (deviceId) => {
    setCameraState(prev => ({ ...prev, selectedCameraId: deviceId, showCameraSelector: false }));
  };

  const handlePhotoAction = useCallback((action, photoUrl) => {
    switch(action) {
      case 'download':
        const link = document.createElement('a');
        link.href = photoUrl;
        link.download = `foto-futurista-${guestData.name || 'usuario'}-${new Date().toISOString().slice(0, 10)}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case 'print':
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html><head><title>Imprimir Foto</title><style>
            body { text-align: center; margin: 0; padding: 0; }
            img { max-width: 100%; height: auto; }
          </style></head>
          <body>
            <img src="${photoUrl}" alt="Foto cabina futurista" />
            <script>setTimeout(() => { window.print(); window.close(); }, 500);</script>
          </body></html>
        `);
        printWindow.document.close();
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Foto de la cabina futurista',
            url: photoUrl
          }).catch(() => {
            window.open(`https://wa.me/?text=Mira mi foto futurista!%20${photoUrl}`);
          });
        } else {
          window.open(`https://wa.me/?text=Mira mi foto futurista!%20${photoUrl}`);
        }
        break;
      default:
        break;
    }
  }, [guestData.name]);

  const ConfettiEffect = () => (
    <div className="confetti-effect">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      ))}
    </div>
  );

  const ResultModal = () => (
    <div className="result-modal">
      <div className="result-modal-content">
        <button className="close-modal" onClick={() => setShowResultModal(false)}>
          <X size={20} />
        </button>
        <h3>¡TUS FOTOS ESTÁN LISTAS!</h3>
        
        <div className="photo-preview-container">
          <img 
            src={capturedPhotos[currentPhotoIndex]} 
            alt={`Foto ${currentPhotoIndex + 1}`} 
            className="photo-preview"
          />
          
          {capturedPhotos.length > 1 && (
            <div className="photo-selector">
              {capturedPhotos.map((_, index) => (
                <button
                  key={index}
                  className={`selector-dot ${currentPhotoIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentPhotoIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="action-buttons">
          <button onClick={() => handlePhotoAction('download', capturedPhotos[currentPhotoIndex])}>
            <Download size={16} /> DESCARGAR
          </button>
          <button onClick={() => handlePhotoAction('print', capturedPhotos[currentPhotoIndex])}>
            <Printer size={16} /> IMPRIMIR
          </button>
          <button onClick={() => handlePhotoAction('share', capturedPhotos[currentPhotoIndex])}>
            <Share2 size={16} /> COMPARTIR
          </button>
        </div>
      </div>
    </div>
  );

  if (showTutorial) {
    return (
      <CabinaFotograficaTutorial 
        onStart={() => {
          setShowTutorial(false);
          setShowGuestForm(true);
        }}
        onClose={() => navigate(-1)}
      />
    );
  }

  if (showGuestForm) {
    return (
      <CabinaFotograficaGuestForm
        guestData={guestData}
        onGuestDataChange={setGuestData}
        onContinue={() => setShowGuestForm(false)}
        onClose={() => navigate(-1)}
      />
    );
  }

  return (
    return (
      <div className="cabina-fotografica-container compact-view">
        {activeEffect === 'confetti' && <ConfettiEffect />}
        {showResultModal && <ResultModal />}
        
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        <CabinaFotograficaAudio 
          currentStep={currentStep}
          photosTaken={cameraState.photosTaken}
          onSubtitleChange={setSubtitle}
        />
        
        {subtitle && <div className="subtitle-display">{subtitle}</div>}
    
        <button className="close-fullscreen" onClick={() => navigate(-1)}>
          <X size={20} />
        </button>
    
        <header className="cabina-header">
          <h1 className="cabina-title">CABINA FOTOGRÁFICA</h1>
          <p className="cabina-subtitle">SISTEMA DE CAPTURA HOLOGRÁFICA</p>
          {guestData.name && (
            <p className="cabina-guest-name">
              USUARIO: <span className="guest-name-highlight">{guestData.name}</span>
            </p>
          )}
        </header>
    
        <div className="cabina-main-content">
          <div className="camera-container">
            <div className="camera-view">
              {cameraState.error && (
                <div className="camera-error">
                  <X size={18} />
                  <span>{cameraState.error}</span>
                  <button className="retry-button" onClick={() => window.location.reload()}>
                    REINTENTAR
                  </button>
                </div>
              )}
  
              <video
                ref={videoRef}
                className="video-stream"
                autoPlay
                playsInline
                muted
                style={{
                  filter: FILTERS.find(f => f.id === cameraState.filter)?.css,
                  transform: 'scaleX(-1)'
                }}
              />
  
              {cameraState.mask && (
                <div className="mask-container">
                  <img
                    className="mask-image"
                    src={MASKS.find(m => m.id === cameraState.mask)?.url}
                    style={{
                      ...MASKS.find(m => m.id === cameraState.mask)?.position,
                      transform: `${MASKS.find(m => m.id === cameraState.mask)?.position.transform || ''} scaleX(-1)`
                    }}
                    alt="Máscara seleccionada"
                    onError={(e) => {
                      e.target.src = '/img/placeholder-mask.png';
                    }}
                  />
                </div>
              )}
  
              {!cameraState.stream && (
                <div className="loading-state">
                  {cameraState.isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <p>INICIANDO CÁMARA...</p>
                    </>
                  ) : (
                    <>
                      <Camera size={48} />
                      <p>CÁMARA NO DISPONIBLE</p>
                    </>
                  )}
                </div>
              )}
  
              {cameraState.flashActive && <div className="flash active"></div>}
  
              {cameraState.showCountdown && (
                <div className="countdown-display">
                  <div className="countdown-message">{cameraState.countdownMessage}</div>
                  {cameraState.countdown > 0 && (
                    <div className="countdown-timer">{cameraState.countdown}</div>
                  )}
                </div>
              )}
            </div>
  
            <button
              className={`capture-button ${cameraState.isTakingPhotos ? 'processing' : ''}`}
              onClick={takePhotoSequence}
              disabled={!cameraState.stream || cameraState.isTakingPhotos}
            >
              {cameraState.isTakingPhotos ? (
                <>
                  <div className="capture-loader"></div>
                  {`CAPTURA ${cameraState.photosTaken}/3`}
                </>
              ) : (
                <>
                  <Zap size={20} /> INICIAR SECUENCIA
                </>
              )}
            </button>
          </div>
  
          <div className="compact-controls">
            <div className="control-buttons-row">
              <button 
                className="control-button"
                onClick={toggleCamera}
                disabled={cameraState.isLoading}
              >
                <Power size={18} />
                <span>{cameraState.isActive ? "DESACTIVAR" : "ACTIVAR"}</span>
              </button>
  
              {cameraState.availableCameras.length > 1 && (
                <button
                  className="control-button"
                  onClick={() => setCameraState(prev => ({...prev, showCameraSelector: true}))}
                  disabled={cameraState.isLoading}
                >
                  <RefreshCw size={18} />
                  <span>CÁMARA</span>
                </button>
              )}
  
              <button
                className="control-button"
                onClick={() => setShowFilters(!showFilters)}
                disabled={cameraState.isTakingPhotos}
              >
                <Image size={18} />
                <span>FILTROS</span>
              </button>
  
              <button
                className="control-button"
                onClick={() => setShowMasks(!showMasks)}
                disabled={cameraState.isTakingPhotos}
              >
                <User size={18} />
                <span>MÁSCARAS</span>
              </button>
            </div>
  
            {showFilters && (
              <div className="options-section">
                <h3><Smile size={16} /> FILTROS HOLOGRÁFICOS</h3>
                <div className="options-grid">
                  {FILTERS.map(filter => (
                    <button
                      key={filter.id}
                      className={`option-button ${cameraState.filter === filter.id ? 'active' : ''}`}
                      onClick={() => handleFilterChange(filter.id)}
                      disabled={cameraState.isTakingPhotos}
                    >
                      <div className="option-preview" style={{ filter: filter.css }}>
                        <div className="option-icon">
                          <Camera size={14} />
                        </div>
                      </div>
                      <span className="option-name">{filter.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
  
            {showMasks && (
              <div className="options-section">
                <h3><Smile size={16} /> MÓDULOS DE REALIDAD AUMENTADA</h3>
                <div className="options-grid">
                  {MASKS.map(mask => (
                    <button
                      key={mask.id}
                      className={`option-button ${cameraState.mask === mask.id ? 'active' : ''}`}
                      onClick={() => handleMaskChange(mask.id)}
                      disabled={cameraState.isTakingPhotos}
                    >
                      <div className="option-preview">
                        <img 
                          src={mask.url} 
                          alt={mask.name} 
                          className="mask-preview-thumb"
                          style={{
                            ...mask.position,
                            position: 'absolute'
                          }}
                          onError={(e) => {
                            e.target.src = '/img/placeholder-mask.png';
                          }}
                        />
                      </div>
                      <span className="option-name">{mask.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
  
          <CabinaFotograficaGallery 
            photos={recentPhotos}
            onPhotoSelect={(photo) => {
              setCapturedPhotos(photo.individualUrls || [photo.url]);
              setCurrentPhotoIndex(0);
              setShowResultModal(true);
            }}
            compactView={true}
          />
        </div>
      </div>
    );
  };
  
  export default CabinaFotografica;