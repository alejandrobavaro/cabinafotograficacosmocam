import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_GaleriaFotosTomadas.scss";

function GaleriaFotosTomadas({ fullscreenMode }) {
  // Configuración del slider futurista
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: window.innerWidth > 768,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '15%',
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '5%',
          arrows: false,
          dots: false
        }
      }
    ]
  };

  // Estado para las imágenes con efecto de carga
  const [fotos, setFotos] = useState([
    { id: 1, src: "/img/06-img-galeria3/id1-c1.png", category: "Futurista" },
    { id: 2, src: "/img/06-img-galeria3/id2-c2.png", category: "Neón" },
    { id: 3, src: "/img/06-img-galeria3/id3-c3.png", category: "Cyber" },
    { id: 4, src: "/img/06-img-galeria3/id4-c4.png", category: "Holográfico" },
    { id: 5, src: "/img/06-img-galeria3/id5-c5.png", category: "Futurista" },
    { id: 6, src: "/img/06-img-galeria3/id6-c6.png", category: "Neón" },
    { id: 7, src: "/img/06-img-galeria3/id7-c7.png", category: "Cyber" },
    { id: 8, src: "/img/06-img-galeria3/id8-c8.png", category: "Holográfico" },
    { id: 9, src: "/img/06-img-galeria3/id9-c9.png", category: "Futurista" },
    { id: 10, src: "/img/06-img-galeria3/id10-c10.png", category: "Neón" },
  ]);

  // Efecto para simular carga de imágenes
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para actualizar las flechas al redimensionar
  useEffect(() => {
    const handleResize = () => {
      sliderSettings.arrows = window.innerWidth > 768;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para manejar errores de imagen
  const handleImageError = (e) => {
    e.target.src = '/img/placeholder-futurista.png';
    e.target.alt = 'Imagen no disponible';
    e.target.style.filter = 'drop-shadow(0 0 10px rgba(100, 65, 255, 0.7))';
  };

  return (
    <section className={`galeria-fotos ${fullscreenMode ? 'fullscreen-mode' : ''}`}>
      <div className="galeria-header">
        <h2>GALERÍA DE FOTOS TOMADAS</h2>
        <p>EXPERIENCIAS CAPTURADAS EN NUESTRA CABINA FUTURISTA</p>
      </div>
      
      <div className="galeria-slider">
        {loading ? (
          <div className="loading-grid">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="loading-card">
                <div className="loading-placeholder neon-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {fotos.map((foto) => (
              <div key={foto.id} className="foto-container">
                <div className="foto-item">
                  <img 
                    src={foto.src} 
                    alt={`Foto ${foto.id}`} 
                    className="foto-imagen"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="foto-overlay">
                    <span className="foto-categoria">{foto.category}</span>
                    <div className="foto-id">#{foto.id.toString().padStart(3, '0')}</div>
                  </div>
                  <div className="foto-hologram-effect"></div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default GaleriaFotosTomadas;