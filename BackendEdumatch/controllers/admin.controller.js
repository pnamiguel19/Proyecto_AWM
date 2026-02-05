const { User, Professor, Student, Admin } = require('../models');
const { AppError } = require('../middlewares');

/**
 * Obtener todos los usuarios
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { role, isActive, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (isActive !== undefined) filters.isActive = isActive === 'true';

    const skip = (page - 1) * limit;
    
    let users = [];
    let total = 0;

    // Si se filtra por rol específico
    if (role) {
      if (role === 'admin') {
        users = await User.find(filters)
          .select('-password')
          .skip(skip)
          .limit(Number(limit))
          .sort({ createdAt: -1 });
        total = await User.countDocuments(filters);
      } else if (role === 'student') {
        users = await Student.find(filters)
          .select('-password')
          .skip(skip)
          .limit(Number(limit))
          .sort({ createdAt: -1 });
        total = await Student.countDocuments(filters);
      } else if (role === 'professor') {
        users = await Professor.find(filters)
          .select('-password')
          .skip(skip)
          .limit(Number(limit))
          .sort({ createdAt: -1 });
        total = await Professor.countDocuments(filters);
      }
    } else {
      // Si no hay filtro de rol, traer de todas las colecciones
      const [admins, students, professors] = await Promise.all([
        User.find(filters).select('-password').sort({ createdAt: -1 }),
        Student.find(filters).select('-password').sort({ createdAt: -1 }),
        Professor.find(filters).select('-password').sort({ createdAt: -1 })
      ]);

      // Combinar y ordenar por fecha
      users = [...admins, ...students, ...professors]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(skip, skip + Number(limit));

      total = admins.length + students.length + professors.length;
    }

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
    const professors = await Professor.find({ approvalStatus: 'pending' })
      .select('-password')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Professor.countDocuments({ approvalStatus: 'pending' });

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
        approvalStatus: 'approved',
        isVerified: true
      },
      { new: true }
    ).select('-password');

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
        approvalStatus: 'rejected',
        rejectionReason: reason
      },
      { new: true }
    ).select('-password');

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

    // Buscar en todas las colecciones
    let user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      user = await Student.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      ).select('-password');
    }

    if (!user) {
      user = await Professor.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
      ).select('-password');
    }

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
      await admin.save();
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

    // Buscar en todas las colecciones
    let user = await User.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      user = await Student.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
      ).select('-password');
    }

    if (!user) {
      user = await Professor.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
      ).select('-password');
    }

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
      await admin.save();
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
    const approvedProfessors = await Professor.countDocuments({ approvalStatus: 'approved' });
    const pendingProfessors = await Professor.countDocuments({ approvalStatus: 'pending' });
    const rejectedProfessors = await Professor.countDocuments({ approvalStatus: 'rejected' });
    const activeUsers = await User.countDocuments({ isActive: true });

    const stats = {
      users: {
        total: totalUsers + totalStudents + totalProfessors,
        active: activeUsers,
        inactive: totalUsers - activeUsers
      },
      students: {
        total: totalStudents
      },
      professors: {
        total: totalProfessors,
        approved: approvedProfessors,
        rejected: rejectedProfessors,
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