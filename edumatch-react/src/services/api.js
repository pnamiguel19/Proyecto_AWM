const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }
  
  return data;
};

export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  registerStudent: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        firstName: userData.nombre,
        lastName: userData.apellido,
        phone: userData.telefono,
        address: userData.ciudad,
        birthDate: userData.birthDate || '2000-01-01',
        gender: userData.gender || 'prefer_not_to_say',
        educationLevel: userData.educationLevel || 'university',
        learningGoals: userData.learningGoals || '',
        acceptTerms: true
      })
    });
    return handleResponse(response);
  },

  registerProfessor: async (formData) => {
    const response = await fetch(`${API_URL}/auth/register/professor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        birthDate: formData.birthDate,
        gender: formData.gender,
        educationLevel: formData.educationLevel,
        university: formData.university,
        degree: formData.degree,
        graduationYear: formData.graduationYear,
        subjects: formData.subjects || [],
        experience: formData.experience || '',
        aboutMe: formData.aboutMe || '',
        teachingPhilosophy: formData.teachingPhilosophy || '',
        schedule: formData.schedule || {},
        acceptTerms: formData.acceptTerms || true
      })
    });
    return handleResponse(response);
  }
};

export const studentService = {
  getProfile: async (id) => {
    const response = await fetch(`${API_URL}/students/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  updateProfile: async (data) => {
    const response = await fetch(`${API_URL}/students/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/students/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getFavorites: async () => {
    const response = await fetch(`${API_URL}/students/favorites`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  addFavorite: async (professorId) => {
    const response = await fetch(`${API_URL}/students/favorites/${professorId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  removeFavorite: async (professorId) => {
    const response = await fetch(`${API_URL}/students/favorites/${professorId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getClasses: async () => {
    const response = await fetch(`${API_URL}/students/classes`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  addBooking: async (professorId) => {
    const response = await fetch(`${API_URL}/students/bookings/${professorId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  cancelBooking: async (professorId) => {
    const response = await fetch(`${API_URL}/students/bookings/${professorId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export const professorService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/professors`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/professors/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  updateProfile: async (data) => {
    const response = await fetch(`${API_URL}/professors/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  updateSchedule: async (schedule) => {
    const response = await fetch(`${API_URL}/professors/schedule`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ schedule })
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/professors/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export const adminService = {
  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getPendingProfessors: async () => {
    const response = await fetch(`${API_URL}/admin/professors/pending`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  approveProfessor: async (id) => {
    const response = await fetch(`${API_URL}/admin/professors/${id}/approve`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  rejectProfessor: async (id) => {
    const response = await fetch(`${API_URL}/admin/professors/${id}/reject`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  deactivateUser: async (id, role) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/deactivate`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role })
    });
    return handleResponse(response);
  },

  activateUser: async (id, role) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/activate`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role })
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getLogs: async () => {
    const response = await fetch(`${API_URL}/admin/logs`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};
