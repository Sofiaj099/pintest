import { useEffect, useRef, useState } from 'react';
import { TarjetaPin } from './TarjetaPin';
import { usarPines } from '../contexto/ContextoPines';

export const MallaPines = () => {
  const {
    pines,
    cargando,
    cargarMasPines,
    seccionActiva,
    tableros,
    tableroSeleccionado,
    setTableroSeleccionado,
    crearTablero,
  } = usarPines();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const observadorRef = useRef(null);

  const manejarCrearTablero = (e) => {
    e.preventDefault();
    if (nuevoNombre.trim()) {
      crearTablero(nuevoNombre.trim());
      setTableroSeleccionado(nuevoNombre.trim());
      setNuevoNombre('');
      setMostrarForm(false);
    }
  };

  useEffect(() => {
    if (seccionActiva === 'guardados') return;

    const observador = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !cargando) {
          cargarMasPines();
        }
      },
      { threshold: 0.5 }
    );

    if (observadorRef.current) observador.observe(observadorRef.current);
    return () => observador.disconnect();
  }, [cargando, seccionActiva]);

  return (
    <div className="container-fluid px-4 py-3">
      {/* Gestión de Tableros dentro de Guardados */}
      {seccionActiva === 'guardados' && (
        <div className="mb-4 text-center">
          <h4 className="fw-bold mb-3">Tus Tableros</h4>

          <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap mb-3">
            {tableros.map((t) => (
              <button
                key={t}
                onClick={() => setTableroSeleccionado(t)}
                className={`btn btn-sm rounded-pill px-3 ${
                  tableroSeleccionado === t ? 'btn-dark' : 'btn-outline-secondary'
                }`}
              >
                {t}
              </button>
            ))}

            {!mostrarForm ? (
              <button
                onClick={() => setMostrarForm(true)}
                className="btn btn-danger btn-sm rounded-pill px-3 fw-bold"
              >
                + Crear tablero
              </button>
            ) : null}
          </div>

          {/* Formulario para crear tablero en la vista Guardados */}
          {mostrarForm && (
            <form
              onSubmit={manejarCrearTablero}
              className="d-flex justify-content-center gap-2 align-items-center mx-auto"
              style={{ maxWidth: '320px' }}
            >
              <input
                type="text"
                placeholder="Nombre del nuevo tablero..."
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="form-control form-control-sm rounded-pill px-3"
                autoFocus
              />
              <button type="submit" className="btn btn-dark btn-sm rounded-pill px-3">
                Crear
              </button>
              <button
                type="button"
                onClick={() => setMostrarForm(false)}
                className="btn btn-light btn-sm rounded-pill px-2"
              >
                ✕
              </button>
            </form>
          )}
        </div>
      )}

      {pines.length === 0 && !cargando ? (
        <div className="text-center py-5 text-muted">
          {seccionActiva === 'guardados'
            ? `No tienes pines guardados en el tablero "${tableroSeleccionado}".`
            : 'No se encontraron contenidos.'}
        </div>
      ) : (
        <div className="row g-3">
          {pines.map((pin, indice) => (
            <div key={`${pin.id}-${indice}`} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <TarjetaPin pin={pin} />
            </div>
          ))}
        </div>
      )}

      {seccionActiva !== 'guardados' && (
        <div ref={observadorRef} className="d-flex justify-content-center my-4">
          {cargando && <div className="spinner-border text-danger" role="status"></div>}
        </div>
      )}
    </div>
  );
};