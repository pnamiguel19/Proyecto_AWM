const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// ==================== USER SCHEMA ====================
const userSchema = new mongoose.Schema({
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
    select: false // No incluir en queries por defecto
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

  // Rol del usuario
  role: {
    type: String,
    required: true,
    enum: {
      values: ['student', 'professor', 'admin'],
      message: '{VALUE} no es un rol válido'
    },
    default: 'student'
  },

  // Estado de la cuenta
  isActive: {
    type: Boolean,
    default: true
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  // Última conexión
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  discriminatorKey: 'role', // Para usar herencia con Student y Professor
  collection: 'users' // Todos los usuarios en la misma colección
});

// ==================== MIDDLEWARE PRE-SAVE ====================
// Hashear contraseña antes de guardar
userSchema.pre('save', async function(next) {
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
// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

// Método para obtener datos públicos del usuario
userSchema.methods.toPublicJSON = function() {
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
    isActive: this.isActive,
    isVerified: this.isVerified,
    lastLogin: this.lastLogin,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// ==================== CREAR MODELO ====================
const User = mongoose.model('User', userSchema);

module.exports = User;