import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Creación del contexto
const AuthContext = createContext();

/**
 * Proveedor de autenticación simplificado para la cabina fotográfica
 * Mantiene una estructura básica por si necesitas expandirlo en el futuro
 */
export function AuthProvider({ children }) {
  const [nivelAcceso, setNivelAcceso] = useState('publico');
  
  // Función de login básica (puedes expandirla si necesitas)
  const login = (nivel = 'publico') => {
    setNivelAcceso(nivel);
  };

  // Función de logout (mantiene consistencia)
  const logout = () => {
    setNivelAcceso('publico');
  };

  // Valor que se provee a los componentes hijos
  const value = {
    nivelAcceso,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personalizado para acceder al contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  
  return context;
}

/**
 * Componente PrivateRoute simplificado
 * En esta versión básica, no restringe el acceso
 * pero mantiene la estructura por si necesitas implementarlo después
 */
export function PrivateRoute({ children, requiredLevel = 'publico' }) {
  const { nivelAcceso } = useAuth();
  const navigate = useNavigate();

  // Efecto para redireccionar si el nivel de acceso no es suficiente
  useEffect(() => {
    if (nivelAcceso !== requiredLevel) {
      navigate("/", { replace: true });
    }
  }, [nivelAcceso, requiredLevel, navigate]);

  // Si no tiene el acceso requerido, no renderiza nada
  if (nivelAcceso !== requiredLevel) {
    return null;
  }

  // Si tiene acceso, renderiza los children
  return children;
}

/**
 * Versión alternativa SUPER simplificada si no necesitas ningún control de acceso:
export function PrivateRoute({ children }) {
  return children;
}
*/