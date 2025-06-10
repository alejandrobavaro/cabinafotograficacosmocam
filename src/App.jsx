import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

//------------ESTILOS--------------//
import "./assets/scss/_01-General/_AppBodyEstilosGenerales.scss";

//------------COMPONENTES ESTRUCTURALES--------------//
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import MainWhatsappIcon from "./componentes/MainWhatsappIcon";
import MainPublicidadSlider from "./componentes/MainPublicidadSlider";

//------------COMPONENTES PRINCIPALES--------------//
import MainHome from "./componentes/MainHome";
import Novedades from "./componentes/Novedades";
import Contacto from "./componentes/Contacto";
import ContactoForm from "./componentes/ContactoForm";

//------------BOTON CABINA FOTOGRAFICA--------------//
import MainCabinaButton from "./componentes/MainCabinaButton";

//------------CABINA FOTOGRÁFICA--------------//
import CabinaFotografica from "./componentes/CabinaFotografica";
import CabinaFotograficaGallery from "./componentes/CabinaFotograficaGallery";

import QrSocialPost from "./componentes/QrSocialPost";

//------------INTERACCIÓN--------------//
import Mensajes from "./componentes/Mensajes";
import LiveStream from "./componentes/LiveStream";

//------------PANEL ORGANIZACIÓN--------------//
import PanelOrganizacion from "./componentes/PanelOrganizacion";

//------------CONTEXTOS--------------//
import { AuthProvider, useAuth } from "./context/AuthContext";

function PrivateRoute({ children, requiredLevel }) {
  const { nivelAcceso } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (nivelAcceso !== requiredLevel) {
      navigate("/", { replace: true });
    }
  }, [nivelAcceso, requiredLevel, navigate]);

  if (nivelAcceso !== requiredLevel) {
    return null;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="app-container">
          <Header />

          <main className="main-content">
            <div className="content-wrapper">
              <Routes>
                {/* RUTAS PRINCIPALES */}
                <Route path="/" element={<MainHome />} />
                <Route path="/inicio" element={<MainHome />} />
                <Route
                  path="/novedades"
                  element={
                    <div className="fullscreen-mode">
                      <Novedades />
                    </div>
                  }
                />

                {/* CABINA FOTOGRÁFICA */}
                <Route
                  path="/cabina-fotografica"
                  element={
                    <div className="fullscreen-mode">
                      <CabinaFotografica />
                    </div>
                  }
                />

                {/* GALERÍA Y COMPARTIR */}
                <Route
                  path="/galeria"
                  element={
                    <div className="fullscreen-mode">
                      <CabinaFotograficaGallery />
                    </div>
                  }
                />
                <Route
                  path="/qr-social"
                  element={
                    <div className="fullscreen-mode">
                      <QrSocialPost />
                    </div>
                  }
                />

                {/* INTERACCIÓN */}
                <Route
                  path="/mensajes"
                  element={
                    <div className="fullscreen-mode">
                      <Mensajes />
                    </div>
                  }
                />
                <Route
                  path="/live"
                  element={
                    <div className="fullscreen-mode">
                      <LiveStream />
                    </div>
                  }
                />

                {/* CONTACTO */}
                <Route
                  path="/contacto"
                  element={
                    <div className="contacto-container">
                      <div className="contacto-section">
                        <Contacto />
                      </div>
                      <div className="form-section">
                        <ContactoForm />
                      </div>
                    </div>
                  }
                />

                {/* PANEL DE ORGANIZACIÓN (PRIVADO) */}
                <Route
                  path="/organizacion"
                  element={
                    <PrivateRoute requiredLevel="organizacion">
                      <PanelOrganizacion />
                    </PrivateRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>

          <MainCabinaButton />
          <MainPublicidadSlider />
          <Footer />
          <MainWhatsappIcon />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;