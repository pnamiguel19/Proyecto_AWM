const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// ==================== PROFESSOR SCHEMA ====================
const professorSchema = new mongoose.Schema({
  // Información básica (igual que Student)
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es requerido']
  },
  birthDate: {
    type: Date,
    required: [true, 'La fecha de nacimiento es requerida']
  },
  gender: {
    type: String,
    required: [true, 'El género es requerido'],
    enum: ['male', 'female', 'other', 'prefer_not_to_say']
  },
  address: {
    type: String,
    required: [true, 'La dirección es requerida']
  },
  profileImage: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'professor',
    immutable: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },

  // Campos específicos de Professor
  bio: {
    type: String,
    maxlength: [1000, 'La biografía no puede exceder 1000 caracteres']
  },
  universityDegree: {
    type: String,
    required: [true, 'El título universitario es requerido']
  },
  university: {
    type: String,
    required: [true, 'La universidad es requerida']
  },
  graduationYear: {
    type: Number,
    required: [true, 'El año de graduación es requerido']
  },
  teachingExperience: {
    type: String,
    required: [true, 'La experiencia docente es requerida']
  },
  subjects: [{
    type: String,
    required: true
  }],
  educationLevels: [{
    type: String,
    enum: ['elementary', 'middle_school', 'high_school', 'university', 'postgraduate']
  }],
  teachingModalities: [{
    type: String,
    enum: ['online', 'in_person', 'hybrid']
  }],
  hourlyRate: {
    type: Number,
    required: [true, 'La tarifa por hora es requerida'],
    min: [0, 'La tarifa no puede ser negativa']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  schedule: {
    type: Map,
    of: [{
      start: String,
      end: String
    }]
  },
  maxStudentsPerClass: {
    type: Number,
    default: 1,
    min: 1
  },
  minimumNoticeHours: {
    type: Number,
    default: 24,
    min: 1
  },
  additionalNotes: String,
  degreeDocument: String,
  professionalIdDocument: String,
  certifications: [{
    name: String,
    url: String
  }],
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  totalClasses: {
    type: Number,
    default: 0
  },
  acceptTerms: {
    type: Boolean,
    required: true
  },
  acceptPrivacy: {
    type: Boolean,
    required: true
  },
  acceptNotifications: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'professors' // 👈 Colección separada
});

// ==================== MIDDLEWARE ====================
professorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ==================== MÉTODOS ====================
professorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

professorSchema.methods.toPublicJSON = function() {
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
    bio: this.bio,
    universityDegree: this.universityDegree,
    university: this.university,
    subjects: this.subjects,
    educationLevels: this.educationLevels,
    teachingModalities: this.teachingModalities,
    hourlyRate: this.hourlyRate,
    currency: this.currency,
    rating: this.rating,
    approvalStatus: this.approvalStatus,
    isActive: this.isActive,
    isVerified: this.isVerified,
    createdAt: this.createdAt
  };
};

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;