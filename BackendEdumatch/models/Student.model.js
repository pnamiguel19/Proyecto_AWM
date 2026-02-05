const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// ==================== STUDENT SCHEMA ====================
const studentSchema = new mongoose.Schema({
  // Información básica
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
    minlength: [2, 'El apellido debe tener al menos 2 caracteres'],
    maxlength: [50, 'El apellido no puede exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true
  },
  birthDate: {
    type: Date,
    required: [true, 'La fecha de nacimiento es requerida']
  },
  gender: {
    type: String,
    required: [true, 'El género es requerido'],
    enum: {
      values: ['male', 'female', 'other', 'prefer_not_to_say'],
      message: '{VALUE} no es un género válido'
    }
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida'],
    trim: true
  },
  profileImage: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'student',
    immutable: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },

  // ==================== CAMPOS ESPECÍFICOS DE STUDENT ====================
  educationLevel: {
    type: String,
    required: [true, 'El nivel educativo es requerido'],
    enum: {
      values: ['elementary', 'middle_school', 'high_school', 'university', 'postgraduate', 'other'],
      message: '{VALUE} no es un nivel educativo válido'
    }
  },
  aboutMe: {
    type: String,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
    default: ''
  },
  learningGoals: {
    type: String,
    maxlength: [500, 'Los objetivos no pueden exceder 500 caracteres'],
    default: ''
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  }],
  completedClasses: {
    type: Number,
    default: 0,
    min: 0
  },
  favoriteProfessors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  }],
  notificationPreferences: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  collection: 'students'
});

// ==================== MIDDLEWARE PRE-SAVE ====================
studentSchema.pre('save', async function(next) {
  // Solo hashear si la contraseña fue modificada
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ==================== MÉTODOS ====================
studentSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

studentSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    birthDate: this.birthDate,
    gender: this.gender,
    address: this.address,
    profileImage: this.profileImage,
    role: this.role,
    educationLevel: this.educationLevel,
    aboutMe: this.aboutMe,
    learningGoals: this.learningGoals,
    completedClasses: this.completedClasses,
    isActive: this.isActive,
    isVerified: this.isVerified,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// ==================== CREAR MODELO ====================
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;