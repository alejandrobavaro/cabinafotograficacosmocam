import React from "react";
import { Image } from "react-feather";
import "../assets/scss/_03-Componentes/_CabinaFotograficaGallery.scss";

const CabinaFotograficaGallery = ({ 
  photos = [], 
  onPhotoSelect, 
  compactView = false,
  showPromoPhotos = false
}) => {
  const [showGallery, setShowGallery] = React.useState(false);

  // Fotos promocionales
  const promoPhotos = [
    { id: 1, src: "/img/06-img-galeria3/id1-c1.png", category: "Futurista" },
    { id: 2, src: "/img/06-img-galeria3/id2-c2.png", category: "Neón" },
    { id: 3, src: "/img/06-img-galeria3/id3-c3.png", category: "Cyber" },
    { id: 4, src: "/img/06-img-galeria3/id4-c4.png", category: "Holográfico" },
    { id: 5, src: "/img/06-img-galeria3/id5-c5.png", category: "Futurista" },
  ];

  const allPhotos = showPromoPhotos ? [...photos, ...promoPhotos] : photos;

  const handleImageError = (e) => {
    e.target.src = '/img/placeholder-futurista.png';
    e.target.alt = 'Imagen no disponible';
  };

  return (
    <div className={`gallery-section ${compactView ? 'compact-view' : ''}`}>
      <div className="gallery-header">
        <h3><Image size={16} /> TUS CAPTURAS</h3>
        <button 
          className="toggle-gallery"
          onClick={() => setShowGallery(!showGallery)}
        >
          {showGallery ? 'OCULTAR' : 'MOSTRAR'}
        </button>
      </div>
      
      {showGallery && (
        <div className="gallery-thumbnails">
          {allPhotos.length === 0 ? (
            <p className="empty-gallery">No hay fotos disponibles</p>
          ) : (
            allPhotos.map((photo, index) => (
              <div 
                key={index} 
                className="gallery-thumbnail"
                onClick={() => onPhotoSelect(photo)}
              >
                <img 
                  src={photo.url || photo.src} 
                  alt={`Foto ${index}`} 
                  onError={handleImageError}
                />
                {photo.category && (
                  <div className="photo-category">{photo.category}</div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CabinaFotograficaGallery;