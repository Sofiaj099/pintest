import { useState } from 'react';
import { usarPines } from '../contexto/ContextoPines';

export const TarjetaPin = ({ pin }) => {
  const [sobrePin, setSobrePin] = useState(false);
  const { guardados, alternarGuardar, setPinSeleccionado } = usarPines();
  const estaGuardado = guardados.some((item) => item.id === pin.id);

  return (
    <div
      className="pin-card-wrapper"
      onClick={() => setPinSeleccionado(pin)}
      onMouseEnter={() => setSobrePin(true)}
      onMouseLeave={() => setSobrePin(false)}
    >
      <div className="pin-card">
        <img
          src={pin.urls?.regular || pin.urls?.small}
          alt={pin.alt_description || 'Pin'}
          loading="lazy"
        />

        {sobrePin && (
          <div className="pin-overlay">
            <div className="d-flex justify-content-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alternarGuardar(pin);
                }}
                className={`btn-save ${estaGuardado ? 'saved' : ''}`}
              >
                {estaGuardado ? 'Guardado' : 'Guardar'}
              </button>
            </div>

            {pin.user && (
              <div className="user-badge">
                <img src={pin.user.profile_image?.small} alt={pin.user.name} />
                <span className="text-truncate" style={{ maxWidth: '120px' }}>
                  {pin.user.name}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};