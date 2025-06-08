import React, { useState, useRef, useEffect } from "react";
import "../assets/scss/_03-Componentes/_QrSocialPost.scss";
import { Heart, ChevronLeft, ChevronRight, X, Upload, Camera } from "react-feather";

function QrSocialPost() {
  // Estados principales
  const [posts, setPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem('cabinaSocialPosts');
      return savedPosts ? JSON.parse(savedPosts) : [];
    } catch (error) {
      console.error("Error al leer del localStorage:", error);
      return [];
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentMedia, setCurrentMedia] = useState([]);
  const [authorInfo, setAuthorInfo] = useState({ name: '', message: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef(null);
  
  // URL para el QR
  const qrUrl = `${window.location.origin}/subir-foto`;

  // Persistir posts en localStorage
  useEffect(() => {
    try {
      const postsToSave = posts.slice(0, 50);
      localStorage.setItem('cabinaSocialPosts', JSON.stringify(postsToSave));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  }, [posts]);

  // Manejar cambios en el formulario de autor
  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setAuthorInfo(prev => ({ ...prev, [name]: value }));
  };

  // Manejar subida de archivos
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (files.length > 5) {
      alert('Máximo 5 archivos a la vez');
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.match('image.*|video.*')) {
        alert('Solo se permiten imágenes y videos');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Los archivos deben ser menores a 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setCurrentMedia(validFiles);
    setShowForm(true);
  };

  // Procesar la publicación
  const processUpload = () => {
    if (currentMedia.length === 0) return;
    
    setIsLoading(true);
    const newPost = {
      id: Date.now(),
      media: [],
      timestamp: new Date().toISOString(),
      author: authorInfo.name || 'Anónimo',
      message: authorInfo.message,
      likes: 0
    };
    
    let processedCount = 0;
    
    currentMedia.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPost.media.push({
          url: e.target.result,
          type: file.type.match('video.*') ? 'video' : 'image'
        });
        
        processedCount++;
        
        if (processedCount === currentMedia.length) {
          setPosts(prev => [newPost, ...prev.slice(0, 49)]);
          setIsLoading(false);
          setShowForm(false);
          setCurrentMedia([]);
          setAuthorInfo({ name: '', message: '' });
        }
      };
      
      reader.onerror = () => {
        alert('Error al procesar el archivo');
        setIsLoading(false);
      };
      
      reader.readAsDataURL(file);
    });
  };

  // Dar like a una publicación
  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    ));
  };

  // Abrir modal de publicación
  const openPostModal = (post) => {
    if (!post?.media?.length) return;
    
    setSelectedPost(post);
    setCurrentImageIndex(0);
  };

  // Navegar entre imágenes en el modal
  const navigateImage = (direction) => {
    setCurrentImageIndex(prev => {
      if (!selectedPost?.media) return 0;
      
      if (direction === 'prev') {
        return prev === 0 ? selectedPost.media.length - 1 : prev - 1;
      } else {
        return prev === selectedPost.media.length - 1 ? 0 : prev + 1;
      }
    });
  };

  // Renderizar publicaciones de la galería
  const renderGalleryPosts = () => {
    if (!posts || posts.length === 0) {
      return (
        <div className="empty-gallery">
          <div className="empty-icon">
            <Camera size={48} />
          </div>
          <p>NO HAY PUBLICACIONES AÚN</p>
          <p>SÉ EL PRIMERO EN COMPARTIR</p>
        </div>
      );
    }

    return posts.map(post => {
      if (!post?.media?.[0]?.url) return null;
      
      return (
        <div key={post.id} className="gallery-item" onClick={() => openPostModal(post)}>
          {post.media[0].type === 'video' ? (
            <div className="media-container">
              <video className="post-thumbnail">
                <source src={post.media[0].url} type="video/mp4" />
              </video>
              <div className="play-icon">▶</div>
            </div>
          ) : (
            <img 
              src={post.media[0].url} 
              alt="Post" 
              className="post-thumbnail" 
              onError={(e) => e.target.src = 'placeholder-image.jpg'}
            />
          )}
          
          {post.media.length > 1 && (
            <div className="multi-media-indicator">
              +{post.media.length}
            </div>
          )}
          
          <div className="post-overlay">
            <div className="like-count">
              <Heart size={16} fill={post.likes > 0 ? 'currentColor' : 'none'} />
              <span>{post.likes || 0}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  // Renderizar contenido del modal
  const renderModalContent = () => {
    if (!selectedPost?.media?.[currentImageIndex]?.url) return null;

    return (
      <>
        {selectedPost.media[currentImageIndex].type === 'video' ? (
          <video controls autoPlay className="modal-media">
            <source src={selectedPost.media[currentImageIndex].url} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={selectedPost.media[currentImageIndex].url} 
            alt="Post" 
            className="modal-media" 
          />
        )}
        
        {selectedPost.media.length > 1 && (
          <>
            <button 
              className="nav-button prev"
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="nav-button next"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight size={24} />
            </button>
            <div className="media-counter">
              {currentImageIndex + 1} / {selectedPost.media.length}
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="qr-social-container">
      <div className="section-header">
        <h2>QR SOCIAL POST</h2>
        <p>COMPARTE TUS MOMENTOS EN LA CABINA</p>
      </div>
      
      <div className="qr-upload-section">
        <div className="qr-box">
          <div className="qr-header">
            <h3>ESCANEA EL CÓDIGO</h3>
            <div className="qr-decoration"></div>
          </div>
          <div className="qr-code">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}`} 
              alt="QR Code"
              width="150"
              height="150"
            />
            <p>USA TU CÁMARA PARA ESCANEAR</p>
          </div>
        </div>
        
        <div className="upload-box">
          <div className="upload-header">
            <h3>SUBIR CONTENIDO</h3>
            <div className="upload-decoration"></div>
          </div>
          <button 
            className="upload-btn"
            onClick={() => fileInputRef.current.click()}
            disabled={isLoading}
          >
            <Upload size={18} className="upload-icon" />
            <span>{isLoading ? 'SUBIR...' : 'SELECCIONAR'}</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
          />
          <p className="upload-note">MÁXIMO 5 ARCHIVOS</p>
        </div>
      </div>
      
      {/* Formulario para información del autor */}
      {showForm && (
        <div className="author-form-overlay">
          <div className="author-form-container">
            <div className="form-header">
              <h3>COMPARTE TU MOMENTO</h3>
              <div className="form-decoration"></div>
            </div>
            <div className="form-group">
              <label htmlFor="author-name">TU NOMBRE (OPCIONAL)</label>
              <input
                type="text"
                id="author-name"
                name="name"
                value={authorInfo.name}
                onChange={handleAuthorChange}
                placeholder="¿CÓMO TE LLAMAS?"
                maxLength="30"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author-message">MENSAJE (OPCIONAL)</label>
              <textarea
                id="author-message"
                name="message"
                value={authorInfo.message}
                onChange={handleAuthorChange}
                placeholder="ESCRIBE UN MENSAJE BREVE..."
                maxLength="120"
                rows="3"
              />
              <div className="char-counter">{authorInfo.message.length}/120</div>
            </div>
            <div className="preview-media">
              {currentMedia.map((file, index) => (
                <div key={index} className="media-thumbnail">
                  {file.type.match('video.*') ? (
                    <video controls>
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  ) : (
                    <img src={URL.createObjectURL(file)} alt="Preview" />
                  )}
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                CANCELAR
              </button>
              <button className="submit-btn" onClick={processUpload} disabled={isLoading}>
                {isLoading ? 'PUBLICANDO...' : 'COMPARTIR'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Galería compacta de publicaciones */}
      <div className="gallery-grid">
        {renderGalleryPosts()}
      </div>
      
      {/* Modal de publicación expandida */}
      {selectedPost && (
        <div className="post-modal-overlay">
          <div className="post-modal-container">
            <button className="close-modal" onClick={() => setSelectedPost(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-media-container">
              {renderModalContent()}
            </div>
            
            <div className="modal-post-info">
              <div className="author-info">
                <div className="author-avatar">
                  {selectedPost.author?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div>
                  <div className="author-name">{selectedPost.author || 'ANÓNIMO'}</div>
                  <div className="post-time">
                    {new Date(selectedPost.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {selectedPost.message && (
                <div className="post-message">
                  <p>{selectedPost.message}</p>
                </div>
              )}
              
              <div className="post-actions">
                <button 
                  className="like-btn"
                  onClick={() => {
                    handleLike(selectedPost.id);
                    setSelectedPost(prev => ({
                      ...prev,
                      likes: (prev.likes || 0) + 1
                    }));
                  }}
                >
                  <Heart size={20} fill={selectedPost.likes > 0 ? 'currentColor' : 'none'} />
                  <span>{selectedPost.likes || 0}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QrSocialPost;