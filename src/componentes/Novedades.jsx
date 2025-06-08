import React, { useState } from "react";
import "../assets/scss/_03-Componentes/_Novedades.scss";

function Novedades({ fullscreenMode }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedNews, setExpandedNews] = useState(null);

  // Revista futurista con diferentes eventos
  const magazinePages = [
    {
      title: "TECHNO WEDDING 3025",
      date: "Enero 3025",
      image: "/img/06-img-galeria3/id12-c12.png",
      content: (
        <>
          <p>La boda más futurista del año se celebró en la Estación Orbital Neo-Tokyo. CosmoCam fue la gran protagonista: una cabina fotográfica holográfica capaz de capturar momentos únicos... ¡en gravedad cero!</p>
          <blockquote>
            "Las fotos con efecto antigravedad fueron el hit de la recepción. ¡Nadie había visto nada igual!"
            <cite>- Novia, Aiko Nakamura</cite>
          </blockquote>
          <p>Gracias a su sistema de levitación magnética, CosmoCam ofreció sesiones fotográficas imposibles en la Tierra. Una experiencia visual que transformó el evento en leyenda.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id10-c10.png", "/img/06-img-galeria3/id11-c11.png", "/img/06-img-galeria3/id13-c13.png"],
      category: "Boda Espacial"
    },
    {
      title: "FIESTA DE 15 GALÁCTICA",
      date: "Marzo 3025",
      image: "/img/06-img-galeria3/id8-c8.png",
      content: (
        <>
          <h4>Celebración Interplanetaria</h4>
          <p>Luna Martínez celebró sus 15 en una fiesta temática galáctica, donde CosmoCam deslumbró a los invitados con escenarios espaciales personalizados.</p>
          
          <h4>Realidad Aumentada</h4>
          <p>Desde fondos animados de nebulosas hasta efectos alienígenas en tiempo real, cada foto fue una obra de ciencia ficción.</p>
          
          <h4>Fotos 4D Inmersivas</h4>
          <p>Con tecnología 4D, CosmoCam capturó movimiento, sonido y emoción, dejando un recuerdo sensorial completo e inolvidable.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id1-c1.png", "/img/06-img-galeria3/id2-c2.png", "/img/06-img-galeria3/id3-c3.png"],
      category: "Fiesta de 15"
    },
    {
      title: "DIVORCIO CIBERNÉTICO",
      date: "Junio 3025",
      image: "/img/06-img-galeria3/id4-c4.png",
      content: (
        <>
          <p>Una nueva tendencia: fiestas de divorcio temáticas. Y CosmoCam estuvo allí para convertir una separación en una experiencia única.</p>
          
          <div className="planning-details">
            <div className="detail-item">
              <h5>Tema</h5>
              <p>"Free Again 2.0"</p>
            </div>
            <div className="detail-item">
              <h5>Efectos</h5>
              <p>Hologramas de ruptura con glitch art</p>
            </div>
            <div className="detail-item">
              <h5>Fotos</h5>
              <p>Estilo cyberpunk con máscaras digitales en tiempo real</p>
            </div>
          </div>
          
          <p>"Queríamos algo que marcara un nuevo comienzo con humor y estilo", dijeron los protagonistas mientras posaban entre neones y humo digital.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id5-c5.png", "/img/06-img-galeria3/id6-c6.png", "/img/06-img-galeria3/id7-c7.png"],
      category: "Divorcio"
    },
    {
      title: "RAVE NEON",
      date: "Agosto 3025",
      image: "/img/06-img-galeria3/id5-c5.png",
      content: (
        <>
          <p>En el festival Neon Dreams, CosmoCam fue más que una cabina: fue una instalación artística interactiva.</p>
          <blockquote>
            "Las fotos con efectos de fluorescencia y seguimiento de movimiento fueron lo más compartido en redes sociales"
            <cite>- DJ CyberX</cite>
          </blockquote>
          <p>Gracias al reconocimiento de baile en vivo, cada foto respondía a los movimientos del cuerpo, creando visuales psicodélicos únicos para cada asistente.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id14-c14.png", "/img/06-img-galeria3/id15-c15.png"],
      category: "Festival"
    },
    {
      title: "CORPORATIVO ANDROIDE",
      date: "Septiembre 3025",
      image: "/img/06-img-galeria3/id16-c16.png",
      content: (
        <>
          <p>En la convención anual de Quantum Inc., CosmoCam se integró perfectamente al espíritu tech del evento.</p>
          
          <div className="ring-specs">
            <div>
              <h5>Tecnología usada</h5>
              <p>Fotografía con avatares digitales personalizados</p>
            </div>
            <div>
              <h5>Efectos</h5>
              <p>Overlays informativos y métricas en tiempo real sobre cada participante</p>
            </div>
          </div>
          
          <p>Los asistentes pudieron tomarse fotos como humanos, androides o ejecutivos del futuro, gracias al sistema de caracterización instantánea de CosmoCam.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id17-c17.png", "/img/06-img-galeria3/id18-c18.png"],
      category: "Evento Corporativo"
    }
  ];

  // Noticias sobre aventuras de la cabina
  const newsItems = [
    {
      id: 1,
      title: "LA CABINA EN MARTE",
      date: "15 Oct 3025",
      excerpt: "Fuimos la primera cabina en registrar imágenes en gravedad marciana",
      content: (
        <>
          <p>La boda de los primeros humanos nacidos en Marte fue el escenario ideal para poner a prueba nuestra tecnología interplanetaria.</p>
          <div className="news-gallery">
            <img src="/img/06-img-galeria3/id19-c19.png" alt="Cabina en Marte" />
            <img src="/img/06-img-galeria3/id20-c20.png" alt="Boda marciana" />
          </div>
          <p>Las fotos incluyeron paisajes marcianos reales y trajes espaciales con filtros de partículas activadas por movimiento.</p>
          <p>CosmoCam demuestra que no hay límites para capturar recuerdos, incluso en otro planeta.</p>
        </>
      ),
      images: ["/img/06-img-galeria3/id19-c19.png", "/img/06-img-galeria3/id20-c20.png"],
      category: "Aventura Espacial"
    },
    {
      id: 2,
      title: "HACKEO CIBERNÉTICO",
      date: "1 Nov 3025",
      excerpt: "Activamos nuestro firewall cuántico ante un intento de hackeo en vivo",
      content: (
        <>
          <p>Durante el evento de lanzamiento de CosmoCam Ultra, activamos con éxito nuestro firewall cuántico ante un intento de hackeo en vivo.</p>
          <div className="news-gallery">
            <img src="/img/06-img-galeria3/id1-c1.png" alt="Sistema de seguridad" />
            <img src="/img/06-img-galeria3/id2-c2.png" alt="Interfaz defensiva" />
          </div>
          <p>El sistema de defensa no solo protegió los datos, sino que proyectó visuales defensivos en la interfaz de la cabina en tiempo real.</p>
          <p>El público vivió un show inesperado: una batalla entre hackers y defensas visuales, transformada en arte digital.</p>
        </>
      ),
      images: ["/img/06-img-galeria3/id1-c1.png", "/img/06-img-galeria3/id2-c2.png"],
      category: "Tecnología"
    },
    {
      id: 3,
      title: "MODO REALIDAD ALTERNATIVA",
      date: "20 Nov 3025",
      excerpt: "Lanzamos el Multiverso Fotográfico: una función exclusiva",
      content: (
        <>
          <p>Lanzamos el Multiverso Fotográfico: una función que permite ver tu imagen reflejada en 5 universos paralelos con estilos únicos.</p>
          <div className="news-gallery">
            <img src="/img/06-img-galeria3/id3-c3.png" alt="Realidad alternativa" />
          </div>
          <p>Desde una realidad steampunk hasta una versión anime, cada toma genera nuevas identidades visuales.</p>
          <p>Una función exclusiva de CosmoCam que mezcla IA, diseño generativo y emoción humana.</p>
        </>
      ),
      images: ["/img/06-img-galeria3/id3-c3.png"],
      category: "Innovación"
    }
  ];
 
  return (
    <div className={`novedades-container ${fullscreenMode ? 'fullscreen-mode' : ''}`}>
      {/* Sección de Revista */}
      <section className="tech-magazine">
        <h2>NOVEDADES COSMOCAM</h2>
        <p className="magazine-subtitle">EVENTOS DONDE NUESTRA CABINA HIZO HISTORIA</p>
        
        <div className="magazine-page">
          <div className="page-image-container">
            <div 
              className="page-image" 
              style={{ backgroundImage: `url(${magazinePages[currentPage].image})` }}
            >
              <div className="page-header">
                <h3>{magazinePages[currentPage].title}</h3>
                <span className="page-date">{magazinePages[currentPage].date}</span>
              </div>
            </div>
          </div>
          
          <div className="page-content">
            {magazinePages[currentPage].content}
            
            {magazinePages[currentPage].gallery && (
              <div className="page-gallery">
                <h4>GALERÍA HOLOGRÁFICA</h4>
                <div className="gallery-grid">
                  {magazinePages[currentPage].gallery.map((img, i) => (
                    <div key={i} className="gallery-item">
                      <img src={img} alt={`Galería ${i + 1}`} />
                      <div className="holographic-overlay"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="page-controls">
            <div className="page-indicator">
              ARCHIVO {currentPage + 1} / {magazinePages.length}
            </div>
            <div className="navigation-buttons">
              <button 
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="neon-button"
              >
                ← ANTERIOR
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(magazinePages.length - 1, p + 1))}
                disabled={currentPage === magazinePages.length - 1}
                className="neon-button"
              >
                SIGUIENTE →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Noticias */}
      <section className="news-section">
        <h2>ÚLTIMAS TRANSMISIONES</h2>
        <p className="news-subtitle">AVENTURAS DE LA CABINA FOTOGRÁFICA</p>
        
        <div className="news-list">
          {newsItems.map(news => (
            <div 
              key={news.id} 
              className={`news-card ${expandedNews === news.id ? 'expanded' : ''}`}
            >
              <div className="news-image">
                <img src={news.images[0]} alt={news.title} />
                <div className="scanner-effect"></div>
              </div>
              <div className="news-content">
                <span className="news-category">{news.category}</span>
                <h3>{news.title}</h3>
                <time>{news.date}</time>
                <p className="news-excerpt">{news.excerpt}</p>
                
                {expandedNews === news.id ? (
                  <div className="news-full-content">
                    {news.content}
                    <button 
                      className="news-toggle"
                      onClick={() => setExpandedNews(null)}
                    >
                      CERRAR TRANSMISIÓN
                    </button>
                  </div>
                ) : (
                  <button 
                    className="news-toggle"
                    onClick={() => setExpandedNews(news.id)}
                  >
                    ACTIVAR REPORTE COMPLETO
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Novedades;