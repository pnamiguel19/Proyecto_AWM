const { User, Student, Professor } = require('../models');
const { AppError } = require('../middlewares');

/**
 * Obtener perfil de estudiante por ID
 */
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({ userId: id }).populate('userId', '-password');

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
    const userId = req.userId;
    const updates = req.body;

    // Actualizar información del usuario base si está incluida
    if (updates.firstName || updates.lastName || updates.phone || updates.address || updates.birthDate || updates.gender) {
      await User.findByIdAndUpdate(userId, {
        ...(updates.firstName && { firstName: updates.firstName }),
        ...(updates.lastName && { lastName: updates.lastName }),
        ...(updates.phone && { phone: updates.phone }),
        ...(updates.address && { address: updates.address }),
        ...(updates.birthDate && { birthDate: updates.birthDate }),
        ...(updates.gender && { gender: updates.gender })
      });
    }

    // Actualizar perfil de estudiante
    const studentUpdates = {
      ...(updates.educationLevel && { educationLevel: updates.educationLevel }),
      ...(updates.aboutMe && { aboutMe: updates.aboutMe }),
      ...(updates.learningGoals && { learningGoals: updates.learningGoals }),
      ...(updates.subjectsOfInterest && { subjectsOfInterest: updates.subjectsOfInterest })
    };

    const student = await Student.findOneAndUpdate(
      { userId },
      { $set: studentUpdates },
      { new: true, runValidators: true }
    ).populate('userId', '-password');

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
    const student = await Student.findOneAndUpdate(
      { userId },
      { $addToSet: { favoriteProfessors: professorId } },
      { new: true }
    );

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
    const userId = req.userId;
    const { professorId } = req.params;

    const student = await Student.findOneAndUpdate(
      { userId },
      { $pull: { favoriteProfessors: professorId } },
      { new: true }
    );

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
    const userId = req.userId;

    const student = await Student.findOne({ userId })
      .populate({
        path: 'favoriteProfessors',
        populate: {
          path: 'userId',
          select: '-password'
        }
      });

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
    const userId = req.userId;

    const student = await Student.findOne({ userId })
      .populate({
        path: 'bookedClasses',
        populate: {
          path: 'professorId',
          populate: { path: 'userId', select: '-password' }
        }
      });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: student.bookedClasses
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
    const userId = req.userId;

    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    const stats = {
      totalClassesAttended: student.totalClassesAttended,
      totalHoursLearned: student.totalHoursLearned,
      favoriteProfessorsCount: student.favoriteProfessors.length,
      reviewsCount: student.reviews.length
    };

    res.status(200).json({
      success: true,
      data: stats
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
  getStudentStats
};