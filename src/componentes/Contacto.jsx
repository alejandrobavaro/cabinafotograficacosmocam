import React from "react";
import "../assets/scss/_03-Componentes/_Contacto.scss";

const Contacto = () => {
  return (
    <section className="tech-contact-section">
      <div className="tech-contact-container">
        <div className="tech-brand-social">
          <div className="tech-brand">
            <img
              src="/img/02-logos/logocabinafotografica2.png"
              alt="Neon Photo Booth"
              className="tech-logo-img"
            />
            <div className="tech-logo-glow"></div>
          </div>

          <div className="tech-social">
            <h3 className="tech-social-title">
              <i className="bi bi-robot" /> CONÉCTATE <i className="bi bi-robot" />
            </h3>
            <div className="tech-social-grid">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-social-link"
              >
                <i className="bi bi-facebook" />
                <span>FACEBOOK</span>
                <div className="link-hover-glow"></div>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-social-link"
              >
                <i className="bi bi-instagram" />
                <span>INSTAGRAM</span>
                <div className="link-hover-glow"></div>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-social-link"
              >
                <i className="bi bi-youtube" />
                <span>YOUTUBE</span>
                <div className="link-hover-glow"></div>
              </a>
              <a
                href="mailto:#"
                className="tech-social-link"
              >
                <i className="bi bi-envelope-fill" />
                <span>HOLO-MAIL</span>
                <div className="link-hover-glow"></div>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-social-link"
              >
                <i className="bi bi-tiktok" />
                <span>TIKTOK</span>
                <div className="link-hover-glow"></div>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="tech-social-link"
              >
                <i className="bi bi-whatsapp" />
                <span>WHATSAPP</span>
                <div className="link-hover-glow"></div>
              </a>
            </div>
          </div>
        </div>

        <div className="tech-banner">
          <img
            src="/img/03-img-banners/banner2.png"
            alt="Neon Photo Booth Experience"
            className="tech-banner-img"
          />
          <div className="banner-scanline"></div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;