import { useState } from 'react';
import { usarPines } from '../contexto/ContextoPines';

export const Navegacion = () => {
  const { setBusqueda, seccionActiva, setSeccionActiva } = usarPines();
  const [texto, setTexto] = useState('');

  const secciones = [
    { id: 'inicio', nombre: 'Inicio' },
    { id: 'guardados', nombre: 'Guardados' },
    { id: 'arte', nombre: 'Arte' },
    { id: 'fotografia', nombre: 'Fotografía' },
    { id: 'tecnologia', nombre: 'Tecnología' },
    { id: 'arquitectura', nombre: 'Arquitectura' },
    { id: 'moda', nombre: 'Moda' },
    { id: 'naturaleza', nombre: 'Naturaleza' },
    { id: 'ilustracion', nombre: 'Ilustración' },
    { id: 'diseno', nombre: 'Diseño Web' }
  ];

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (texto.trim()) {
      setSeccionActiva('inicio');
      setBusqueda(texto.trim());
    }
  };

  const seleccionarSeccion = (sec) => {
    setSeccionActiva(sec.id);
    if (sec.id === 'inicio') {
      setBusqueda('');
      setTexto('');
    } else if (sec.id !== 'guardados') {
      setBusqueda(sec.nombre);
    }
  };

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      <div className="d-flex align-items-center gap-3 px-4 py-2">
        {/* Logotipo SVG y botón Inicio */}
        <div 
          className="d-flex align-items-center gap-2 cursor-pointer" 
          style={{ cursor: 'pointer' }}
          onClick={() => seleccionarSeccion({ id: 'inicio', nombre: 'Inicio' })}
        >
          <svg className="brand-logo-svg" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
          <span className="fw-bold text-danger fs-5 d-none d-md-inline">Pinterest</span>
        </div>

        {/* Input de Búsqueda */}
        <form onSubmit={manejarSubmit} className="flex-grow-1">
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Buscar pines..."
            className="form-control rounded-pill bg-light border-0 px-3 py-2"
          />
        </form>
      </div>

      {/* 10 Secciones */}
      <div className="nav-categories px-3 pb-2">
        {secciones.map((sec) => (
          <button
            key={sec.id}
            onClick={() => seleccionarSeccion(sec)}
            className={`category-btn ${seccionActiva === sec.id ? 'active' : ''}`}
          >
            {sec.nombre}
          </button>
        ))}
      </div>
    </header>
  );
};