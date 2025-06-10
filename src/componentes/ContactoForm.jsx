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
    cssEase: 'linear'
  };

  const boothPhotos = Array(5).fill().map((_, i) => 
    `/img/03-img-banners/banner${i+1}.png`
  );

  return (
    <div className="tech-form-section">
      <h2 className="tech-form-title">
        <i className="bi bi-chat-square-text" /> TRANSMITE TU MENSAJE <i className="bi bi-chat-square-text" />
      </h2>
      
      <form className="tech-contact-form" action="https://formspree.io/f/xbjnlgzz" method="POST">
        {[
          { type: "text", id: "nombre", icon: "person-fill", placeholder: "IDENTIFICACIÓN" },
          { type: "email", id: "email", icon: "envelope-fill", placeholder: "HOLO-MAIL" }
        ].map((input) => (
          <div key={input.id} className="tech-form-group">
            <input
              type={input.type}
              id={input.id}
              name={input.id}
              placeholder={input.placeholder}
              required
              className="tech-input"
            />
            <i className={`bi bi-${input.icon} input-icon`}></i>
          </div>
        ))}
        
        <div className="tech-form-group">
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
        </button>
      </form>

      <div className="booth-slider-container">
        <Slider {...sliderSettings}>
          {boothPhotos.map((photo, index) => (
            <div key={index}>
              <img src={photo} alt={`Banner ${index+1}`} className="booth-photo" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ContactoForm;