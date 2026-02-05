const jwt = require('jsonwebtoken');
const Student = require('../models/Student.model');
const Professor = require('../models/Professor.model');
const User = require('../models/User.model');

// Verificar que JWT_SECRET esté configurado
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR CRÍTICO: JWT_SECRET no está configurado en .env');
  process.exit(1);
}

// ==================== LOGIN ====================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', { email, password: '***' });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Campos requeridos faltantes',
        errors: {
          email: !email ? 'Email es requerido' : undefined,
          password: !password ? 'Password es requerido' : undefined,
        }
      });
    }

    console.log('🔍 Buscando en User...');
    // Buscar en todas las colecciones (User incluye admin, Student, Professor)
    let user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    console.log('User result:', user ? `✅ Encontrado (${user.role})` : '❌ No encontrado');
    
    if (!user) {
      console.log('🔍 Buscando en Student...');
      user = await Student.findOne({ email: email.toLowerCase() }).select('+password');
      console.log('Student result:', user ? `✅ Encontrado` : '❌ No encontrado');
    }
    
    if (!user) {
      console.log('🔍 Buscando en Professor...');
      user = await Professor.findOne({ email: email.toLowerCase() }).select('+password');
      console.log('Professor result:', user ? `✅ Encontrado` : '❌ No encontrado');
    }

    if (!user) {
      console.log('❌ Usuario no encontrado en ninguna colección');
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    console.log('👤 Usuario encontrado:', { email: user.email, role: user.role });
    console.log('🔑 Verificando password...');

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password válido:', isPasswordValid ? '✅ SÍ' : '❌ NO');

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar que el usuario esté activo
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Tu cuenta ha sido desactivada. Contacta al administrador.'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    console.log('✅ Login exitoso para:', user.email);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
      user: user.toPublicJSON()
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ==================== REGISTER STUDENT ====================
const registerStudent = async (req, res) => {
  try {
    console.log('📝 Registro de estudiante:', req.body.email);

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      birthDate,
      gender,
      address,
      educationLevel,
      aboutMe,
      learningGoals
    } = req.body;

    // Validar campos requeridos
    if (!firstName || !lastName || !email || !password || !phone || !birthDate || !gender || !address || !educationLevel) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos',
        errors: {
          firstName: !firstName ? 'Nombre es requerido' : undefined,
          lastName: !lastName ? 'Apellido es requerido' : undefined,
          email: !email ? 'Email es requerido' : undefined,
          password: !password ? 'Contraseña es requerida' : undefined,
          phone: !phone ? 'Teléfono es requerido' : undefined,
          birthDate: !birthDate ? 'Fecha de nacimiento es requerida' : undefined,
          gender: !gender ? 'Género es requerido' : undefined,
          address: !address ? 'Dirección es requerida' : undefined,
          educationLevel: !educationLevel ? 'Nivel educativo es requerido' : undefined,
        }
      });
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres',
        errors: {
          password: 'La contraseña debe tener al menos 8 caracteres'
        }
      });
    }

    // Verificar si el email ya existe en ambas colecciones
    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    const existingProfessor = await Professor.findOne({ email: email.toLowerCase() });
    
    if (existingStudent || existingProfessor) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Crear estudiante
    const student = new Student({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      birthDate,
      gender,
      address,
      educationLevel,
      aboutMe,
      learningGoals
    });

    await student.save();

    // Generar token
    const token = jwt.sign(
      { 
        userId: student._id, 
        role: student.role,
        email: student.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    console.log('✅ Estudiante registrado:', student.email);

    res.status(201).json({
      success: true,
      message: 'Estudiante registrado exitosamente',
      token,
      user: student.toPublicJSON()
    });

  } catch (error) {
    console.error('❌ Error al registrar estudiante:', error);

    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al registrar estudiante',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ==================== REGISTER PROFESSOR ====================
const registerProfessor = async (req, res) => {
  try {
    console.log('📥 POST /api/auth/register/professor');
    console.log('📝 Body keys:', Object.keys(req.body));
    console.log('📎 Files:', req.files ? Object.keys(req.files) : 'ninguno');

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      birthDate,
      gender,
      address,
      bio,
      universityDegree,
      university,
      graduationYear,
      teachingExperience,
      subjects,
      educationLevels,
      teachingModalities,
      hourlyRate,
      currency,
      schedule,
      maxStudentsPerClass,
      minimumNoticeHours,
      additionalNotes,
      acceptTerms,
      acceptPrivacy,
      acceptNotifications
    } = req.body;

    // Validaciones básicas...
    if (!firstName || !lastName || !email || !password || !phone || !birthDate || !gender || !address) {
      console.log('❌ Faltan campos básicos');
      return res.status(400).json({
        success: false,
        message: 'Faltan campos básicos requeridos'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres',
        errors: { password: 'La contraseña debe tener al menos 8 caracteres' }
      });
    }

    if (!universityDegree || !university || !graduationYear || !teachingExperience) {
      console.log('❌ Faltan campos académicos');
      return res.status(400).json({
        success: false,
        message: 'Faltan datos de formación académica'
      });
    }

    // Aceptar tanto boolean como string 'true'
    const termsAccepted = acceptTerms === true || acceptTerms === 'true';
    const privacyAccepted = acceptPrivacy === true || acceptPrivacy === 'true';
    
    if (!termsAccepted || !privacyAccepted) {
      return res.status(400).json({
        success: false,
        message: 'Debes aceptar los términos y condiciones'
      });
    }

    // Verificar email
    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    const existingProfessor = await Professor.findOne({ email: email.toLowerCase() });
    
    if (existingStudent || existingProfessor) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Parsear arrays
    const parsedSubjects = typeof subjects === 'string' ? JSON.parse(subjects) : subjects;
    const parsedEducationLevels = typeof educationLevels === 'string' ? JSON.parse(educationLevels) : educationLevels;
    const parsedTeachingModalities = typeof teachingModalities === 'string' ? JSON.parse(teachingModalities) : teachingModalities;
    
    // ✅ CONVERTIR schedule correctamente
    let parsedSchedule = typeof schedule === 'string' ? JSON.parse(schedule) : schedule;
    
    // Convertir array a Map con timeSlots como array de objetos
    if (Array.isArray(parsedSchedule)) {
      const scheduleMap = new Map();
      
      parsedSchedule.forEach(item => {
        if (item.day && item.timeSlots && Array.isArray(item.timeSlots)) {
          // Convertir cada timeSlot string a objeto con startTime y endTime
          const timeSlotObjects = item.timeSlots.map(slot => {
            // Mapear los slots a horarios reales
            const timeMap = {
              'morning': { startTime: '08:00', endTime: '12:00' },
              'afternoon': { startTime: '14:00', endTime: '18:00' },
              'evening': { startTime: '18:00', endTime: '21:00' },
              'night': { startTime: '21:00', endTime: '23:00' }
            };
            
            return timeMap[slot] || { startTime: '09:00', endTime: '17:00' };
          });
          
          scheduleMap.set(item.day, timeSlotObjects);
        }
      });
      
      parsedSchedule = scheduleMap;
    }

    console.log('✅ Datos parseados correctamente');
    console.log('📅 Schedule convertido:', parsedSchedule);

    // Crear profesor
    const professor = new Professor({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      birthDate,
      gender,
      address,
      bio,
      universityDegree,
      university,
      graduationYear: parseInt(graduationYear),
      teachingExperience,
      subjects: parsedSubjects,
      educationLevels: parsedEducationLevels,
      teachingModalities: parsedTeachingModalities,
      hourlyRate: parseFloat(hourlyRate),
      currency: currency || 'USD',
      schedule: parsedSchedule,
      maxStudentsPerClass: parseInt(maxStudentsPerClass) || 1,
      minimumNoticeHours: parseInt(minimumNoticeHours) || 24,
      additionalNotes,
      acceptTerms: acceptTerms === 'true',
      acceptPrivacy: acceptPrivacy === 'true',
      acceptNotifications: acceptNotifications === 'true'
    });

    // Procesar archivos
    if (req.files) {
      console.log('📎 Procesando archivos...');
      if (req.files.profileImage && req.files.profileImage[0]) {
        professor.profileImage = req.files.profileImage[0].path;
        console.log('  ✅ Foto de perfil guardada');
      }
      if (req.files.degreeDocument && req.files.degreeDocument[0]) {
        professor.degreeDocument = req.files.degreeDocument[0].path;
        console.log('  ✅ Título universitario guardado');
      }
      if (req.files.professionalIdDocument && req.files.professionalIdDocument[0]) {
        professor.professionalIdDocument = req.files.professionalIdDocument[0].path;
        console.log('  ✅ Cédula guardada');
      }
      if (req.files.certifications) {
        professor.certifications = req.files.certifications.map(file => ({
          name: file.originalname,
          url: file.path
        }));
        console.log(`  ✅ ${req.files.certifications.length} certificaciones guardadas`);
      }
    }

    await professor.save();

    // Generar token
    const token = jwt.sign(
      { 
        userId: professor._id, 
        role: professor.role,
        email: professor.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    console.log('✅ Profesor registrado:', professor.email);

    res.status(201).json({
      success: true,
      message: 'Profesor registrado exitosamente. Tu perfil está pendiente de aprobación.',
      token,
      user: professor.toPublicJSON()
    });

  } catch (error) {
    console.error('❌ Error al registrar profesor:', error);

    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al registrar profesor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ==================== LOGOUT ====================
const logout = async (req, res) => {
  try {
    console.log('🚪 Logout');
    
    res.status(200).json({
      success: true,
      message: 'Logout exitoso'
    });
  } catch (error) {
    console.error('❌ Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cerrar sesión'
    });
  }
};

// ==================== EXPORTAR FUNCIONES ====================
module.exports = {
  login,
  registerStudent,
  registerProfessor,
  logout
};