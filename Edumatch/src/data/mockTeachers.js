export const mockTeachers = [
  {
    id: 1,
    name: "Juan García",
    mainSubject: "Física - Bachillerato",
    modality: "Virtual / Presencial",
    rating: 4.8,
    reviewCount: 35,
    approvalRate: 98,
    photos: {
      main: "https://via.placeholder.com/400x300/FF6B35/ffffff?text=Juan+Garcia",
      additional: [
        "https://via.placeholder.com/200x150/00D9E1/ffffff?text=Clase+1",
        "https://via.placeholder.com/200x150/FFD700/ffffff?text=Clase+2"
      ]
    },
    video: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Conoce más sobre mi metodología de enseñanza y cómo puedo ayudarte a alcanzar tus objetivos académicos"
    },
    courses: [
      {
        id: 1,
        title: "Física General y Aplicada al Bachillerato",
        duration: "1h de clase",
        priceVirtual: "$10 USD",
        pricePresencial: "$15 USD",
        modality: "Virtual/Presencial"
      },
      {
        id: 2,
        title: "Física Universitaria - Mecánica",
        duration: "1.5h de clase",
        priceVirtual: "$15 USD",
        pricePresencial: "$20 USD",
        modality: "Virtual/Presencial"
      }
    ],
    reviews: [
      {
        id: 1,
        studentName: "María Fernández",
        rating: 5,
        date: "Hace 1 mes",
        comment: "Excelente profesor. Explica de manera clara y siempre está dispuesto a resolver dudas. Gracias a sus clases mejoré notablemente en física y pude aprobar mi examen de ingreso."
      },
      {
        id: 2,
        studentName: "Carlos Rodríguez",
        rating: 5,
        date: "Hace 2 meses",
        comment: "Sus clases son muy dinámicas y usa ejemplos de la vida real que hacen fácil entender conceptos complicados. Lo recomiendo totalmente."
      },
      {
        id: 3,
        studentName: "Ana Martínez",
        rating: 4,
        date: "Hace 3 meses",
        comment: "Muy paciente y dedicado. Me ayudó a prepararme para mi examen final y obtuve una excelente calificación. Sus métodos de enseñanza son efectivos."
      },
      {
        id: 4,
        studentName: "Diego López",
        rating: 5,
        date: "Hace 4 meses",
        comment: "El mejor profesor de física que he tenido. Hace que las clases sean interesantes y siempre está disponible para responder preguntas fuera del horario de clase."
      },
      {
        id: 5,
        studentName: "Sofía Ramírez",
        rating: 5,
        date: "Hace 5 meses",
        comment: "Increíble profesor. Tiene mucha paciencia y se adapta al ritmo de aprendizaje de cada estudiante. Mis notas mejoraron significativamente."
      },
      {
        id: 6,
        studentName: "Pedro Sánchez",
        rating: 4,
        date: "Hace 6 meses",
        comment: "Muy profesional y conocedor de su materia. Sus explicaciones son claras y siempre trae material de apoyo muy útil para las clases."
      }
    ],
    location: {
      address: "Av. 6 de Diciembre N34-120 y Av. Ignacio de Veintimilla, Quito, Ecuador",
      coordinates: { lat: -0.1807, lng: -78.4678 }
    }
  },
  {
    id: 2,
    name: "María López",
    mainSubject: "Matemáticas - Primaria y Secundaria",
    modality: "Virtual / Presencial",
    rating: 4.9,
    reviewCount: 42,
    approvalRate: 100,
    photos: {
      main: "https://via.placeholder.com/400x300/00D9E1/ffffff?text=Maria+Lopez",
      additional: [
        "https://via.placeholder.com/200x150/FF6B35/ffffff?text=Matematicas+1",
        "https://via.placeholder.com/200x150/FFD700/ffffff?text=Matematicas+2"
      ]
    },
    video: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Hola, soy María. Te ayudo a dominar las matemáticas de forma fácil y divertida. Mis clases son dinámicas y adaptadas a tu ritmo."
    },
    courses: [
      {
        id: 1,
        title: "Matemáticas para Primaria",
        duration: "1h de clase",
        priceVirtual: "$8 USD",
        pricePresencial: "$12 USD",
        modality: "Virtual/Presencial"
      },
      {
        id: 2,
        title: "Álgebra y Geometría - Secundaria",
        duration: "1h de clase",
        priceVirtual: "$10 USD",
        pricePresencial: "$15 USD",
        modality: "Virtual/Presencial"
      }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Laura Gómez",
        rating: 5,
        date: "Hace 2 semanas",
        comment: "María es increíble. Mi hija pasó de odiar las matemáticas a amarlas. Muy paciente y creativa en sus métodos."
      },
      {
        id: 2,
        studentName: "Roberto Silva",
        rating: 5,
        date: "Hace 1 mes",
        comment: "Excelente profesora. Explica con ejemplos prácticos y siempre tiene material de apoyo. Mis calificaciones mejoraron significativamente."
      },
      {
        id: 3,
        studentName: "Carmen Torres",
        rating: 5,
        date: "Hace 2 meses",
        comment: "La mejor decisión fue tomar clases con María. Es didáctica y hace que todo sea más fácil de entender."
      },
      {
        id: 4,
        studentName: "Luis Méndez",
        rating: 4,
        date: "Hace 3 meses",
        comment: "Muy buena profesora. Mis hijos están muy contentos con sus clases y han mejorado mucho."
      }
    ],
    location: {
      address: "Av. República del Salvador N35-17 y Suecia, Quito, Ecuador",
      coordinates: { lat: -0.1698, lng: -78.4824 }
    }
  },
  {
    id: 3,
    name: "Carlos Pérez",
    mainSubject: "Química - Bachillerato",
    modality: "Virtual",
    rating: 4.7,
    reviewCount: 28,
    approvalRate: 96,
    photos: {
      main: "https://via.placeholder.com/400x300/FFD700/ffffff?text=Carlos+Perez",
      additional: [
        "https://via.placeholder.com/200x150/FF6B35/ffffff?text=Laboratorio+1",
        "https://via.placeholder.com/200x150/00D9E1/ffffff?text=Laboratorio+2"
      ]
    },
    video: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Química orgánica e inorgánica explicada de manera simple. Prepárate para tus exámenes con experimentos virtuales y ejercicios prácticos."
    },
    courses: [
      {
        id: 1,
        title: "Química General - Bachillerato",
        duration: "1h de clase",
        priceVirtual: "$12 USD",
        pricePresencial: "No disponible",
        modality: "Virtual"
      },
      {
        id: 2,
        title: "Química Orgánica",
        duration: "1.5h de clase",
        priceVirtual: "$15 USD",
        pricePresencial: "No disponible",
        modality: "Virtual"
      }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Valentina Ruiz",
        rating: 5,
        date: "Hace 1 semana",
        comment: "Carlos hace que la química sea fascinante. Sus clases virtuales son muy interactivas y usa simuladores que ayudan mucho."
      },
      {
        id: 2,
        studentName: "Andrés Moreno",
        rating: 4,
        date: "Hace 3 semanas",
        comment: "Buen profesor, muy organizado. Me ayudó mucho para mi examen de ingreso a la universidad."
      },
      {
        id: 3,
        studentName: "Isabella Castro",
        rating: 5,
        date: "Hace 1 mes",
        comment: "Excelente metodología. Carlos es paciente y se asegura de que entiendas cada concepto antes de avanzar."
      },
      {
        id: 4,
        studentName: "Mateo Vega",
        rating: 4,
        date: "Hace 2 meses",
        comment: "Muy profesional. Sus clases en línea son de alta calidad con buen material de apoyo."
      }
    ],
    location: {
      address: "Clases 100% virtuales - Quito, Ecuador",
      coordinates: { lat: -0.1807, lng: -78.4678 }
    }
  },
  {
    id: 4,
    name: "Gabriela Mendoza",
    mainSubject: "Francés - Todos los niveles",
    modality: "Virtual / Presencial",
    rating: 4.9,
    reviewCount: 38,
    approvalRate: 99,
    photos: {
      main: "https://via.placeholder.com/400x300/9C27B0/ffffff?text=Gabriela+Mendoza",
      additional: [
        "https://via.placeholder.com/200x150/E91E63/ffffff?text=Frances+1",
        "https://via.placeholder.com/200x150/3F51B5/ffffff?text=Frances+2"
      ]
    },
    video: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Bonjour! Aprende francés de forma natural y divertida. Clases conversacionales adaptadas a tu nivel, desde principiante hasta avanzado."
    },
    courses: [
      {
        id: 1,
        title: "Francés Básico - Nivel A1",
        duration: "1h de clase",
        priceVirtual: "$12 USD",
        pricePresencial: "$18 USD",
        modality: "Virtual/Presencial"
      },
      {
        id: 2,
        title: "Francés Intermedio - Nivel B1/B2",
        duration: "1h de clase",
        priceVirtual: "$15 USD",
        pricePresencial: "$20 USD",
        modality: "Virtual/Presencial"
      },
      {
        id: 3,
        title: "Conversación en Francés",
        duration: "1h de clase",
        priceVirtual: "$13 USD",
        pricePresencial: "$18 USD",
        modality: "Virtual/Presencial"
      }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Daniela Herrera",
        rating: 5,
        date: "Hace 5 días",
        comment: "Gabriela es maravillosa. En 6 meses pasé de no saber nada a poder mantener conversaciones básicas en francés."
      },
      {
        id: 2,
        studentName: "Sebastián Ortiz",
        rating: 5,
        date: "Hace 2 semanas",
        comment: "La mejor profesora de idiomas que he tenido. Sus clases son muy dinámicas y me preparó perfectamente para mi examen DELF."
      },
      {
        id: 3,
        studentName: "Camila Suárez",
        rating: 5,
        date: "Hace 1 mes",
        comment: "Excelente! Gabriela hace que aprender francés sea divertido. Usa juegos, canciones y conversaciones reales."
      },
      {
        id: 4,
        studentName: "Fernando Ríos",
        rating: 4,
        date: "Hace 1 mes",
        comment: "Muy buena profesora. Paciente y con excelente pronunciación. Recomendada 100%."
      }
    ],
    location: {
      address: "Av. Naciones Unidas E10-43 y Av. de los Shyris, Quito, Ecuador",
      coordinates: { lat: -0.1865, lng: -78.4892 }
    }
  },
  {
    id: 5,
    name: "Miguel Vargas",
    mainSubject: "Música - Piano y Guitarra",
    modality: "Presencial",
    rating: 5.0,
    reviewCount: 31,
    approvalRate: 100,
    photos: {
      main: "https://via.placeholder.com/400x300/FF5722/ffffff?text=Miguel+Vargas",
      additional: [
        "https://via.placeholder.com/200x150/795548/ffffff?text=Piano",
        "https://via.placeholder.com/200x150/607D8B/ffffff?text=Guitarra"
      ]
    },
    video: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Aprende piano o guitarra desde cero. Clases personalizadas para todas las edades con metodología Suzuki y técnicas modernas."
    },
    courses: [
      {
        id: 1,
        title: "Piano para Principiantes",
        duration: "1h de clase",
        priceVirtual: "No disponible",
        pricePresencial: "$20 USD",
        modality: "Presencial"
      },
      {
        id: 2,
        title: "Guitarra Clásica y Moderna",
        duration: "1h de clase",
        priceVirtual: "No disponible",
        pricePresencial: "$18 USD",
        modality: "Presencial"
      },
      {
        id: 3,
        title: "Teoría Musical",
        duration: "45min de clase",
        priceVirtual: "No disponible",
        pricePresencial: "$15 USD",
        modality: "Presencial"
      }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Sofía Delgado",
        rating: 5,
        date: "Hace 1 semana",
        comment: "Miguel es un profesor excepcional. En 3 meses ya toco varias canciones en piano. Super recomendado!"
      },
      {
        id: 2,
        studentName: "Emilio Navarro",
        rating: 5,
        date: "Hace 2 semanas",
        comment: "El mejor profesor de música. Paciente, dedicado y con excelente metodología. Mi hijo está encantado."
      },
      {
        id: 3,
        studentName: "Lucía Paredes",
        rating: 5,
        date: "Hace 3 semanas",
        comment: "Increíble maestro. Sus clases de guitarra son muy completas y divertidas. Vale cada centavo."
      },
      {
        id: 4,
        studentName: "David Cedeño",
        rating: 5,
        date: "Hace 1 mes",
        comment: "Excelente! Miguel tiene mucha paciencia y adapta las clases a tu ritmo de aprendizaje."
      }
    ],
    location: {
      address: "Calle Valladolid N24-353 y Vizcaya, La Floresta, Quito, Ecuador",
      coordinates: { lat: -0.1951, lng: -78.4892 }
    }
  },
  {
    id: 6,
    name: "Valentina Soto",
    mainSubject: "Dibujo - Arte y Diseño",
    modality: "Virtual / Presencial",
    rating: 4.8,
    reviewCount: 25,
    approvalRate: 97,
    photos: {
      main: "https://via.placeholder.com/400x300/E91E63/ffffff?text=Valentina+Soto",
      additional: [
        "https://via.placeholder.com/200x150/9C27B0/ffffff?text=Arte+1",
        "https://via.placeholder.com/200x150/673AB7/ffffff?text=Arte+2"
      ]
    },
    video: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Descubre tu artista interior. Clases de dibujo, pintura y diseño digital para todos los niveles. Desarrollo de portafolios artísticos."
    },
    courses: [
      {
        id: 1,
        title: "Dibujo Artístico - Básico",
        duration: "1.5h de clase",
        priceVirtual: "$10 USD",
        pricePresencial: "$15 USD",
        modality: "Virtual/Presencial"
      },
      {
        id: 2,
        title: "Ilustración Digital",
        duration: "2h de clase",
        priceVirtual: "$18 USD",
        pricePresencial: "$25 USD",
        modality: "Virtual/Presencial"
      },
      {
        id: 3,
        title: "Portafolio para Universidad",
        duration: "2h de clase",
        priceVirtual: "$20 USD",
        pricePresencial: "$28 USD",
        modality: "Virtual/Presencial"
      }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Martín Cabrera",
        rating: 5,
        date: "Hace 4 días",
        comment: "Valentina es una artista increíble y mejor maestra. Me ayudó a preparar mi portafolio para la universidad y quedó espectacular."
      },
      {
        id: 2,
        studentName: "Paula Romero",
        rating: 5,
        date: "Hace 2 semanas",
        comment: "Excelente profesora! Sus clases son muy inspiradoras y he mejorado muchísimo en poco tiempo."
      },
      {
        id: 3,
        studentName: "Nicolás Ponce",
        rating: 4,
        date: "Hace 3 semanas",
        comment: "Muy buena. Me enseñó desde lo básico y ahora puedo hacer ilustraciones digitales. Totalmente recomendada."
      },
      {
        id: 4,
        studentName: "Amanda Flores",
        rating: 5,
        date: "Hace 1 mes",
        comment: "La mejor decisión fue tomar clases con Valentina. Es creativa, paciente y tiene mucho conocimiento."
      }
    ],
    location: {
      address: "Av. González Suárez N27-142 y Vega Muñoz, Quito, Ecuador",
      coordinates: { lat: -0.1976, lng: -78.4901 }
    }
  }
];

