import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerPines } from '../servicios/api';

const ContextoPines = createContext();

export const ProveedorPines = ({ children }) => {
  const [pines, setPines] = useState([]);
  const [guardados, setGuardados] = useState(() => {
    const local = localStorage.getItem('pines_guardados');
    return local ? JSON.parse(local) : [];
  });
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [pinSeleccionado, setPinSeleccionado] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState('inicio');

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('pines_guardados', JSON.stringify(guardados));
  }, [guardados]);

  // Cargar más pines (para Infinite Scroll)
  const cargarMasPines = async () => {
    if (cargando || seccionActiva === 'guardados') return;
    setCargando(true);

    const terminoBusqueda = seccionActiva === 'inicio' ? busqueda : (busqueda || seccionActiva);
    const nuevosPines = await obtenerPines(pagina, terminoBusqueda);

    setPines((prev) => [...prev, ...nuevosPines]);
    setPagina((prev) => prev + 1);
    setCargando(false);
  };

  // Cargar desde cero al cambiar de sección o término de búsqueda
  useEffect(() => {
    if (seccionActiva === 'guardados') return;

    const cargarInicial = async () => {
      setCargando(true);
      setPagina(1);
      
      const terminoBusqueda = seccionActiva === 'inicio' ? busqueda : (busqueda || seccionActiva);
      const datos = await obtenerPines(1, terminoBusqueda);
      
      setPines(datos);
      setPagina(2);
      setCargando(false);
    };

    cargarInicial();
  }, [busqueda, seccionActiva]);

  const alternarGuardar = (pin) => {
    setGuardados((prev) => {
      const existe = prev.some((item) => item.id === pin.id);
      return existe ? prev.filter((item) => item.id !== pin.id) : [...prev, pin];
    });
  };

  return (
    <ContextoPines.Provider
      value={{
        pines: seccionActiva === 'guardados' ? guardados : pines,
        guardados,
        cargando,
        cargarMasPines,
        alternarGuardar,
        busqueda,
        setBusqueda,
        pinSeleccionado,
        setPinSeleccionado,
        seccionActiva,
        setSeccionActiva,
      }}
    >
      {children}
    </ContextoPines.Provider>
  );
};

export const usarPines = () => useContext(ContextoPines);