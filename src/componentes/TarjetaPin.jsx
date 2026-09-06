import { useState } from 'react';
import { usarPines } from '../contexto/ContextoPines';

export const TarjetaPin = ({ pin }) => {
  const [sobrePin, setSobrePin] = useState(false);
  const { tableros, pinesPorTablero, guardarEnTablero, setPinSeleccionado } = usarPines();

  const [tableroDestino, setTableroDestino] = useState(tableros[0] || 'Favoritos');

  const estaGuardado = (pinesPorTablero[tableroDestino] || []).some(
    (item) => item.id === pin.id
  );

  const abrirModal = () => {
    setPinSeleccionado(pin);
  };

  return (
    <div
      className="pin-card-wrapper"
      onMouseEnter={() => setSobrePin(true)}
      onMouseLeave={() => setSobrePin(false)}
      style={{ cursor: 'pointer' }}
    >
      <div className="pin-card position-relative" onClick={abrirModal}>
        <img
          src={pin.urls?.regular || pin.urls?.small}
          alt={pin.alt_description || 'Pin'}
          loading="lazy"
          className="w-100 rounded-4"
        />

        {/* Overlay cuando se pasa el cursor */}
        {sobrePin && (
          <div 
            className="pin-overlay d-flex flex-column justify-content-between p-3 position-absolute top-0 start-0 w-100 h-100 rounded-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 1 }}
          >
            {/* Controles superiores (Dropdown + Botón Guardar) */}
            <div 
              className="d-flex justify-content-end gap-1"
              onClick={(e) => e.stopPropagation()} /* Detiene el clic para que no abra el modal al interactuar con el botón */
            >
              <select
                value={tableroDestino}
                onChange={(e) => setTableroDestino(e.target.value)}
                className="form-select form-select-sm rounded-pill border-0"
                style={{ fontSize: '12px', width: 'auto' }}
              >
                {tableros.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <button
                onClick={() => guardarEnTablero(pin, tableroDestino)}
                className={`btn btn-sm rounded-pill px-3 fw-bold ${
                  estaGuardado ? 'btn-dark' : 'btn-danger'
                }`}
              >
                {estaGuardado ? 'Guardado' : 'Guardar'}
              </button>
            </div>

            {/* Usuario autor abajo */}
            {pin.user && (
              <div className="d-flex align-items-center gap-2 text-white">
                <img 
                  src={pin.user.profile_image?.small} 
                  alt={pin.user.name} 
                  className="rounded-circle"
                  style={{ width: '24px', height: '24px' }}
                />
                <span className="text-truncate small fw-semibold" style={{ maxWidth: '120px' }}>
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