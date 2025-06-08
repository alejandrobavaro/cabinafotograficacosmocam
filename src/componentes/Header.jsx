import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BsList,
  BsHouseDoor,
  BsCameraFill,
  BsImages,
  BsChatLeftTextFill,
  BsPlayBtnFill,
  BsQrCodeScan,
  BsEnvelope
} from "react-icons/bs";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_Header.scss";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Enlaces públicos principales
  const publicLinks = [
    { path: "/", icon: <BsHouseDoor />, label: "Inicio" },
    { path: "/cabina-fotografica", icon: <BsCameraFill />, label: "Cabina" },
    { path: "/galeria", icon: <BsImages />, label: "Galería" },
    { path: "/mensajes", icon: <BsChatLeftTextFill />, label: "Mensajes" },
    { path: "/live", icon: <BsPlayBtnFill />, label: "Live" },
    { path: "/qr-social", icon: <BsQrCodeScan />, label: "QR Social" },
    { path: "/contacto", icon: <BsEnvelope />, label: "Contacto" }
  ];

  return (
    <header className="app-header">
      <div className="header-decoration-top"></div>

      <Navbar expand="lg" className="header-navbar">
        <Container className="header-container">
          <Navbar.Brand as={Link} to="/" className="header-logo">
            <img
              src="../../img/02-logos/logocabinafotografica2.png"
              alt="Logo Cabina Fotográfica"
              className="logo-image"
            />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggleMobileMenu}
            className="menu-toggle"
          >
            <BsList className="menu-icon" />
          </Navbar.Toggle>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}
          >
            <Nav className="nav-links">
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="header-decoration-bottom"></div>
    </header>
  );
};

export default Header;