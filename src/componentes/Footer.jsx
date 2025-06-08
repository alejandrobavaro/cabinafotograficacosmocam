import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/_03-Componentes/_Footer.scss";
import { BsInstagram, BsYoutube, BsFacebook, BsTiktok, BsWhatsapp } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="tech-footer">
      {/* Botón de contacto futurista */}
      <div className="tech-contact-btn-container">
        <Link 
          to="/contacto" 
          className="tech-contact-btn"
          onClick={scrollToTop}
        >
          <span>CONTACTO HOLOGRÁFICO</span>
          <div className="btn-hover-glow"></div>
        </Link>
      </div>
     
      {/* Contenido principal */}
      <div className="tech-footer-content">
        {/* Logos laterales con efecto holográfico */}
        <div className="tech-footer-logo-container">
          <div className="holographic-logo">
            <img 
              src="/img/02-logos/logocabinafotografica2.png"
              alt="Logo Holográfico" 
              className="tech-footer-logo"
            />
            <div className="hologram-effect"></div>
          </div>
        </div>
        
        {/* Redes sociales futuristas */}
        <div className="tech-social-links-container">
          <div className="tech-social-grid">
            <a href="#" target="_blank" rel="noopener noreferrer" className="tech-social-link">
              <BsInstagram className="tech-social-icon" />
              <span>INSTAGRAM</span>
              <div className="link-glow"></div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="tech-social-link">
              <BsYoutube className="tech-social-icon" />
              <span>YOUTUBE</span>
              <div className="link-glow"></div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="tech-social-link">
              <BsFacebook className="tech-social-icon" />
              <span>FACEBOOK</span>
              <div className="link-glow"></div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="tech-social-link">
              <BsTiktok className="tech-social-icon" />
              <span>TIKTOK</span>
              <div className="link-glow"></div>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="tech-social-link">
              <BsWhatsapp className="tech-social-icon" />
              <span>WHATSAPP</span>
              <div className="link-glow"></div>
            </a>
            <a href="mailto:#" className="tech-social-link">
              <FiMail className="tech-social-icon" />
              <span>HOLO-MAIL</span>
              <div className="link-glow"></div>
            </a>
          </div>
        </div>
        
        {/* Logo derecho con efecto holográfico */}
        <div className="tech-footer-logo-container">
          <div className="holographic-logo">
            <img 
              src="/img/02-logos/logocabinafotografica2.png"
              alt="Logo Holográfico" 
              className="tech-footer-logo"
            />
            <div className="hologram-effect"></div>
          </div>
        </div>
      </div>
      
      {/* Línea de escaneo futurista */}
      <div className="tech-scanline"></div>
      
      {/* Copyright futurista */}
      <div className="tech-copyright-container">
        <div className="tech-copyright-content">
          <a 
            href="https://alejandrobavaro.github.io/gondraworld-dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tech-dev-link"
          >
            <span className="tech-copyright-icon">◈</span>
            <span>DESARROLLO POR GONDRA WORLD TECH</span>
            <span className="tech-copyright-icon">◈</span>
            <div className="link-glow"></div>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;