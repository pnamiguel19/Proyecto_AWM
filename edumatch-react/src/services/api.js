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
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        address: userData.address,
        birthDate: userData.birthDate,
        gender: userData.gender,
        educationLevel: userData.educationLevel,
        aboutMe: userData.aboutMe || '',
        learningGoals: userData.learningGoals || ''
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
        bio: formData.bio,
        // Formación académica
        universityDegree: formData.universityDegree,
        university: formData.university,
        graduationYear: formData.graduationYear,
        teachingExperience: formData.teachingExperience,
        // Enseñanza
        subjects: formData.subjects || [],
        educationLevels: formData.educationLevels || [],
        teachingModalities: formData.teachingModalities || [],
        hourlyRate: formData.hourlyRate || 0,
        currency: formData.currency || 'USD',
        schedule: formData.schedule || {},
        maxStudentsPerClass: formData.maxStudentsPerClass || 1,
        minimumNoticeHours: formData.minimumNoticeHours || 24,
        additionalNotes: formData.additionalNotes || '',
        acceptTerms: formData.acceptTerms || true,
        acceptPrivacy: formData.acceptPrivacy || true,
        acceptNotifications: formData.acceptNotifications || true
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

  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/students/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
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

  bookClass: async (professorId, bookingData) => {
    const response = await fetch(`${API_URL}/students/bookings/${professorId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
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

  cancelBooking: async (professorId, bookingId) => {
    const response = await fetch(`${API_URL}/students/bookings/${professorId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ bookingId })
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

  getApproved: async () => {
    // No requiere autenticación ya que es público
    const response = await fetch(`${API_URL}/professors?limit=100`, {
      headers: { 'Content-Type': 'application/json' }
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

  getApprovedProfessors: async () => {
    const response = await fetch(`${API_URL}/admin/professors/approved`, {
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

  rejectProfessor: async (id, reason) => {
    const response = await fetch(`${API_URL}/admin/professors/${id}/reject`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });
    return handleResponse(response);
  },

  deactivateUser: async (id, reason) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/deactivate`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });
    return handleResponse(response);
  },

  activateUser: async (id) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/activate`, {
      method: 'PUT',
      headers: getAuthHeaders()
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

export const professorServiceProfile = {
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/professors/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  },

  updateSchedule: async (scheduleData) => {
    const response = await fetch(`${API_URL}/professors/schedule`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(scheduleData)
    });
    return handleResponse(response);
  },

  getSchedule: async (professorId) => {
    const response = await fetch(`${API_URL}/professors/${professorId}/schedule`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/professors/stats`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  addCertification: async (formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/professors/certifications`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    return handleResponse(response);
  }
};
