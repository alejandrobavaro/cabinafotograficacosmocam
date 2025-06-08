import React, { useState, useEffect } from 'react';
import { Image, Share2, Download, Printer, ChevronLeft } from 'react-feather';
import "../assets/scss/_03-Componentes/_CabinaFotograficaGallery.scss";

const CabinaFotograficaGallery = ({ 
  photos, 
  showActions,
  onPhotoAction,
  onBack
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [shareOptions, setShareOptions] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (photos.length > 0 && !selectedPhoto) {
      setSelectedPhoto(photos[0]?.url || null);
    }
  }, [photos, selectedPhoto]);

  useEffect(() => {
    if (!autoSlide || photos.length <= 1 || showActions) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length, autoSlide, showActions]);

  useEffect(() => {
    if (photos.length > 0 && !showActions) {
      const photoUrl = photos[currentSlide]?.url;
      if (photoUrl && photoUrl !== selectedPhoto) {
        setSelectedPhoto(photoUrl);
      }
    }
  }, [currentSlide, photos, selectedPhoto, showActions]);

  const handlePhotoSelect = (index) => {
    setCurrentSlide(index);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const handleAction = (action, platform = null) => {
    if (!selectedPhoto) return;
    
    if (action === 'share' && platform) {
      onPhotoAction('share', selectedPhoto, platform);
    } else {
      onPhotoAction(action, selectedPhoto);
    }
  };

  if (photos.length === 0) {
    return (
      <div className="gallery-container">
        <div className="empty-gallery">
          <Image size={48} className="empty-icon" />
          <p>NO SE DETECTAN IMÁGENES EN EL SISTEMA</p>
          <button className="back-button" onClick={onBack}>
            <ChevronLeft size={16} /> INICIAR NUEVA SECUENCIA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {showActions ? (
        <div className="gallery-actions">
          <h3 className="gallery-title">
            <Image size={18} /> ¡CAPTURAS PROCESADAS!
          </h3>
          
          <div className="photo-preview">
            <img 
              src={selectedPhoto || photos[0]?.url} 
              alt="Foto seleccionada" 
              className="selected-photo"
            />
          </div>

          <div className="action-buttons">
            <button 
              className="action-button print-button"
              onClick={() => handleAction('print')}
            >
              <Printer size={16} /> IMPRIMIR
            </button>
            <button 
              className="action-button download-button"
              onClick={() => handleAction('download')}
            >
              <Download size={16} /> DESCARGAR
            </button>
            <button 
              className="action-button share-button"
              onClick={() => setShareOptions(!shareOptions)}
            >
              <Share2 size={16} /> COMPARTIR
              {shareOptions && (
                <div className="share-dropdown">
                  <button onClick={() => handleAction('share', 'whatsapp')}>
                    <span className="network-icon whatsapp">WA</span> WhatsApp
                  </button>
                  <button onClick={() => handleAction('share', 'facebook')}>
                    <span className="network-icon facebook">FB</span> Facebook
                  </button>
                  <button onClick={() => handleAction('share', 'instagram')}>
                    <span className="network-icon instagram">IG</span> Instagram
                  </button>
                </div>
              )}
            </button>
          </div>

          <button className="back-button" onClick={onBack}>
            <ChevronLeft size={16} /> NUEVA CAPTURA
          </button>
        </div>
      ) : (
        <>
          <h3 className="gallery-title">
            <Image size={18} /> ARCHIVO DE CAPTURAS ({photos.length})
          </h3>
          
          <div className="photo-preview-slider">
            <img 
              src={selectedPhoto || photos[0]?.url} 
              alt={`Foto ${currentSlide + 1}`} 
              className="selected-photo"
            />
            <div className="slide-indicator">
              {currentSlide + 1} / {photos.length}
            </div>
          </div>
          
          <div className="photos-grid">
            {photos.map((photo, index) => (
              <div 
                key={`${photo.url}-${index}`}
                className={`photo-item ${currentSlide === index ? 'selected' : ''}`}
                onClick={() => handlePhotoSelect(index)}
              >
                <img 
                  src={photo.url} 
                  alt={`Foto ${index + 1}`} 
                  loading="lazy"
                  className="photo-thumbnail"
                />
                <span className="photo-badge">{index + 1}</span>
                {currentSlide === index && (
                  <div className="photo-selection-indicator"></div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CabinaFotograficaGallery;