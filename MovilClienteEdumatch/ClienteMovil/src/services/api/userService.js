import api from './config';

const userService = {
  // Estudiantes
  getStudentById: async (studentId) => {
    return await api.get(`/students/${studentId}`);
  },

  updateStudent: async (updates) => {
    return await api.put('/students/profile', updates);
  },

  addFavoriteProfessor: async (professorId) => {
    return await api.post(`/students/favorites/${professorId}`);
  },

  removeFavoriteProfessor: async (professorId) => {
    return await api.delete(`/students/favorites/${professorId}`);
  },

  getFavoriteProfessors: async () => {
    return await api.get('/students/favorites');
  },

  getBookedClasses: async () => {
    return await api.get('/students/classes');
  },

  getStudentStats: async () => {
    return await api.get('/students/stats');
  },

  // Profesores
  getAllProfessors: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await api.get(`/professors?${queryParams}`);
  },

  getProfessorById: async (professorId) => {
    return await api.get(`/professors/${professorId}`);
  },

  updateProfessor: async (updates) => {
    return await api.put('/professors/profile', updates);
  },

  updateSchedule: async (schedule) => {
    return await api.put('/professors/schedule', { schedule });
  },

  getSchedule: async (professorId) => {
    return await api.get(`/professors/${professorId}/schedule`);
  },

  getProfessorStats: async () => {
    return await api.get('/professors/stats');
  },

  addCertification: async (name, file) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('certification', {
      uri: file.uri,
      type: file.type || 'application/pdf',
      name: file.name || 'certification.pdf',
    });

    return await api.post('/professors/certifications', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Obtener todos los profesores
  getProfessors: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await api.get(`/users/professors?${queryString}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener todos los estudiantes
  getStudents: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await api.get(`/users/students?${queryString}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener usuario por ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (userId, updateData) => {
    try {
      const response = await api.put(`/users/${userId}`, updateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Buscar profesores
  searchProfessors: async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters,
      };
      const queryString = new URLSearchParams(params).toString();
      const response = await api.get(`/users/professors?${queryString}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;