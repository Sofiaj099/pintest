const API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'tQZMXKCY0yQ_sGmTJjD3K89-kFRFEkpWdo4Z_waUko0';

export const obtenerPines = async (pagina = 1, busqueda = '') => {
  try {
    const endpoint = busqueda
      ? `${API_URL}/search/photos?page=${pagina}&per_page=15&query=${busqueda}&client_id=${ACCESS_KEY}`
      : `${API_URL}/photos/random?count=15&client_id=${ACCESS_KEY}`;

    const respuesta = await fetch(endpoint);
    if (!respuesta.ok) throw new Error('Error al obtener los pines');

    const datos = await respuesta.json();
    return busqueda ? datos.results : datos;
  } catch (error) {
    console.error(error);
    return [];
  }
};