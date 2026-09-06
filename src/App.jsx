import { useState, useEffect } from 'react';
import { ProveedorPines, usarPines } from './contexto/ContextoPines';
import { Navegacion } from './componentes/Navegacion';
import { MallaPines } from './componentes/MallaPines';
import { TarjetaPin } from './componentes/TarjetaPin';
import { obtenerPines } from './servicios/api';

const ContenidoPrincipal = () => {
  const { pinSeleccionado, setPinSeleccionado } = usarPines();
  const [relacionados, setRelacionados] = useState([]);
  const [cargandoRelacionados, setCargandoRelacionados] = useState(false);

  // Buscar imágenes parecidas cuando cambie el pin seleccionado
  useEffect(() => {
    if (!pinSeleccionado) {
      setRelacionados([]);
      return;
    }

    const cargarRelacionados = async () => {
      setCargandoRelacionados(true);
      // Toma la primera palabra clave o categoría de la descripción del Pin
      const tag = pinSeleccionado.alt_description?.split(' ')[0] || 'popular';
      const resultados = await obtenerPines(1, tag);
      
      // Filtra para que no vuelva a aparecer la misma imagen
      setRelacionados(resultados.filter((p) => p.id !== pinSeleccionado.id));
      setCargandoRelacionados(false);
    };

    cargarRelacionados();
  }, [pinSeleccionado]);

  return (
    <div>
      <Navegacion />
      <main>
        <MallaPines />
      </main>

      {/* Modal de Detalle con Galería de Imágenes Parecidas */}
      {pinSeleccionado && (
        <div className="modal-overlay" onClick={() => setPinSeleccionado(null)}>
          <div 
            className="modal-contenido" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón X para cerrar el modal */}
            <button 
              className="modal-close-btn" 
              onClick={() => setPinSeleccionado(null)}
              aria-label="Cerrar modal"
            >
              &times;
            </button>

            {/* Vista Principal de la Imagen */}
            <div className="modal-imagen">
              <img
                src={pinSeleccionado.urls?.regular}
                alt={pinSeleccionado.alt_description || 'Pin'}
              />
            </div>

            <div className="modal-info">
              <div>
                <h2>{pinSeleccionado.description || 'Sin título'}</h2>
                <p style={{ color: '#666', marginTop: '8px' }}>
                  {pinSeleccionado.alt_description}
                </p>

                {pinSeleccionado.user && (
                  <div className="d-flex align-items-center gap-2 mt-3 mb-4">
                    <img
                      src={pinSeleccionado.user.profile_image?.medium}
                      alt={pinSeleccionado.user.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <div>
                      <strong>{pinSeleccionado.user.name}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Sección de Imágenes Parecidas */}
              <div className="mt-4 border-top pt-3">
                <h5 className="fw-bold mb-3">Más parecidos a esto</h5>
                
                {cargandoRelacionados ? (
                  <p className="text-muted">Cargando sugerencias...</p>
                ) : (
                  <div className="row g-2">
                    {relacionados.slice(0, 6).map((pinRel) => (
                      <div key={pinRel.id} className="col-4">
                        <TarjetaPin pin={pinRel} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ProveedorPines>
      <ContenidoPrincipal />
    </ProveedorPines>
  );
}