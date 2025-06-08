import React from "react";
import "../assets/scss/_03-Componentes/_FooterGondraWorldDev.scss";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiElectron } from "react-icons/si";

function FooterGondraWorldDev() {
  const techIcons = [
    { icon: <FaReact className="tech-icon" />, name: "React" },
    { icon: <FaNodeJs className="tech-icon" />, name: "Node.js" },
    { icon: <FaDatabase className="tech-icon" />, name: "Database" },
    { icon: <SiElectron className="tech-icon" />, name: "Electron" }
  ];

  return (
    <div className="tech-trademark-footer">
      <div className="tech-scanline-divider"></div>
      
      <div className="tech-dev-container">
        <a
          href="https://alejandrobavaro.github.io/gondraworld-dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-dev-link"
        >
          <div className="tech-dev-content">
            <div className="tech-dev-message">
              <i className="bi bi-cpu" /> CONSTRUIDO CON TECNOLOGÍA DEL FUTURO <i className="bi bi-cpu" />
            </div>
            
            <div className="tech-stack">
              {techIcons.map((tech, index) => (
                <div key={index} className="tech-stack-item">
                  {tech.icon}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
            
            <div className="tech-dev-signature">
              <i className="bi bi-stars" /> GONDRA WORLD TECH <i className="bi bi-stars" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default FooterGondraWorldDev;