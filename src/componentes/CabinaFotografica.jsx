import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, Smile, Camera, User, Power, RefreshCw, Image } from 'react-feather';
import CabinaFotograficaTutorial from './CabinaFotograficaTutorial';
import CabinaFotograficaGuestForm from './CabinaFotograficaGuestForm';
import CabinaFotograficaGallery from './CabinaFotograficaGallery';
import CabinaFotograficaAudio from './CabinaFotograficaAudio';
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

const CabinaFotografica = ({ fullscreenMode }) => {
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
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showCollageModal, setShowCollageModal] = useState(false);
  const [currentCollage, setCurrentCollage] = useState(null);

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
    setShowGalleryModal(false);
  }, []);

  const triggerEffect = useCallback(() => {
    const effects = ['confetti'];
    setActiveEffect(effects[Math.floor(Math.random() * effects.length)]);
    setTimeout(() => setActiveEffect(null), 2000);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (navigator.storage && navigator.storage.estimate) {
          const { usage, quota } = await navigator.storage.estimate();
          if (usage / quota > 0.9) {
            localStorage.removeItem('cabinaFotograficaFotos');
          }
        }

        const savedPhotos = localStorage.getItem('cabinaFotograficaFotos');
        if (savedPhotos) {
          try {
            const parsedPhotos = JSON.parse(savedPhotos);
            setRecentPhotos(parsedPhotos.slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY));
          } catch (e) {
            localStorage.removeItem('cabinaFotograficaFotos');
          }
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

  const savePhotosToStorage = async (photos) => {
    try {
      const photosToSave = photos.slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY);
      localStorage.setItem('cabinaFotograficaFotos', JSON.stringify(photosToSave));
      return photosToSave;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        const reducedPhotos = photos.slice(0, Math.floor(CONFIG.MAX_PHOTOS_IN_GALLERY / 2));
        localStorage.setItem('cabinaFotograficaFotos', JSON.stringify(reducedPhotos));
        return reducedPhotos;
      }
      return photos.slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY);
    }
  };

  const compressImage = (dataUrl, quality) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const handleClose = useCallback(() => {
    if (cameraState.stream) {
      cameraState.stream.getTracks().forEach(track => track.stop());
    }
    navigate("/");
  }, [cameraState.stream, navigate]);

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

  const createCollage = useCallback(async (photos) => {
    if (photos.length === 0) return null;
    
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const collageWidth = 800;
      const collageHeight = 1200;
      
      canvas.width = collageWidth;
      canvas.height = collageHeight;
      context.fillStyle = 'white';
      context.fillRect(0, 0, collageWidth, collageHeight);
      
      const promises = photos.map((photo, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const yPos = index * (collageHeight / CONFIG.PHOTO_SEQUENCE_COUNT);
            context.drawImage(img, 0, yPos, collageWidth, collageHeight / CONFIG.PHOTO_SEQUENCE_COUNT);
            resolve();
          };
          img.onerror = resolve;
          img.src = photo;
        });
      });
      
      await Promise.all(promises);
      
      context.font = '30px Orbitron';
      context.fillStyle = '#00f0ff';
      context.textAlign = 'center';
      context.fillText('CABINA FUTURISTA', collageWidth / 2, collageHeight - 50);
      context.font = '20px Orbitron';
      context.fillText(guestData.name || 'USUARIO', collageWidth / 2, collageHeight - 20);
      
      return canvas.toDataURL('image/jpeg', 0.8);
    } catch (error) {
      console.error("Error creating collage:", error);
      return null;
    }
  }, [guestData.name]);

  const handlePhotosTaken = useCallback(async (photos) => {
    if (photos.length === 0) return;
    
    const collageUrl = await createCollage(photos);
    if (!collageUrl) return;
    
    const newPhoto = { 
      url: collageUrl, 
      individualUrls: photos,
      timestamp: Date.now()
    };

    setRecentPhotos(prev => {
      const updatedPhotos = [newPhoto, ...prev].slice(0, CONFIG.MAX_PHOTOS_IN_GALLERY);
      savePhotosToStorage(updatedPhotos);
      return updatedPhotos;
    });
    
    setCurrentCollage(collageUrl);
    setShowCollageModal(true);
    setCapturedPhotos([]);
  }, [createCollage]);

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
  };

  const handleMaskChange = (maskId) => {
    setCameraState(prev => ({ ...prev, mask: maskId === prev.mask ? null : maskId }));
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
            @media print { body { padding: 0; } img { width: 100%; height: auto; } }
          </style></head>
          <body>
            <img src="${photoUrl}" alt="Foto cabina futurista" />
            <script>
              setTimeout(() => { window.print(); window.close(); }, 500);
            </script>
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

  const CollageModal = () => (
    <div className="collage-modal">
      <div className="collage-modal-content">
        <button className="close-modal" onClick={() => setShowCollageModal(false)}>
          <X size={20} />
        </button>
        <h3>¡CAPTURA PROCESADA!</h3>
        <div className="collage-preview">
          <img src={currentCollage} alt="Collage final" />
        </div>
        <div className="collage-actions">
          <button onClick={() => handlePhotoAction('download', currentCollage)}>
            DESCARGAR
          </button>
          <button onClick={() => {
            setShowCollageModal(false);
            setShowGalleryModal(true);
          }}>
            VER EN GALERÍA
          </button>
        </div>
      </div>
    </div>
  );

  const GalleryModal = () => (
    <div className="gallery-modal">
      <div className="gallery-modal-content">
        <button className="close-modal" onClick={() => setShowGalleryModal(false)}>
          <X size={20} />
        </button>
        <h3>ARCHIVO DE CAPTURAS</h3>
        <div className="gallery-modal-body">
          <CabinaFotograficaGallery 
            photos={recentPhotos}
            showActions={true}
            onPhotoAction={handlePhotoAction}
            autoPlay={true}
          />
        </div>
        <div className="gallery-modal-footer">
          <button onClick={resetLocalStorage}>
            LIMPIAR GALERÍA
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
        onClose={handleClose}
      />
    );
  }

  if (showGuestForm) {
    return (
      <CabinaFotograficaGuestForm
        guestData={guestData}
        onGuestDataChange={setGuestData}
        onContinue={() => setShowGuestForm(false)}
        onClose={handleClose}
      />
    );
  }

  return (
    <div className={`cabina-fotografica-container ${fullscreenMode ? 'fullscreen-mode' : ''}`}>
      {activeEffect === 'confetti' && <ConfettiEffect />}
      {showCollageModal && <CollageModal />}
      {showGalleryModal && <GalleryModal />}
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <CabinaFotograficaAudio 
        currentStep={currentStep}
        photosTaken={cameraState.photosTaken}
        onSubtitleChange={setSubtitle}
      />
      
      {subtitle && <div className="subtitle-display">{subtitle}</div>}
  
      <button className="close-fullscreen" onClick={handleClose}>
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
        <div className="cabina-left-column">
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
  
        <div className="cabina-right-column">
          <div className="camera-controls-group">
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
          </div>

          {cameraState.showCameraSelector && (
            <div className="camera-selector-modal">
              <div className="camera-selector-content">
                <h4>SELECCIONAR CÁMARA</h4>
                <ul className="camera-list">
                  {cameraState.availableCameras.map((camera) => (
                    <li
                      key={camera.deviceId}
                      className={cameraState.selectedCameraId === camera.deviceId ? 'selected' : ''}
                      onClick={() => switchCamera(camera.deviceId)}
                    >
                      {camera.label || `Cámara ${camera.deviceId}`}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setCameraState(prev => ({ ...prev, showCameraSelector: false }))}>
                  CERRAR
                </button>
              </div>
            </div>
          )}

          <div className="filters-section">
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

          <div className="masks-section">
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

          <div className="secondary-controls">
            <button
              className="secondary-button"
              onClick={() => setShowGalleryModal(true)}
              disabled={recentPhotos.length === 0}
            >
              <Image size={16} /> ARCHIVO DE CAPTURAS
            </button>
            <button
              className="secondary-button"
              onClick={() => setShowGuestForm(true)}
            >
              <User size={16} /> {guestData.name ? 'EDITAR USUARIO' : 'REGISTRAR USUARIO'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinaFotografica;