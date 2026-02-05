import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ CAMBIA ESTA IP POR LA TUYA (ejecuta: ipconfig en Windows)
const LOCAL_IP = '172.29.21.56'; // 👈 CAMBIAR AQUÍ

// Exportar como constante nombrada
export const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:8000/api'
  : `http://${LOCAL_IP}:8000/api`;

console.log('🌐 API URL:', API_BASE_URL);

// Crear instancia de axios configurada
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a cada request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      return config;
    } catch (error) {
      console.error('Error al obtener token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.url} - ${response.status}`);
    return response.data; // Retornar solo la data
  },
  (error) => {
    console.error('❌ Error en respuesta:', error.message);

    if (error.response) {
      // El servidor respondió con error
      const errorData = {
        message: error.response.data.message || 'Error del servidor',
        status: error.response.status,
        errors: error.response.data.errors || {},
      };
      console.error('📥 Respuesta de error:', errorData);
      return Promise.reject(errorData);
    } else if (error.request) {
      // No hubo respuesta del servidor
      console.error('📥 No hubo respuesta del servidor');
      return Promise.reject({
        error: 'NETWORK_ERROR',
        message: `No se pudo conectar con el servidor en ${API_BASE_URL}. Verifica que el backend esté corriendo.`,
      });
    } else {
      // Error al configurar la petición
      console.error('📥 Error al configurar petición:', error.message);
      return Promise.reject({
        message: error.message || 'Error desconocido',
      });
    }
  }
);

// Exportar por defecto la instancia de axios
export default api;