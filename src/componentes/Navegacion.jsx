import { useState } from 'react';
import { usarPines } from '../contexto/ContextoPines';
import logo from '../assets/logo.png';

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
        {/* Logotipo de imagen y botón Inicio */}
        <div 
          className="d-flex align-items-center gap-2 cursor-pointer" 
          style={{ cursor: 'pointer' }}
          onClick={() => seleccionarSeccion({ id: 'inicio', nombre: 'Inicio' })}
        >
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
          />
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