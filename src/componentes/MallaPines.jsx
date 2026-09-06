import { useEffect, useRef } from 'react';
import { TarjetaPin } from './TarjetaPin';
import { usarPines } from '../contexto/ContextoPines';

export const MallaPines = () => {
  const { pines, cargando, cargarMasPines, seccionActiva } = usarPines();
  const observadorRef = useRef(null);

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
      {pines.length === 0 && !cargando ? (
        <div className="text-center py-5 text-muted">
          {seccionActiva === 'guardados'
            ? 'No tienes pines guardados en esta sección.'
            : 'No se encontraron contenidos.'}
        </div>
      ) : (
        /* Criterio: Implementación del Bootstrap Grid System */
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