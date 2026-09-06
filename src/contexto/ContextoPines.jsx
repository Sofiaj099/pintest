import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerPines } from '../servicios/api';

const ContextoPines = createContext();

export const ProveedorPines = ({ children }) => {
  const [pines, setPines] = useState([]);
  // Tableros por defecto
  const [tableros, setTableros] = useState(() => {
    const local = localStorage.getItem('pines_tableros');
    return local ? JSON.parse(local) : ['Favoritos', 'Ideas'];
  });
  // Objeto donde la clave es el nombre del tablero y el valor es un array de pines
  const [pinesPorTablero, setPinesPorTablero] = useState(() => {
    const local = localStorage.getItem('pines_por_tablero');
    return local ? JSON.parse(local) : { Favoritos: [], Ideas: [] };
  });

  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [pinSeleccionado, setPinSeleccionado] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [tableroSeleccionado, setTableroSeleccionado] = useState('Favoritos');

  useEffect(() => {
    localStorage.setItem('pines_tableros', JSON.stringify(tableros));
    localStorage.setItem('pines_por_tablero', JSON.stringify(pinesPorTablero));
  }, [tableros, pinesPorTablero]);

  const crearTablero = (nombreTablero) => {
    const nombreLimpio = nombreTablero.trim();
    if (nombreLimpio && !tableros.includes(nombreLimpio)) {
      setTableros([...tableros, nombreLimpio]);
      setPinesPorTablero({ ...pinesPorTablero, [nombreLimpio]: [] });
    }
  };

  const guardarEnTablero = (pin, nombreTablero) => {
    setPinesPorTablero((prev) => {
      const listaActual = prev[nombreTablero] || [];
      const existe = listaActual.some((item) => item.id === pin.id);
      
      const nuevaLista = existe
        ? listaActual.filter((item) => item.id !== pin.id)
        : [...listaActual, pin];

      return { ...prev, [nombreTablero]: nuevaLista };
    });
  };

  const cargarMasPines = async () => {
    if (cargando || seccionActiva === 'guardados') return;
    setCargando(true);
    const termino = seccionActiva === 'inicio' ? busqueda : (busqueda || seccionActiva);
    const nuevosPines = await obtenerPines(pagina, termino);
    setPines((prev) => [...prev, ...nuevosPines]);
    setPagina((prev) => prev + 1);
    setCargando(false);
  };

  useEffect(() => {
    if (seccionActiva === 'guardados') return;
    const cargarInicial = async () => {
      setCargando(true);
      setPagina(1);
      const termino = seccionActiva === 'inicio' ? busqueda : (busqueda || seccionActiva);
      const datos = await obtenerPines(1, termino);
      setPines(datos);
      setPagina(2);
      setCargando(false);
    };
    cargarInicial();
  }, [busqueda, seccionActiva]);

  // Obtener pines a mostrar si estamos en la sección "Guardados"
  const pinesAMostrar = seccionActiva === 'guardados' 
    ? (pinesPorTablero[tableroSeleccionado] || [])
    : pines;

  return (
    <ContextoPines.Provider
      value={{
        pines: pinesAMostrar,
        tableros,
        pinesPorTablero,
        crearTablero,
        guardarEnTablero,
        tableroSeleccionado,
        setTableroSeleccionado,
        cargando,
        cargarMasPines,
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