const express = require('express');
const router = express.Router();
const { professorController } = require('../controllers');
const { 
  authenticate, 
  isProfessor,
  optionalAuthenticate,
  validateObjectId,
  upload,
  handleMulterError
} = require('../middlewares');

/**
 * @route   GET /api/professors
 * @desc    Obtener todos los profesores con filtros
 * @access  Public
 */
router.get(
  '/',
  optionalAuthenticate,
  professorController.getAllProfessors
);

/**
 * @route   GET /api/professors/:id
 * @desc    Obtener profesor por ID
 * @access  Public
 */
router.get(
  '/:id',
  validateObjectId('id'),
  professorController.getProfessorById
);

/**
 * @route   PUT /api/professors/profile
 * @desc    Actualizar perfil de profesor
 * @access  Private (Solo profesor)
 */
router.put(
  '/profile',
  authenticate,
  isProfessor,
  professorController.updateProfessor
);

/**
 * @route   PUT /api/professors/schedule
 * @desc    Actualizar horario del profesor
 * @access  Private (Solo profesor)
 */
router.put(
  '/schedule',
  authenticate,
  isProfessor,
  professorController.updateSchedule
);

/**
 * @route   GET /api/professors/:id/schedule
 * @desc    Obtener horario del profesor
 * @access  Public
 */
router.get(
  '/:id/schedule',
  validateObjectId('id'),
  professorController.getSchedule
);

/**
 * @route   GET /api/professors/stats
 * @desc    Obtener estadísticas del profesor
 * @access  Private (Solo profesor)
 */
router.get(
  '/stats',
  authenticate,
  isProfessor,
  professorController.getProfessorStats
);

/**
 * @route   POST /api/professors/certifications
 * @desc    Agregar certificación adicional
 * @access  Private (Solo profesor)
 */
router.post(
  '/certifications',
  authenticate,
  isProfessor,
  upload.single('certification'),
  handleMulterError,
  professorController.addCertification
);

module.exports = router;