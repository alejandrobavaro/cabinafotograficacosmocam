import React from 'react';
import { Zap } from 'react-feather';
import "../assets/scss/_03-Componentes/_CabinaFotograficaTutorial.scss";

const TUTORIAL_STEPS = [
  {
    title: "Permite el acceso a la cámara",
    description: "Habilita los permisos para usar tu cámara cuando el sistema lo solicite."
  },
  {
    title: "Selecciona efectos futuristas",
    description: "Elige entre nuestros filtros holográficos y máscaras de realidad aumentada."
  },
  {
    title: "Activa la secuencia de fotos",
    description: "El sistema capturará automáticamente 3 fotos en secuencia."
  },
  {
    title: "¡Sonríe para la matriz!",
    description: "Tus fotos se procesarán con tecnología cuántica y estarán disponibles al instante."
  }
];

const CabinaFotograficaTutorial = ({ onStart, onClose }) => {
  return (
    <div className="tutorial-wrapper">
      <div className="tutorial-card">
        <div className="tutorial-header">
          <h2 className="tutorial-title">INSTRUCCIONES DEL SISTEMA</h2>
          <div className="tutorial-divider"></div>
        </div>
        
        <div className="steps-container">
          {TUTORIAL_STEPS.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-badge">{index + 1}</div>
              <div className="step-info">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="tutorial-actions">
          <button className="start-btn" onClick={onStart}>
            <Zap size={18} />
            INICIAR SECUENCIA
          </button>
          <button className="close-btn" onClick={onClose}>
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinaFotograficaTutorial;