const { User, Professor, Student, Admin } = require('../models');
const { AppError } = require('../middlewares');

/**
 * Obtener todos los usuarios
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { role, isActive, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (role) filters.role = role;
    if (isActive !== undefined) filters.isActive = isActive === 'true';

    const skip = (page - 1) * limit;
    const users = await User.find(filters)
      .select('-password')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener profesores pendientes de aprobación
 */
const getPendingProfessors = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const professors = await Professor.find({ isApproved: false })
      .populate('userId', '-password')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Professor.countDocuments({ isApproved: false });

    res.status(200).json({
      success: true,
      data: professors,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Aprobar profesor
 */
const approveProfessor = async (req, res, next) => {
  try {
    const { professorId } = req.params;

    const professor = await Professor.findByIdAndUpdate(
      professorId,
      {
        isApproved: true,
        approvalDate: new Date()
      },
      { new: true }
    ).populate('userId', '-password');

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    // Registrar acción del admin
    const admin = await Admin.findOne({ userId: req.userId });
    if (admin) {
      await admin.logAction('approve_professor', professor.userId, `Aprobó al profesor ${professor.userId}`);
    }

    res.status(200).json({
      success: true,
      message: 'Profesor aprobado exitosamente',
      data: professor
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Rechazar profesor
 */
const rejectProfessor = async (req, res, next) => {
  try {
    const { professorId } = req.params;
    const { reason } = req.body;

    const professor = await Professor.findByIdAndUpdate(
      professorId,
      {
        isApproved: false,
        rejectionReason: reason
      },
      { new: true }
    ).populate('userId', '-password');

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    // Registrar acción del admin
    const admin = await Admin.findOne({ userId: req.userId });
    if (admin) {
      await admin.logAction('reject_professor', professor.userId, `Rechazó al profesor: ${reason}`);
    }

    res.status(200).json({
      success: true,
      message: 'Profesor rechazado',
      data: professor
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Desactivar usuario
 */
const deactivateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Registrar acción del admin
    const admin = await Admin.findOne({ userId: req.userId });
    if (admin) {
      await admin.logAction('deactivate_user', userId, `Desactivó usuario: ${reason}`);
    }

    res.status(200).json({
      success: true,
      message: 'Usuario desactivado exitosamente',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Activar usuario
 */
const activateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Registrar acción del admin
    const admin = await Admin.findOne({ userId: req.userId });
    if (admin) {
      await admin.logAction('activate_user', userId, 'Activó usuario');
    }

    res.status(200).json({
      success: true,
      message: 'Usuario activado exitosamente',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener estadísticas de la plataforma
 */
const getPlatformStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalProfessors = await Professor.countDocuments();
    const approvedProfessors = await Professor.countDocuments({ isApproved: true });
    const pendingProfessors = await Professor.countDocuments({ isApproved: false });
    const activeUsers = await User.countDocuments({ isActive: true });

    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers
      },
      students: {
        total: totalStudents
      },
      professors: {
        total: totalProfessors,
        approved: approvedProfessors,
        pending: pendingProfessors
      }
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener logs de acciones del admin
 */
const getAdminLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const admin = await Admin.findOne({ userId: req.userId });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin no encontrado'
      });
    }

    const skip = (page - 1) * limit;
    const logs = admin.actionsLog
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(skip, skip + Number(limit));

    res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: admin.actionsLog.length
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getPendingProfessors,
  approveProfessor,
  rejectProfessor,
  deactivateUser,
  activateUser,
  getPlatformStats,
  getAdminLogs
};