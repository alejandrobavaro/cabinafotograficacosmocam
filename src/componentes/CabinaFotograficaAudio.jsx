import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'react-feather';
import "../assets/scss/_03-Componentes/_CabinaFotograficaAudio.scss";

const CabinaFotograficaAudio = ({ 
  currentStep, 
  photosTaken,
  onSubtitleChange 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const countdownRef = useRef(null);
  const shutterRef = useRef(null);
  const instructionRef = useRef(null);

  // Sonidos de instrucciones (actualizados con nombres futuristas)
  const sounds = {
    start: '/audio/cabinafotografica-1.mp3',
    first: '/audio/cabinafotografica-2.mp3',
    second: '/audio/cabinafotografica-3.mp3',
    third: '/audio/cabinafotografica-4.mp3',
    countdown: '/audio/cabinafotografica-5.mp3',
    shutter: '/audio/cabinafotografica-6.mp3'
  };


  const subtitles = {
    start: "INICIANDO SECUENCIA FOTOGRÁFICA... PREPÁRESE",
    first: "CAPTURA 1 DE 3: ¡DIGA 'QUANTUM'!",
    second: "CAPTURA 2 DE 3: ¡DIGA 'MATRIX'!",
    third: "CAPTURA 3 DE 3: ¡DIGA 'NOVA'!",
    countdown: "¡SONRÍA PARA EL ESCÁNER!",
    done: "SECUENCIA COMPLETADA. PROCESANDO IMÁGENES..."
  };

  // Controlar volumen de todos los audios
  useEffect(() => {
    [countdownRef, shutterRef, instructionRef].forEach(ref => {
      if (ref.current) {
        ref.current.volume = isMuted ? 0 : volume;
      }
    });
  }, [volume, isMuted]);

  // Reproducir sonidos según el paso actual
  useEffect(() => {
    if (!instructionRef.current) return;

    let soundToPlay = null;
    let subtitle = "";

    switch(currentStep) {
      case 'start':
        soundToPlay = sounds.start;
        subtitle = subtitles.start;
        break;
      case 'first':
        soundToPlay = sounds.first;
        subtitle = subtitles.first;
        break;
      case 'second':
        soundToPlay = sounds.second;
        subtitle = subtitles.second;
        break;
      case 'third':
        soundToPlay = sounds.third;
        subtitle = subtitles.third;
        break;
      case 'countdown':
        soundToPlay = sounds.countdown;
        subtitle = subtitles.countdown;
        break;
      case 'done':
        subtitle = subtitles.done;
        break;
      default:
        return;
    }

    if (soundToPlay) {
      instructionRef.current.src = soundToPlay;
      instructionRef.current.play().catch(e => console.error("Error al reproducir audio:", e));
    }

    if (subtitle) {
      onSubtitleChange(subtitle);
    }

    // Sonido del obturador cuando se toma una foto
    if (photosTaken > 0 && shutterRef.current) {
      setTimeout(() => {
        shutterRef.current.play().catch(e => console.error("Error al reproducir shutter:", e));
      }, 500);
    }
  }, [currentStep, photosTaken]);

  return (
    <div className="audio-controls-container">
      {/* Elementos de audio (ocultos) */}
      <audio ref={countdownRef} src={sounds.countdown} preload="auto" />
      <audio ref={shutterRef} src={sounds.shutter} preload="auto" />
      <audio ref={instructionRef} preload="auto" />
      
      {/* Controles de audio visibles */}
      <div className="audio-controls">
        <button 
          className="mute-button"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          data-active={!isMuted}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
          aria-label="Control de volumen"
          data-active={!isMuted}
        />
      </div>
    </div>
  );
};

export default CabinaFotograficaAudio;