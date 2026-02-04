const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers');
const { 
  authenticate, 
  isAdmin,
  validateObjectId,
  validateRequiredFields
} = require('../middlewares');

/**
 * @route   GET /api/admin/users
 * @desc    Obtener todos los usuarios
 * @access  Private (Solo admin)
 */
router.get(
  '/users',
  authenticate,
  isAdmin,
  adminController.getAllUsers
);

/**
 * @route   GET /api/admin/professors/pending
 * @desc    Obtener profesores pendientes de aprobación
 * @access  Private (Solo admin)
 */
router.get(
  '/professors/pending',
  authenticate,
  isAdmin,
  adminController.getPendingProfessors
);

/**
 * @route   PUT /api/admin/professors/:professorId/approve
 * @desc    Aprobar profesor
 * @access  Private (Solo admin)
 */
router.put(
  '/professors/:professorId/approve',
  authenticate,
  isAdmin,
  validateObjectId('professorId'),
  adminController.approveProfessor
);

/**
 * @route   PUT /api/admin/professors/:professorId/reject
 * @desc    Rechazar profesor
 * @access  Private (Solo admin)
 */
router.put(
  '/professors/:professorId/reject',
  authenticate,
  isAdmin,
  validateObjectId('professorId'),
  validateRequiredFields(['reason']),
  adminController.rejectProfessor
);

/**
 * @route   PUT /api/admin/users/:userId/deactivate
 * @desc    Desactivar usuario
 * @access  Private (Solo admin)
 */
router.put(
  '/users/:userId/deactivate',
  authenticate,
  isAdmin,
  validateObjectId('userId'),
  validateRequiredFields(['reason']),
  adminController.deactivateUser
);

/**
 * @route   PUT /api/admin/users/:userId/activate
 * @desc    Activar usuario
 * @access  Private (Solo admin)
 */
router.put(
  '/users/:userId/activate',
  authenticate,
  isAdmin,
  validateObjectId('userId'),
  adminController.activateUser
);

/**
 * @route   GET /api/admin/stats
 * @desc    Obtener estadísticas de la plataforma
 * @access  Private (Solo admin)
 */
router.get(
  '/stats',
  authenticate,
  isAdmin,
  adminController.getPlatformStats
);

/**
 * @route   GET /api/admin/logs
 * @desc    Obtener logs de acciones del admin
 * @access  Private (Solo admin)
 */
router.get(
  '/logs',
  authenticate,
  isAdmin,
  adminController.getAdminLogs
);

module.exports = router;