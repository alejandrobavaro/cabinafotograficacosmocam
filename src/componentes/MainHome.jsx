import React, { useState } from "react";
import "../assets/scss/_03-Componentes/_MainHome.scss";

import Novedades from "./Novedades";

import GaleriaFotosTomadas from "./GaleriaFotosTomadas";


function MainHome() {
  return (
    <div className="public-container">
      <main className="wedding-journal">
        <header className="journal-header">
        <Novedades />

          <br className="lineaSeparador" />

          <GaleriaFotosTomadas />
 

           
        </header>
      </main>
    </div>
  );
}

export default MainHome;