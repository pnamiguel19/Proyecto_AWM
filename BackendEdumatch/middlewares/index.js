const { authenticate, optionalAuthenticate, JWT_SECRET } = require('./auth.middleware');
const {
  authorize,
  isStudent,
  isProfessor,
  isAdmin,
  isProfessorOrAdmin,
  isOwner,
  isOwnerOrAdmin
} = require('./role.middleware');
const {
  validate,
  validateRequiredFields,
  validateObjectId,
  sanitizeInput
} = require('./validator.middleware');
const { errorHandler, notFound, AppError } = require('./error.middleware');
const { upload, handleMulterError } = require('./upload.middleware');

module.exports = {
  // Auth
  authenticate,
  optionalAuthenticate,
  JWT_SECRET,

  // Roles
  authorize,
  isStudent,
  isProfessor,
  isAdmin,
  isProfessorOrAdmin,
  isOwner,
  isOwnerOrAdmin,

  // Validación
  validate,
  validateRequiredFields,
  validateObjectId,
  sanitizeInput,

  // Errores
  errorHandler,
  notFound,
  AppError,

  // Upload
  upload,
  handleMulterError
};