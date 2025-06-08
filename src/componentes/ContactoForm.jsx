import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/scss/_03-Componentes/_ContactoForm.scss";

const ContactoForm = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: true
  };

  const boothPhotos = [
    "/img/03-img-banners/banner1.png",
    "/img/03-img-banners/banner2.png",
    "/img/03-img-banners/banner3.png",
    "/img/03-img-banners/banner4.png",
    "/img/03-img-banners/banner5.png"
  ];

  return (
    <section className="tech-form-section">
      <div className="tech-form-container">
        <h2 className="tech-form-title">
          <i className="bi bi-chat-square-text" /> TRANSMITE TU MENSAJE <i className="bi bi-chat-square-text" />
        </h2>
        
        <form
          className="tech-contact-form"
          action="https://formspree.io/f/xbjnlgzz"
          target="_blank"
          method="post"
        >
          <div className="tech-form-group">
            <div className="input-glow"></div>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="IDENTIFICACIÓN"
              required
              className="tech-input"
            />
            <i className="bi bi-person-fill input-icon"></i>
          </div>
          
          <div className="tech-form-group">
            <div className="input-glow"></div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="HOLO-MAIL"
              required
              className="tech-input"
            />
            <i className="bi bi-envelope-fill input-icon"></i>
          </div>
          
          <div className="tech-form-group">
            <div className="input-glow"></div>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={3}
              placeholder="MENSAJE CODIFICADO..."
              required
              className="tech-textarea"
            />
            <i className="bi bi-pencil-fill input-icon"></i>
          </div>
          
          <button type="submit" className="tech-submit-btn">
            <span>ENVIAR TRANSMISIÓN</span>
            <i className="bi bi-send" />
            <div className="btn-glow"></div>
          </button>
        </form>

        <div className="booth-slider-container">
          <Slider {...sliderSettings} className="booth-slider">
            {boothPhotos.map((photo, index) => (
              <div key={index} className="slider-item">
                <img 
                  src={photo} 
                  alt={`Neon Booth ${index + 1}`} 
                  className="booth-photo"
                />
                <div className="photo-overlay"></div>
                <div className="photo-scanline"></div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ContactoForm;