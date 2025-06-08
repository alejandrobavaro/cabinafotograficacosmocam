import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/_03-Componentes/_MainCabinaButton.scss';

function MainCabinaButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cabina-fotografica');
  };

  return (
    <div className='cabina-button-container'>
      <button 
        className="cabina-button"
        onClick={handleClick}
        aria-label="Abrir cabina fotográfica"
      >
        <i className="bi bi-camera-fill"></i>
      </button>
    </div>
  );
}

export default MainCabinaButton;