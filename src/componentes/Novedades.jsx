import React, { useState } from "react";
import "../assets/scss/_03-Componentes/_Novedades.scss";

function Novedades({ fullscreenMode }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedNews, setExpandedNews] = useState(null);

  // Revista futurista con diferentes eventos
  const magazinePages = [
    {
      title: "TECHNO WEDDING 2025",
      date: "Noviembre 2025",
      image: "/img/06-img-galeria3/id12-c12.png",
      content: (
        <>
          <p>La boda estuvo hermosa y contatamos la CosmoCam, Versión: Nave 1.0, alias "Nave-Uno". CosmoCam fue un éxito: una cabina fotográfica capaz de capturar momentos únicos... ¡en modo Techno Fluor!</p>
          <blockquote>
            "Las fotos con efecto fluor y futurista fueron el hit de la fiesta! ¡Nadie había visto nada igual!"
            <cite>-CosmoCliente Conquistado</cite>
          </blockquote>
          <p>Gracias a su sistema tecnologico de avanzada y como nave espacial, la Foto Cabina Espacial CosmoCam aterrizó en varios eventos para conquistar el corazon de varios clientes con  sesiones fotográficas en la Tierra. Una experiencia visual que transformó el evento en leyenda.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id10-c10.png", "/img/06-img-galeria3/id11-c11.png", "/img/06-img-galeria3/id13-c13.png"],
      category: "Boda Espacial"
    },
    {
      title: "FIESTA DE 15 CON COSMO-CAM GALÁCTICA",
      date: "Marzo 2025",
      image: "/img/06-img-galeria3/id8-c8.png",
      content: (
        <>
          <h4>Celebración Extraordinaria</h4>
          <p>CosmoCliente Conquistado celebró sus 15 años en una fiesta temática, donde CosmoCam deslumbró a los invitados con la CosmoCam, Versión: Nave 2.0, alias "Nave-Dois" con efectos espaciales galácticos personalizados.</p>
          
          <h4>Visuales Interactivas</h4>
          <p>La Cabina tiene fondos animados Fluor que permite al usuario en tiempo real, interactuar con la escena de la fotografia. Lo que genera que cada foto fue una obra de ciencia ficción completamente original e interplanetaria.</p>
          
          <h4>Fotos Profesionales Inmersivas</h4>
          <p>Con tecnología fotografica de avanzada, CosmoCam capturó tambien video, movimiento, sonido y emoción, dejando un recuerdo sensorial completo e inolvidable.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id1-c1.png", "/img/06-img-galeria3/id2-c2.png", "/img/06-img-galeria3/id3-c3.png"],
      category: "Fiesta de 15"
    },
    {
      title: "DIVORCIO CIBERNÉTICO",
      date: "Junio 2025",
      image: "/img/06-img-galeria3/id4-c4.png",
      content: (
        <>
          <p>Una nueva tendencia: fiestas de divorcio temáticas. Y CosmoCam estuvo allí para convertir una nueva estapa de la vida, en una experiencia divertida y sorprendente.</p>
          
          <div className="planning-details">
            <div className="detail-item">
              <h5>Tematica ORBITAL</h5>
              <p>"Free Again 5.0"</p>
            </div>
            <div className="detail-item">
              <h5>Efectos liberadores</h5>
              <p>Musica a gusto para liberarse</p>
            </div>
            <div className="detail-item">
              <h5>Fotos</h5>
              <p>Estilo cyberpunk con máscaras y fondos interactivos</p>
            </div>
          </div>
          
          <p>"Quería algo que marcara un nuevo comienzo con humor y estilo", dijeron los protagonistas mientras posaban entre neones y humo en nuestra cabina CosmoCam.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id5-c5.png", "/img/06-img-galeria3/id6-c6.png", "/img/06-img-galeria3/id7-c7.png"],
      category: "Divorcio"
    },
    {
      title: "FESTIVAL NEON dreams",
      date: "Agosto 2025",
      image: "/img/06-img-galeria3/id5-c5.png",
      content: (
        <>
          <p>En el festival Neon Dreams, CosmoCam fue más que una cabina: fue una instalación artística interactiva.</p>
          <blockquote>
            "Las fotos con efectos de fluorescencia y seguimiento de movimiento fueron lo más compartido en redes sociales"
            <cite>- DJ - CosmoCliente Conquistado</cite>
          </blockquote>
          <p>Gracias al reconocimiento de baile en vivo, cada foto respondía a los movimientos del cuerpo, creando visuales psicodélicos únicos para cada asistente.</p>
        </>
      ),
      gallery: ["/img/06-img-galeria3/id14-c14.png", "/img/06-img-galeria3/id15-c15.png"],
      category: "Festival"
    },
    {
      title: "EVENTO CORPORATIVO",
      date: "Septiembre 2025",
      image: "/img/06-img-galeria3/id16-c16.png",
      content: (
        <>
          <p>En la convención anual de Gamers EnterPrise Inc., CosmoCam se integró perfectamente al espíritu tech del evento.</p>
          
          <div className="ring-specs">
            <div>
              <h5>Tecnología interactiva Futurista</h5>
              <p>Fotografía con avatares digitales personalizados</p>
            </div>
            <div>
              <h5>Efectos Espaciales</h5>
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
      title: "LA CABINA INTERACTIVA KINECT",
      date: "15 Oct 2025",
      excerpt: "Fuimos la primera cabina en combinar y registrar imágenes con mapping interactivo",
      content: (
        <>
          <p>La boda de los primeros CosmoClientes Conquistados fue el escenario ideal para poner a prueba nuestra tecnología interplanetaria.</p>
          <div className="news-gallery">
            <img src="/img/06-img-galeria3/id19-c19.png" alt="Cabina en Marte" />
            <img src="/img/06-img-galeria3/id20-c20.png" alt="Boda marciana" />
          </div>
          <p>Las fotos incluyeron paisajes Espaciales reales y fondos interactivos activadas por movimiento.</p>
          <p>CosmoCam demuestra que no hay límites para capturar recuerdos, son recuerdos de otro planeta.</p>
        </>
      ),
      images: ["/img/06-img-galeria3/id19-c19.png", "/img/06-img-galeria3/id20-c20.png"],
      category: "Aventura Espacial"
    },
    {
      id: 2,
      title: "AVENTURA MAPPING CIBERNÉTICA",
      date: "1 Nov 2025",
      excerpt: "Activamos nuestro sistema cuántico de captura de tus recuerdos interespaciales, ante un viaje intergalactivo en vivo",
      content: (
        <>
          <p>Durante el evento de lanzamiento de CosmoCam, activamos con ultra éxito nuestro sistema de interacción en vivo con el mapping de la cabina.</p>
          <div className="news-gallery">
            <img src="/img/06-img-galeria3/id1-c1.png" alt="Sistema de seguridad" />
            <img src="/img/06-img-galeria3/id2-c2.png" alt="Interfaz defensiva" />
          </div>
          <p>La cabina se convirtio en un viaje lleno de visuales Fluor y super flasheras en la interfaz de la cabina en tiempo real.</p>
          <p>El público vivió un show inesperado: una batalla naves espaciales en el ambiente adaptado de la cabina CosmoCam.</p>
        </>
      ),
      images: ["/img/06-img-galeria3/id1-c1.png", "/img/06-img-galeria3/id2-c2.png"],
      category: "Tecnología"
    },
    {
      id: 3,
      title: "MODO ESPEJOS 360",
      date: "20 Nov 2025",
      excerpt: "Lanzamos la Plataforma 360 con un sistema de Espejado Fotográfico: una función exclusiva",
      content: (
        <>
          <p>Lanzamos el Multiverso Fotográfico: una función que permite ver tu imagen reflejada en 5 espejos de camaras paralelass con estilos únicos.</p>
          <div className="news-gallery">
            <img src="/img/06-img-galeria3/id3-c3.png" alt="Realidad alternativa" />
          </div>
          <p>Desde una realidad steampunk hasta una versión futurista, cada toma genera nuevas posiciones visuales.</p>
          <p>Una función exclusiva de CosmoCam que mezcla ingenio, diseño  y en viaje audiovisual interactivo.</p>
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
        <p className="magazine-subtitle">EVENTOS DE COSMOCLIENTES CONQUISTADOS FELICES</p>
        
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
                <h4>GALERÍA COSMOCAM</h4>
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
                ← VIAJAR ATRÁS
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(magazinePages.length - 1, p + 1))}
                disabled={currentPage === magazinePages.length - 1}
                className="neon-button"
              >
                VIAJAR ADELANTE →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Noticias */}
      <section className="news-section">
        <h2>ÚLTIMOS VIAJES ESPACIALES</h2>
        <p className="news-subtitle">AVENTURAS DE LA COSMOCAM - CABINA FOTOGRÁFICA INTERPLANETARIA</p>
        
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
                    VER MAS DEL REPORTE
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