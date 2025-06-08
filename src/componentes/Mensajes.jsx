import React, { useState, useEffect, useRef } from "react";
import "../assets/scss/_03-Componentes/_Mensajes.scss";
import { Heart, ChevronLeft, ChevronRight, X, Edit3, Trash2, Send, MessageSquare } from "react-feather";

function Mensajes() {
  // Estados principales
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const messagesPerPage = 8;
  const autoPlayInterval = useRef(null);

  // Colores neón con transparencia
  const noteColors = [
    'rgba(0, 240, 255, 0.1)', 'rgba(100, 65, 255, 0.1)', 'rgba(255, 0, 255, 0.1)',
    'rgba(0, 255, 200, 0.1)', 'rgba(255, 100, 0, 0.1)', 'rgba(0, 200, 255, 0.1)',
    'rgba(200, 0, 255, 0.1)', 'rgba(255, 200, 0, 0.1)', 'rgba(0, 255, 100, 0.1)',
    'rgba(255, 0, 100, 0.1)'
  ];

  // Efecto para el auto-play
  useEffect(() => {
    if (autoPlay && messages.length > messagesPerPage) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentPage(prev => (prev + 1) % Math.ceil(messages.length / messagesPerPage));
      }, 5000);
    }
    return () => clearInterval(autoPlayInterval.current);
  }, [autoPlay, messages.length]);

  // Cargar mensajes iniciales
  useEffect(() => {
    const savedMessages = localStorage.getItem("cabinaMessages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Error parsing messages:", error);
      }
    }
  }, []);

  // Guardar mensajes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length > 0) {
        localStorage.setItem("cabinaMessages", JSON.stringify(messages));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !author.trim()) return;

    setIsSending(true);
    
    setTimeout(() => {
      const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
      const borderColor = randomColor.replace('0.1)', '0.5)');
      
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        author: author,
        date: new Date().toLocaleDateString("es-AR", {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        color: randomColor,
        borderColor: borderColor,
        createdAt: new Date().getTime()
      };

      setMessages(prev => [newMsg, ...prev].slice(0, 50));
      setNewMessage("");
      setAuthor("");
      setIsSending(false);
      setShowForm(false);
      setCurrentPage(0);
    }, 500);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (currentPage >= Math.ceil((messages.length - 1) / messagesPerPage)) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  const handleEdit = (message) => {
    setNewMessage(message.text);
    setAuthor(message.author);
    setEditMode(true);
    setShowForm(true);
    handleDelete(message.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedMessages = () => {
    const startIndex = currentPage * messagesPerPage;
    return messages.slice(startIndex, startIndex + messagesPerPage);
  };

  const totalPages = Math.ceil(messages.length / messagesPerPage);

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2>MENSAJES DIGITALES</h2>
        <p>DEJA TU MENSAJE NEÓN EN LA CABINA</p>
      </div>
      
      {showForm ? (
        <form className="message-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>{editMode ? 'EDITAR MENSAJE' : 'NUEVO MENSAJE'}</h3>
            <button 
              type="button" 
              className="close-form"
              onClick={() => {
                setShowForm(false);
                setEditMode(false);
              }}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="form-group">
            <label htmlFor="author">TU NOMBRE*</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              maxLength={30}
              placeholder="EJ: MARÍA Y JUAN"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">TU MENSAJE*</label>
            <textarea
              id="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
              maxLength={200}
              rows={4}
              placeholder="ESCRIBE TU MENSAJE EN ESTILO NEÓN..."
            />
            <div className="char-counter">{newMessage.length}/200</div>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSending}
          >
            {isSending ? (
              <span className="loading">ENVIANDO...</span>
            ) : (
              <>
                {editMode ? 'ACTUALIZAR' : 'PUBLICAR'}
                <Send size={18} className="send-icon" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="add-message-container">
          <button 
            className="add-message-btn"
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
            }}
          >
            <MessageSquare size={18} />
            <span>ESCRIBIR MENSAJE</span>
          </button>
        </div>
      )}
      
      <div className="messages-controls">
        <button 
          className={`control-btn ${currentPage === 0 ? 'disabled' : ''}`}
          onClick={() => {
            setCurrentPage(prev => Math.max(0, prev - 1));
            setAutoPlay(false);
          }}
          disabled={currentPage === 0}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="page-indicator">
          {currentPage + 1} / {totalPages || 1}
        </div>
        
        <button 
          className={`control-btn ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}
          onClick={() => {
            setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
            setAutoPlay(false);
          }}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="messages-grid">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <MessageSquare size={48} />
            </div>
            <p>NO HAY MENSAJES AÚN</p>
            <p>SÉ EL PRIMERO EN DEJAR UN MENSAJE</p>
          </div>
        ) : (
          <div className="messages-grid-inner">
            {paginatedMessages().map((message) => (
              <div 
                key={message.id}
                className="message-card"
                style={{ 
                  backgroundColor: message.color,
                  border: `1px solid ${message.borderColor}`,
                  boxShadow: `0 0 15px ${message.borderColor}`
                }}
              >
                <div className="card-content">
                  <p className="card-text">{message.text}</p>
                  <div className="card-footer">
                    <span className="card-author">- {message.author.toUpperCase()}</span>
                    <span className="card-date">{message.date}</span>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(message)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="messages-footer">
        <label className="auto-play-toggle">
          <input 
            type="checkbox" 
            checked={autoPlay} 
            onChange={(e) => setAutoPlay(e.target.checked)} 
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">AUTO-PLAY</span>
        </label>
      </div>
    </div>
  );
}

export default Mensajes;