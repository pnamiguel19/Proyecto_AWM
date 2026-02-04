import api from './config';

const authService = {
  // ==================== LOGIN ====================
  login: async (credentials) => {
    try {
      console.log('🔐 Servicio: Enviando login al backend...');
      console.log('📤 Datos enviados:', {
        email: credentials.email,
        password: '***hidden***'
      });

      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      console.log('✅ Respuesta del servidor:', response);

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('❌ Error en authService.login:', error);
      throw error;
    }
  },

  // ==================== REGISTER STUDENT ====================
  registerStudent: async (studentData) => {
    try {
      console.log('📝 Servicio: Registrando estudiante...');

      const response = await api.post('/auth/register/student', studentData);

      console.log('✅ Estudiante registrado:', response);

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('❌ Error en authService.registerStudent:', error);
      throw error;
    }
  },

  // ==================== REGISTER PROFESSOR ====================
  registerProfessor: async (professorData) => {
    try {
      console.log('📝 Servicio: Registrando profesor...');

      const formData = new FormData();

      // Agregar campos de texto
      Object.keys(professorData).forEach(key => {
        // Saltar archivos, se agregan después
        if (key === 'profileImage' || key === 'degreeDocument' || 
            key === 'professionalIdDocument' || key === 'certifications') {
          return;
        }

        const value = professorData[key];
        
        // Convertir arrays y objetos a JSON string
        if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      // ✅ FORMATO CORRECTO para React Native Expo
      if (professorData.profileImage?.uri) {
        const filename = professorData.profileImage.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('profileImage', {
          uri: professorData.profileImage.uri,
          name: filename,
          type: type
        });
        console.log('📷 Foto de perfil agregada:', filename);
      }

      if (professorData.degreeDocument?.uri) {
        const filename = professorData.degreeDocument.uri.split('/').pop();
        formData.append('degreeDocument', {
          uri: professorData.degreeDocument.uri,
          name: filename,
          type: 'application/pdf'
        });
        console.log('📄 Título universitario agregado:', filename);
      }

      if (professorData.professionalIdDocument?.uri) {
        const filename = professorData.professionalIdDocument.uri.split('/').pop();
        formData.append('professionalIdDocument', {
          uri: professorData.professionalIdDocument.uri,
          name: filename,
          type: 'application/pdf'
        });
        console.log('📄 Cédula profesional agregada:', filename);
      }

      if (professorData.certifications?.length > 0) {
        professorData.certifications.forEach((cert, index) => {
          if (cert?.uri) {
            const filename = cert.uri.split('/').pop();
            formData.append('certifications', {
              uri: cert.uri,
              name: filename || `cert-${index}.pdf`,
              type: 'application/pdf'
            });
          }
        });
        console.log(`📄 ${professorData.certifications.length} certificaciones agregadas`);
      }

      console.log('📦 FormData preparado para envío');

      // ✅ Enviar con timeout extendido
      const response = await api.post('/auth/register/professor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutos para archivos grandes
      });

      console.log('✅ Profesor registrado exitosamente');

      return {
        success: true,
        data: response,
      };

    } catch (error) {
      console.error('❌ Error en authService.registerProfessor:', error);

      if (error.response) {
        console.error('📥 Respuesta de error:', {
          status: error.response.status,
          message: error.response.data?.message,
          errors: error.response.data?.errors
        });
        throw {
          message: error.response.data?.message || 'Error al registrar profesor',
          errors: error.response.data?.errors,
          status: error.response.status
        };
      } else if (error.request) {
        console.error('📥 No hubo respuesta del servidor');
        console.error('📝 Config:', error.config);
        throw {
          error: 'NETWORK_ERROR',
          message: 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.'
        };
      } else {
        throw {
          error: 'UNKNOWN_ERROR',
          message: error.message || 'Error desconocido'
        };
      }
    }
  },

  // ==================== VERIFY TOKEN ====================
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('❌ Error al verificar token:', error);
      return {
        success: false,
        message: 'Token inválido o expirado',
      };
    }
  },

  // ==================== LOGOUT ====================
  logout: async () => {
    try {
      await api.post('/auth/logout');
      return { success: true };
    } catch (error) {
      console.error('❌ Error al hacer logout:', error);
      return { success: true };
    }
  },
};

export default authService;