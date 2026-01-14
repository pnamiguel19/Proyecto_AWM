// Archivo de servicios para consumir la API del backend

const API_BASE_URL = '/api';

/**
 * Función helper para hacer peticiones HTTP
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('Error en API:', error);
    throw error;
  }
};

/**
 * Servicios de Items
 */
export const itemsService = {
  // GET /api/items - Obtener todos los items
  getAll: async () => {
    return fetchAPI('/items');
  },

  // GET /api/items/:id - Obtener un item por ID
  getById: async (id) => {
    return fetchAPI(`/items/${id}`);
  },

  // POST /api/items - Crear un nuevo item
  create: async (itemData) => {
    return fetchAPI('/items', {
      method: 'POST',
      body: JSON.stringify(itemData)
    });
  },

  // DELETE /api/items/:id - Eliminar un item
  delete: async (id) => {
    return fetchAPI(`/items/${id}`, {
      method: 'DELETE'
    });
  }
};

/**
 * Servicio para verificar el estado del servidor
 */
export const healthCheck = async () => {
  return fetchAPI('/health');
};

export default {
  items: itemsService,
  healthCheck
};
