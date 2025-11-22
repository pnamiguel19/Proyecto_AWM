// Base de datos simulada de usuarios
export const mockUsers = {
  students: [
    {
      id: 'ST001',
      email: 'maria.gonzalez@student.com',
      password: 'Student123',
      role: 'student',
      profilePhoto: null,
      firstName: 'María',
      lastName: 'González',
      phone: '+593 99 123 4567',
      birthDate: '2003-05-15',
      gender: 'femenino',
      address: 'Av. América 123, Quito, Ecuador',
      bio: 'Estudiante de bachillerato interesada en matemáticas y ciencias',
      educationLevel: 'Bachillerato',
      subjects: ['Matemáticas', 'Física', 'Química'],
      learningGoals: 'Mejorar mis notas para entrar a la universidad',
      createdAt: '2024-01-15'
    },
    {
      id: 'ST002',
      email: 'carlos.rodriguez@student.com',
      password: 'Student123',
      role: 'student',
      profilePhoto: null,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      phone: '+593 98 234 5678',
      birthDate: '2005-08-22',
      gender: 'masculino',
      address: 'Calle 10 de Agosto 456, Guayaquil, Ecuador',
      bio: 'Me apasiona aprender idiomas y programación',
      educationLevel: 'Secundaria',
      subjects: ['Inglés', 'Programación'],
      learningGoals: 'Prepararme para certificaciones internacionales',
      createdAt: '2024-02-10'
    },
    {
      id: 'ST003',
      email: 'ana.martinez@student.com',
      password: 'Student123',
      role: 'student',
      profilePhoto: null,
      firstName: 'Ana',
      lastName: 'Martínez',
      phone: '+593 97 345 6789',
      birthDate: '2004-11-30',
      gender: 'femenino',
      address: 'Av. Solano 789, Cuenca, Ecuador',
      bio: 'Futura ingeniera, necesito refuerzo en ciencias exactas',
      educationLevel: 'Bachillerato',
      subjects: ['Matemáticas', 'Física', 'Cálculo'],
      learningGoals: 'Ingresar a la escuela politécnica',
      createdAt: '2024-03-05'
    },
    {
      id: 'ST004',
      email: 'luis.fernandez@student.com',
      password: 'Student123',
      role: 'student',
      profilePhoto: null,
      firstName: 'Luis',
      lastName: 'Fernández',
      phone: '+593 96 456 7890',
      birthDate: '2006-03-18',
      gender: 'masculino',
      address: 'Calle Bolivar 321, Manta, Ecuador',
      bio: 'Estudiante apasionado por las artes y la historia',
      educationLevel: 'Secundaria',
      subjects: ['Historia', 'Literatura', 'Arte'],
      learningGoals: 'Desarrollar mi creatividad y conocimiento cultural',
      createdAt: '2024-04-12'
    },
    {
      id: 'ST005',
      email: 'sofia.lopez@student.com',
      password: 'Student123',
      role: 'student',
      profilePhoto: null,
      firstName: 'Sofía',
      lastName: 'López',
      phone: '+593 95 567 8901',
      birthDate: '2005-07-09',
      gender: 'femenino',
      address: 'Av. 6 de Diciembre 654, Quito, Ecuador',
      bio: 'Me encanta la biología y quiero estudiar medicina',
      educationLevel: 'Bachillerato',
      subjects: ['Biología', 'Química', 'Anatomía'],
      learningGoals: 'Aprobar el examen de ingreso a medicina',
      createdAt: '2024-05-20'
    }
  ],

  professors: [
    {
      id: 'PR001',
      email: 'juan.perez@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Juan',
      lastName: 'Pérez',
      phone: '+593 99 111 2222',
      birthDate: '1985-06-15',
      gender: 'masculino',
      address: 'Av. Naciones Unidas 123, Quito, Ecuador',
      bio: 'Profesor de matemáticas con 15 años de experiencia. Especializado en preparación universitaria.',
      universityDegree: 'Licenciatura en Matemáticas',
      university: 'Universidad Central del Ecuador',
      graduationYear: '2008',
      teachingExperience: '10+',
      certifications: ['Certificación en Pedagogía', 'Matemáticas Aplicadas'],
      subjects: ['Matemáticas', 'Cálculo', 'Álgebra'],
      educationLevels: ['Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Presencial', 'Virtual'],
      pricePerHour: '25',
      currency: 'USD',
      schedule: {
        lunes: { manana: true, tarde: true, noche: false, todoElDia: false },
        martes: { manana: true, tarde: true, noche: false, todoElDia: false },
        miercoles: { manana: true, tarde: true, noche: true, todoElDia: true },
        jueves: { manana: true, tarde: false, noche: false, todoElDia: false },
        viernes: { manana: true, tarde: true, noche: false, todoElDia: false },
        sabado: { manana: true, tarde: false, noche: false, todoElDia: false },
        domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '5',
      reservationTime: '24',
      rating: 4.8,
      totalClasses: 245,
      createdAt: '2023-01-10'
    },
    {
      id: 'PR002',
      email: 'maria.sanchez@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'María',
      lastName: 'Sánchez',
      phone: '+593 98 222 3333',
      birthDate: '1990-03-22',
      gender: 'femenino',
      address: 'Calle Pichincha 456, Guayaquil, Ecuador',
      bio: 'Profesora de inglés certificada con experiencia internacional. Preparación para TOEFL e IELTS.',
      universityDegree: 'Licenciatura en Lenguas Extranjeras',
      university: 'Universidad de Guayaquil',
      graduationYear: '2012',
      teachingExperience: '5-10',
      certifications: ['TEFL', 'Cambridge C2', 'IELTS Examiner'],
      subjects: ['Inglés', 'Gramática', 'Conversación'],
      educationLevels: ['Primaria', 'Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Virtual', 'Híbrido'],
      pricePerHour: '20',
      currency: 'USD',
      schedule: {
        lunes: { manana: false, tarde: true, noche: true, todoElDia: false },
        martes: { manana: false, tarde: true, noche: true, todoElDia: false },
        miercoles: { manana: true, tarde: true, noche: true, todoElDia: true },
        jueves: { manana: false, tarde: true, noche: true, todoElDia: false },
        viernes: { manana: false, tarde: true, noche: true, todoElDia: false },
        sabado: { manana: true, tarde: true, noche: false, todoElDia: false },
        domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '3',
      reservationTime: '48',
      rating: 4.9,
      totalClasses: 189,
      createdAt: '2023-03-15'
    },
    {
      id: 'PR003',
      email: 'roberto.gomez@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Roberto',
      lastName: 'Gómez',
      phone: '+593 97 333 4444',
      birthDate: '1982-09-10',
      gender: 'masculino',
      address: 'Av. Loja 789, Cuenca, Ecuador',
      bio: 'Experto en física y química. Método práctico y dinámico para el aprendizaje.',
      universityDegree: 'Ingeniería Química',
      university: 'Escuela Politécnica Nacional',
      graduationYear: '2005',
      teachingExperience: '10+',
      certifications: ['Docencia Universitaria', 'Laboratorios Científicos'],
      subjects: ['Física', 'Química', 'Termodinámica'],
      educationLevels: ['Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Presencial', 'Virtual'],
      pricePerHour: '30',
      currency: 'USD',
      schedule: {
        lunes: { manana: true, tarde: false, noche: true, todoElDia: false },
        martes: { manana: true, tarde: false, noche: true, todoElDia: false },
        miercoles: { manana: true, tarde: true, noche: true, todoElDia: true },
        jueves: { manana: true, tarde: false, noche: true, todoElDia: false },
        viernes: { manana: true, tarde: false, noche: false, todoElDia: false },
        sabado: { manana: false, tarde: false, noche: false, todoElDia: false },
        domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '4',
      reservationTime: '24',
      rating: 4.7,
      totalClasses: 312,
      createdAt: '2023-02-20'
    },
    {
      id: 'PR004',
      email: 'laura.torres@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Laura',
      lastName: 'Torres',
      phone: '+593 96 444 5555',
      birthDate: '1988-12-05',
      gender: 'femenino',
      address: 'Calle Rocafuerte 234, Manta, Ecuador',
      bio: 'Profesora de programación y desarrollo web. Formación práctica orientada al mercado laboral.',
      universityDegree: 'Ingeniería en Sistemas',
      university: 'Universidad Técnica Particular de Loja',
      graduationYear: '2011',
      teachingExperience: '5-10',
      certifications: ['Full Stack Developer', 'Scrum Master', 'AWS Certified'],
      subjects: ['Programación', 'Python', 'JavaScript', 'React'],
      educationLevels: ['Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Virtual'],
      pricePerHour: '35',
      currency: 'USD',
      schedule: {
        lunes: { manana: false, tarde: true, noche: true, todoElDia: false },
        martes: { manana: false, tarde: true, noche: true, todoElDia: false },
        miercoles: { manana: false, tarde: true, noche: true, todoElDia: false },
        jueves: { manana: false, tarde: true, noche: true, todoElDia: false },
        viernes: { manana: false, tarde: true, noche: true, todoElDia: false },
        sabado: { manana: true, tarde: true, noche: true, todoElDia: true },
        domingo: { manana: true, tarde: true, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '6',
      reservationTime: '48',
      rating: 5.0,
      totalClasses: 156,
      createdAt: '2023-05-08'
    },
    {
      id: 'PR005',
      email: 'diego.ramirez@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Diego',
      lastName: 'Ramírez',
      phone: '+593 95 555 6666',
      birthDate: '1978-04-18',
      gender: 'masculino',
      address: 'Av. González Suárez 567, Quito, Ecuador',
      bio: 'Especialista en historia y ciencias sociales. Clases dinámicas con enfoque crítico.',
      universityDegree: 'Licenciatura en Historia',
      university: 'PUCE',
      graduationYear: '2001',
      teachingExperience: '10+',
      certifications: ['Pedagogía Social', 'Investigación Histórica'],
      subjects: ['Historia', 'Geografía', 'Ciencias Sociales'],
      educationLevels: ['Primaria', 'Secundaria', 'Bachillerato'],
      teachingModalities: ['Presencial', 'Virtual', 'Híbrido'],
      pricePerHour: '18',
      currency: 'USD',
      schedule: {
        lunes: { manana: true, tarde: true, noche: false, todoElDia: false },
        martes: { manana: true, tarde: true, noche: false, todoElDia: false },
        miercoles: { manana: true, tarde: true, noche: false, todoElDia: false },
        jueves: { manana: true, tarde: true, noche: false, todoElDia: false },
        viernes: { manana: true, tarde: true, noche: false, todoElDia: false },
        sabado: { manana: false, tarde: false, noche: false, todoElDia: false },
        domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '8',
      reservationTime: '24',
      rating: 4.6,
      totalClasses: 423,
      createdAt: '2023-01-25'
    },
    {
      id: 'PR006',
      email: 'patricia.morales@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Patricia',
      lastName: 'Morales',
      phone: '+593 94 666 7777',
      birthDate: '1992-07-28',
      gender: 'femenino',
      address: 'Calle Orellana 890, Ambato, Ecuador',
      bio: 'Profesora de biología y ciencias naturales. Enfoque experimental y didáctico.',
      universityDegree: 'Licenciatura en Biología',
      university: 'Universidad Central del Ecuador',
      graduationYear: '2015',
      teachingExperience: '5-10',
      certifications: ['Educación Ambiental', 'Laboratorio Científico'],
      subjects: ['Biología', 'Ecología', 'Anatomía'],
      educationLevels: ['Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Presencial', 'Virtual'],
      pricePerHour: '22',
      currency: 'USD',
      schedule: {
        lunes: { manana: false, tarde: true, noche: true, todoElDia: false },
        martes: { manana: false, tarde: true, noche: true, todoElDia: false },
        miercoles: { manana: true, tarde: true, noche: true, todoElDia: true },
        jueves: { manana: false, tarde: true, noche: true, todoElDia: false },
        viernes: { manana: false, tarde: true, noche: true, todoElDia: false },
        sabado: { manana: true, tarde: false, noche: false, todoElDia: false },
        domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '4',
      reservationTime: '24',
      rating: 4.8,
      totalClasses: 198,
      createdAt: '2023-04-12'
    },
    {
      id: 'PR007',
      email: 'fernando.castro@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Fernando',
      lastName: 'Castro',
      phone: '+593 93 777 8888',
      birthDate: '1986-11-14',
      gender: 'masculino',
      address: 'Av. América 345, Loja, Ecuador',
      bio: 'Experto en literatura y redacción. Preparación para exámenes y concursos literarios.',
      universityDegree: 'Licenciatura en Literatura',
      university: 'Universidad de Cuenca',
      graduationYear: '2009',
      teachingExperience: '10+',
      certifications: ['Redacción Académica', 'Crítica Literaria'],
      subjects: ['Literatura', 'Redacción', 'Lenguaje'],
      educationLevels: ['Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Virtual', 'Híbrido'],
      pricePerHour: '20',
      currency: 'USD',
      schedule: {
        lunes: { manana: true, tarde: false, noche: true, todoElDia: false },
        martes: { manana: true, tarde: false, noche: true, todoElDia: false },
        miercoles: { manana: true, tarde: false, noche: true, todoElDia: false },
        jueves: { manana: true, tarde: false, noche: true, todoElDia: false },
        viernes: { manana: true, tarde: false, noche: true, todoElDia: false },
        sabado: { manana: false, tarde: false, noche: false, todoElDia: false },
        domingo: { manana: true, tarde: true, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '5',
      reservationTime: '48',
      rating: 4.7,
      totalClasses: 267,
      createdAt: '2023-02-28'
    },
    {
      id: 'PR008',
      email: 'andrea.vega@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Andrea',
      lastName: 'Vega',
      phone: '+593 92 888 9999',
      birthDate: '1994-02-09',
      gender: 'femenino',
      address: 'Calle Mejía 678, Riobamba, Ecuador',
      bio: 'Profesora de francés nativa. Certificada por Alliance Française.',
      universityDegree: 'Licenciatura en Lenguas Modernas',
      university: 'Universidad San Francisco de Quito',
      graduationYear: '2016',
      teachingExperience: '5-10',
      certifications: ['DELF/DALF', 'Alliance Française', 'FLE'],
      subjects: ['Francés', 'Gramática Francesa', 'Conversación'],
      educationLevels: ['Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Virtual'],
      pricePerHour: '28',
      currency: 'USD',
      schedule: {
        lunes: { manana: false, tarde: true, noche: true, todoElDia: false },
        martes: { manana: false, tarde: true, noche: true, todoElDia: false },
        miercoles: { manana: false, tarde: true, noche: true, todoElDia: false },
        jueves: { manana: false, tarde: true, noche: true, todoElDia: false },
        viernes: { manana: false, tarde: true, noche: true, todoElDia: false },
        sabado: { manana: true, tarde: true, noche: false, todoElDia: false },
        domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '3',
      reservationTime: '48',
      rating: 4.9,
      totalClasses: 134,
      createdAt: '2023-06-05'
    },
    {
      id: 'PR009',
      email: 'miguel.herrera@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Miguel',
      lastName: 'Herrera',
      phone: '+593 91 999 0000',
      birthDate: '1980-08-25',
      gender: 'masculino',
      address: 'Av. Huayna Cápac 901, Cuenca, Ecuador',
      bio: 'Profesor de música y teoría musical. Más de 20 años formando músicos profesionales.',
      universityDegree: 'Licenciatura en Música',
      university: 'Conservatorio Nacional',
      graduationYear: '2003',
      teachingExperience: '10+',
      certifications: ['Teoría Musical Avanzada', 'Piano', 'Guitarra'],
      subjects: ['Música', 'Piano', 'Guitarra', 'Solfeo'],
      educationLevels: ['Primaria', 'Secundaria', 'Bachillerato'],
      teachingModalities: ['Presencial', 'Virtual'],
      pricePerHour: '25',
      currency: 'USD',
      schedule: {
        lunes: { manana: false, tarde: true, noche: true, todoElDia: false },
        martes: { manana: false, tarde: true, noche: true, todoElDia: false },
        miercoles: { manana: false, tarde: true, noche: true, todoElDia: false },
        jueves: { manana: false, tarde: true, noche: true, todoElDia: false },
        viernes: { manana: false, tarde: true, noche: true, todoElDia: false },
        sabado: { manana: true, tarde: true, noche: true, todoElDia: true },
        domingo: { manana: true, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '2',
      reservationTime: '24',
      rating: 4.9,
      totalClasses: 512,
      createdAt: '2023-01-05'
    },
    {
      id: 'PR010',
      email: 'carmen.silva@professor.com',
      password: 'Professor123',
      role: 'professor',
      profilePhoto: null,
      firstName: 'Carmen',
      lastName: 'Silva',
      phone: '+593 90 000 1111',
      birthDate: '1991-05-30',
      gender: 'femenino',
      address: 'Calle Colón 123, Machala, Ecuador',
      bio: 'Profesora de arte y diseño gráfico. Clases prácticas con proyectos reales.',
      universityDegree: 'Licenciatura en Artes Visuales',
      university: 'Universidad de las Artes',
      graduationYear: '2014',
      teachingExperience: '5-10',
      certifications: ['Adobe Certified', 'Diseño UX/UI', 'Ilustración Digital'],
      subjects: ['Arte', 'Diseño Gráfico', 'Photoshop', 'Illustrator'],
      educationLevels: ['Secundaria', 'Bachillerato', 'Universidad'],
      teachingModalities: ['Virtual', 'Híbrido'],
      pricePerHour: '30',
      currency: 'USD',
      schedule: {
        lunes: { manana: true, tarde: true, noche: false, todoElDia: false },
        martes: { manana: true, tarde: true, noche: false, todoElDia: false },
        miercoles: { manana: true, tarde: true, noche: false, todoElDia: false },
        jueves: { manana: true, tarde: true, noche: false, todoElDia: false },
        viernes: { manana: true, tarde: true, noche: false, todoElDia: false },
        sabado: { manana: true, tarde: false, noche: false, todoElDia: false },
        domingo: { manana: false, tarde: false, noche: false, todoElDia: false }
      },
      maxStudentsPerClass: '4',
      reservationTime: '48',
      rating: 4.8,
      totalClasses: 178,
      createdAt: '2023-03-22'
    }
  ],

  admin: {
    id: 'ADM001',
    email: 'admin@edumatch.com',
    password: 'Admin123',
    role: 'admin',
    firstName: 'Administrador',
    lastName: 'EduMatch',
    phone: '+593 99 000 0000',
    createdAt: '2023-01-01'
  }
};

// Función para agregar un nuevo estudiante
export const addStudent = (studentData) => {
  const newStudent = {
    id: `ST${String(mockUsers.students.length + 1).padStart(3, '0')}`,
    ...studentData,
    role: 'student',
    createdAt: new Date().toISOString().split('T')[0]
  };
  mockUsers.students.push(newStudent);
  saveToLocalStorage();
  return newStudent;
};

// Función para agregar un nuevo profesor
export const addProfessor = (professorData) => {
  const newProfessor = {
    id: `PR${String(mockUsers.professors.length + 1).padStart(3, '0')}`,
    ...professorData,
    role: 'professor',
    rating: 0,
    totalClasses: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
  mockUsers.professors.push(newProfessor);
  saveToLocalStorage();
  return newProfessor;
};

// Función para autenticar usuario
export const authenticateUser = (email, password) => {
  // Buscar en estudiantes
  const student = mockUsers.students.find(
    u => u.email === email && u.password === password
  );
  if (student) return student;

  // Buscar en profesores
  const professor = mockUsers.professors.find(
    u => u.email === email && u.password === password
  );
  if (professor) return professor;

  // Buscar en admin
  if (mockUsers.admin.email === email && mockUsers.admin.password === password) {
    return mockUsers.admin;
  }

  return null;
};

// Función para verificar si un email ya existe
export const emailExists = (email) => {
  return (
    mockUsers.students.some(u => u.email === email) ||
    mockUsers.professors.some(u => u.email === email) ||
    mockUsers.admin.email === email
  );
};

// Guardar en localStorage
export const saveToLocalStorage = () => {
  localStorage.setItem('edumatch_users', JSON.stringify(mockUsers));
};

// Cargar desde localStorage
export const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('edumatch_users');
  if (stored) {
    const parsedData = JSON.parse(stored);
    mockUsers.students = parsedData.students || mockUsers.students;
    mockUsers.professors = parsedData.professors || mockUsers.professors;
    mockUsers.admin = parsedData.admin || mockUsers.admin;
  }
};

// Inicializar al cargar
loadFromLocalStorage();