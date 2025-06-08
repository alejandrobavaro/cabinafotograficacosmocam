import React, { useState, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_LiveStream.scss";

function LiveStream() {
  const [isLive, setIsLive] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    preferencia: 'whatsapp'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  const calculateDaysLeft = () => {
    const eventDate = new Date('2025-11-23T19:00:00-03:00');
    const now = new Date();
    const diff = eventDate - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    const checkIfLive = () => {
      const eventDate = new Date('2025-11-23T19:00:00-03:00');
      const now = new Date();
      setDaysLeft(calculateDaysLeft());
      if (now >= eventDate) setIsLive(true);
    };

    checkIfLive();
    const interval = setInterval(checkIfLive, 86400000);
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="live-stream-container">
      <div className="stream-header">
        <h2>TRANSMISIÓN EN VIVO</h2>
        <p>Conecta con nuestro evento desde cualquier lugar</p>
      </div>
      
      <div className="stream-status">
        {isLive ? (
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>EN VIVO AHORA</span>
            <span className="live-pulse"></span>
          </div>
        ) : (
          <div className="countdown">
            <span className="countdown-label">TRANSMISIÓN EN:</span>
            <span className="countdown-days">{daysLeft}</span>
            <span className="countdown-text">DÍAS</span>
          </div>
        )}
      </div>
      
      <div className="stream-display">
        {isLive ? (
          <div className="video-container">
            <iframe 
              src="https://www.youtube.com/embed/TU_ID_DE_TRANSMISION"
              title="Transmisión en vivo del evento"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="stream-placeholder">
            <div className="placeholder-icon">
              <div className="camera-icon"></div>
            </div>
            <p>La transmisión comenzará automáticamente el día del evento</p>
          </div>
        )}
      </div>
      
      <div className="event-info">
        <div className="info-item">
          <span className="info-icon">📅</span>
          <span>23 NOV 2025</span>
        </div>
        <div className="info-item">
          <span className="info-icon">⏰</span>
          <span>19:00 (GMT-3)</span>
        </div>
        <div className="info-item">
          <span className="info-icon">📍</span>
          <span>CASA DEL MAR, BS AS</span>
        </div>
      </div>
      
      <div className="reminder-section">
        <h3>RECIBIR RECORDATORIO</h3>
        {formSubmitted ? (
          <div className="success-message">
            <p>¡LISTO! TE AVISAREMOS ANTES DEL EVENTO</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reminder-form">
            <div className="form-group">
              <input 
                type="text" 
                placeholder="TU NOMBRE COMPLETO"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input 
                type="email" 
                placeholder="TU EMAIL"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={formData.preferencia === 'email'}
              />
            </div>
            
            <div className="form-group">
              <input 
                type="tel" 
                placeholder="WHATSAPP"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required={formData.preferencia === 'whatsapp'}
              />
            </div>
            
            <div className="radio-options">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="preferencia" 
                  value="whatsapp"
                  checked={formData.preferencia === 'whatsapp'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                <span>WHATSAPP</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="preferencia" 
                  value="email"
                  checked={formData.preferencia === 'email'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                <span>EMAIL</span>
              </label>
            </div>
            
            <button type="submit" className="submit-button">
              <span className="button-text">ACTIVAR RECORDATORIO</span>
              <span className="button-glow"></span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LiveStream;