// Función para obtener todos los profesores (mock + registrados)
export const getAllTeachers = () => {
  // Cargar profesores registrados desde localStorage
  const storedUsers = localStorage.getItem('edumatch_users');
  let registeredProfessors = [];
  
  if (storedUsers) {
    const parsedData = JSON.parse(storedUsers);
    registeredProfessors = parsedData.professors || [];
  }

  // Mapear profesores registrados al formato de mockTeachers
  const mappedRegisteredProfessors = registeredProfessors.map((prof, index) => ({
    id: 100 + index, // IDs empiezan desde 100 para evitar conflictos
    name: `${prof.firstName} ${prof.lastName}`,
    mainSubject: prof.subjects?.[0] ? `${prof.subjects[0]} - ${prof.educationLevels?.[0] || 'Varios niveles'}` : 'Materia no especificada',
    modality: prof.teachingModalities?.join(' / ') || 'No especificado',
    rating: prof.rating || 0,
    reviewCount: prof.totalClasses || 0,
    approvalRate: Math.floor((prof.rating / 5) * 100) || 0,
    photos: {
      main: prof.profilePhoto || `https://via.placeholder.com/400x300/00BCD4/ffffff?text=${prof.firstName}+${prof.lastName}`,
      additional: [
        `https://via.placeholder.com/200x150/FF6B35/ffffff?text=Clase+1`,
        `https://via.placeholder.com/200x150/FFD700/ffffff?text=Clase+2`
      ]
    },
    video: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: prof.bio || "Profesor registrado en EduMatch"
    },
    courses: prof.subjects?.map((subject, idx) => ({
      id: idx + 1,
      title: `${subject} - ${prof.educationLevels?.[0] || 'Varios niveles'}`,
      duration: "1h de clase",
      priceVirtual: `$${prof.pricePerHour || 15} ${prof.currency || 'USD'}`,
      pricePresencial: `$${parseInt(prof.pricePerHour || 15) + 5} ${prof.currency || 'USD'}`,
      modality: prof.teachingModalities?.join('/') || 'Virtual/Presencial'
    })) || [],
    reviews: [
      {
        id: 1,
        studentName: "Usuario EduMatch",
        rating: prof.rating || 5,
        date: "Reciente",
        comment: "Excelente profesor registrado en nuestra plataforma."
      }
    ],
    location: {
      address: prof.address || "Quito, Ecuador",
      coordinates: { lat: -0.1807, lng: -78.4678 }
    }
  }));

  // Combinar profesores mock + registrados
  return [...mockTeachers, ...mappedRegisteredProfessors];
};

// Función para obtener un profesor por ID (busca en mock y registrados)
export const getTeacherById = (id) => {
  // Buscar primero en mockTeachers
  const mockTeacher = mockTeachers.find(teacher => teacher.id === parseInt(id));
  if (mockTeacher) return mockTeacher;

  // Si no se encuentra, buscar en profesores registrados
  const allTeachers = getAllTeachers();
  return allTeachers.find(teacher => teacher.id === parseInt(id));
};