import React from 'react';
import { User, Phone, ArrowRight } from 'react-feather';
import "../assets/scss/_03-Componentes/_CabinaFotograficaGuestForm.scss";

const CabinaFotograficaGuestForm = ({ guestData, onGuestDataChange, onContinue }) => {
  const handleChange = (e) => {
    onGuestDataChange({
      ...guestData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="guest-form-modal">
      <div className="guest-form-content">
        <div className="guest-form-header">
          <h2 className="guest-form-title">REGISTRO DE USUARIO</h2>
          <div className="guest-form-divider"></div>
          <p className="guest-form-subtitle">Ingresa tus datos para acceder al sistema fotográfico</p>
        </div>
        
        <div className="guest-form-group">
          <label className="form-label">
            <User size={18} className="form-icon" /> 
            <span>IDENTIFICACIÓN</span>
          </label>
          <input
            type="text"
            name="name"
            value={guestData.name}
            onChange={handleChange}
            placeholder="Ej: Operador MK-117"
            className="form-input"
          />
        </div>
        
        <div className="guest-form-group">
          <label className="form-label">
            <Phone size={18} className="form-icon" /> 
            <span>CÓDIGO DE CONTACTO (OPCIONAL)</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={guestData.phone}
            onChange={handleChange}
            placeholder="Ej: 11 2345-6789"
            className="form-input"
          />
        </div>
        
        <button 
          className="guest-form-submit"
          onClick={onContinue}
          disabled={!guestData.name}
        >
          <span>ACCEDER AL SISTEMA</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CabinaFotograficaGuestForm;