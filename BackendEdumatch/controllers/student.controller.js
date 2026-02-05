const { User, Student, Professor } = require('../models');
const { AppError } = require('../middlewares');

/**
 * Obtener perfil de estudiante por ID
 */
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar perfil de estudiante
 */
const updateStudent = async (req, res, next) => {
  try {
    const updates = req.body;

    // Campos que se pueden actualizar
    const allowedUpdates = {
      ...(updates.firstName && { firstName: updates.firstName }),
      ...(updates.lastName && { lastName: updates.lastName }),
      ...(updates.phone && { phone: updates.phone }),
      ...(updates.address && { address: updates.address }),
      ...(updates.birthDate && { birthDate: updates.birthDate }),
      ...(updates.gender && { gender: updates.gender }),
      ...(updates.educationLevel && { educationLevel: updates.educationLevel }),
      ...(updates.aboutMe && { aboutMe: updates.aboutMe }),
      ...(updates.learningGoals && { learningGoals: updates.learningGoals })
    };

    const student = await Student.findByIdAndUpdate(
      req.userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Perfil de estudiante actualizado exitosamente',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Agregar profesor a favoritos
 */
const addFavoriteProfessor = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { professorId } = req.params;

    // Verificar que el profesor existe
    const professor = await Professor.findById(professorId);
    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    // Agregar a favoritos
    const student = await Student.findByIdAndUpdate(
      req.userId,
      { $addToSet: { favoriteProfessors: professorId } },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profesor agregado a favoritos',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Remover profesor de favoritos
 */
const removeFavoriteProfessor = async (req, res, next) => {
  try {
    const { professorId } = req.params;

    const student = await Student.findByIdAndUpdate(
      req.userId,
      { $pull: { favoriteProfessors: professorId } },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profesor removido de favoritos',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener profesores favoritos
 */
const getFavoriteProfessors = async (req, res, next) => {
  try {
    const student = await Student.findById(req.userId)
      .populate('favoriteProfessors')
      .select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: student.favoriteProfessors
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener clases reservadas
 */
const getBookedClasses = async (req, res, next) => {
  try {
    const student = await Student.findById(req.userId)
      .populate({
        path: 'bookings',
        match: { approvalStatus: 'approved' }
      })
      .select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: student.bookings || []
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener estadísticas del estudiante
 */
const getStudentStats = async (req, res, next) => {
  try {
    const student = await Student.findById(req.userId).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    const stats = {
      completedClasses: student.completedClasses || 0,
      totalBookings: student.bookings?.length || 0,
      favoriteProfessorsCount: student.favoriteProfessors?.length || 0
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
 * Agregar una reserva simple (solo guarda el ID del profesor en bookings)
 */
const addBooking = async (req, res, next) => {
  try {
    const { professorId } = req.params;

    // Verificar que el profesor existe y está aprobado
    const professor = await Professor.findOne({ 
      _id: professorId, 
      approvalStatus: 'approved' 
    });
    
    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado o no aprobado'
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.userId,
      { $addToSet: { bookings: professorId } },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Reserva agregada exitosamente',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancelar una reserva
 */
const cancelBooking = async (req, res, next) => {
  try {
    const { professorId } = req.params;

    const student = await Student.findByIdAndUpdate(
      req.userId,
      { $pull: { bookings: professorId } },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Reserva cancelada',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentById,
  updateStudent,
  addFavoriteProfessor,
  removeFavoriteProfessor,
  getFavoriteProfessors,
  getBookedClasses,
  getStudentStats,
  addBooking,
  cancelBooking
};