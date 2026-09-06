import { usarPines } from '../contexto/ContextoPines';

export const ModalPin = () => {
  const { pinSeleccionado, setPinSeleccionado, guardados, alternarGuardar } = usarPines();

  if (!pinSeleccionado) return null;

  const estaGuardado = guardados.some((item) => item.id === pinSeleccionado.id);

  return (
    <div
      onClick={() => setPinSeleccionado(null)}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
      >
        <div className="md:w-1/2 bg-black flex items-center justify-center">
          <img
            src={pinSeleccionado.urls?.regular}
            alt={pinSeleccionado.alt_description || 'Pin'}
            className="max-h-[80vh] w-auto object-contain"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => alternarGuardar(pinSeleccionado)}
                className={`px-6 py-3 font-semibold rounded-full text-sm transition-colors ${
                  estaGuardado ? 'bg-black text-white' : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {estaGuardado ? 'Guardado' : 'Guardar'}
              </button>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {pinSeleccionado.description || pinSeleccionado.alt_description || 'Sin título'}
            </h2>

            {pinSeleccionado.user && (
              <div className="flex items-center gap-3 my-6">
                <img
                  src={pinSeleccionado.user.profile_image?.medium}
                  alt={pinSeleccionado.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{pinSeleccionado.user.name}</p>
                  <p className="text-xs text-gray-500">@{pinSeleccionado.user.username}</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setPinSeleccionado(null)}
            className="self-end text-sm font-semibold text-gray-500 hover:text-black py-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};