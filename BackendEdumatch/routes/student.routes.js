const express = require('express');
const router = express.Router();
const { studentController } = require('../controllers');
const { 
  authenticate, 
  isStudent, 
  isOwner,
  validateObjectId 
} = require('../middlewares');

/**
 * @route   PUT /api/students/profile
 * @desc    Actualizar perfil de estudiante
 * @access  Private (Solo estudiante)
 */
router.put(
  '/profile',
  authenticate,
  isStudent,
  studentController.updateStudent
);

/**
 * @route   GET /api/students/favorites
 * @desc    Obtener profesores favoritos
 * @access  Private (Solo estudiante)
 */
router.get(
  '/favorites',
  authenticate,
  isStudent,
  studentController.getFavoriteProfessors
);

/**
 * @route   POST /api/students/favorites/:professorId
 * @desc    Agregar profesor a favoritos
 * @access  Private (Solo estudiante)
 */
router.post(
  '/favorites/:professorId',
  authenticate,
  isStudent,
  validateObjectId('professorId'),
  studentController.addFavoriteProfessor
);

/**
 * @route   DELETE /api/students/favorites/:professorId
 * @desc    Remover profesor de favoritos
 * @access  Private (Solo estudiante)
 */
router.delete(
  '/favorites/:professorId',
  authenticate,
  isStudent,
  validateObjectId('professorId'),
  studentController.removeFavoriteProfessor
);

/**
 * @route   GET /api/students/classes
 * @desc    Obtener clases reservadas
 * @access  Private (Solo estudiante)
 */
router.get(
  '/classes',
  authenticate,
  isStudent,
  studentController.getBookedClasses
);

/**
 * @route   POST /api/students/bookings/:professorId
 * @desc    Agregar nueva reserva
 * @access  Private (Solo estudiante)
 */
router.post(
  '/bookings/:professorId',
  authenticate,
  isStudent,
  validateObjectId('professorId'),
  studentController.addBooking
);

/**
 * @route   DELETE /api/students/bookings/:professorId
 * @desc    Cancelar reserva
 * @access  Private (Solo estudiante)
 */
router.delete(
  '/bookings/:professorId',
  authenticate,
  isStudent,
  validateObjectId('professorId'),
  studentController.cancelBooking
);

/**
 * @route   GET /api/students/stats
 * @desc    Obtener estadísticas del estudiante
 * @access  Private (Solo estudiante)
 */
router.get(
  '/stats',
  authenticate,
  isStudent,
  studentController.getStudentStats
);

/**
 * @route   GET /api/students/:id
 * @desc    Obtener perfil de estudiante por ID
 * @access  Private
 */
router.get(
  '/:id',
  authenticate,
  validateObjectId('id'),
  studentController.getStudentById
);

module.exports = router;