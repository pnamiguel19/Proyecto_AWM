const { User, Professor, Student } = require('../models');
const { AppError } = require('../middlewares');

/**
 * Obtener todos los profesores (con filtros)
 */
const getAllProfessors = async (req, res, next) => {
  try {
    const {
      subject,
      educationLevel,
      modality,
      minRate,
      maxRate,
      minRating,
      search,
      page = 1,
      limit = 10
    } = req.query;

    // Construir filtros
    const filters = { isApproved: true };

    if (subject) filters.subjects = subject;
    if (educationLevel) filters.educationLevels = educationLevel;
    if (modality) filters.teachingModalities = modality;
    if (minRate || maxRate) {
      filters.hourlyRate = {};
      if (minRate) filters.hourlyRate.$gte = Number(minRate);
      if (maxRate) filters.hourlyRate.$lte = Number(maxRate);
    }
    if (minRating) filters.averageRating = { $gte: Number(minRating) };

    // Buscar profesores
    let query = Professor.find(filters).populate('userId', '-password');

    // Si hay búsqueda por texto, buscar en nombre
    if (search) {
      const users = await User.find({
        role: 'professor',
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');

      const userIds = users.map(u => u._id);
      filters.userId = { $in: userIds };
      query = Professor.find(filters).populate('userId', '-password');
    }

    // Paginación
    const skip = (page - 1) * limit;
    const professors = await query.skip(skip).limit(Number(limit));
    const total = await Professor.countDocuments(filters);

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
 * Obtener profesor por ID
 */
const getProfessorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const professor = await Professor.findById(id).populate('userId', '-password');

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: professor
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar perfil de profesor
 */
const updateProfessor = async (req, res, next) => {
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

    // Campos que no se pueden actualizar directamente
    const protectedFields = ['isApproved', 'approvalDate', 'averageRating', 'totalReviews', 'totalClassesTaught'];
    protectedFields.forEach(field => delete updates[field]);

    // Actualizar perfil de profesor
    const professor = await Professor.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('userId', '-password');

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Perfil de profesor actualizado exitosamente',
      data: professor
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar horario del profesor
 */
const updateSchedule = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { schedule } = req.body;

    const professor = await Professor.findOneAndUpdate(
      { userId },
      { $set: { schedule } },
      { new: true, runValidators: true }
    );

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Horario actualizado exitosamente',
      data: professor.schedule
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener horario del profesor
 */
const getSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;

    const professor = await Professor.findById(id);

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        schedule: professor.schedule,
        maxStudents: professor.maxStudents,
        reservationTime: professor.reservationTime
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener estadísticas del profesor
 */
const getProfessorStats = async (req, res, next) => {
  try {
    const userId = req.userId;

    const professor = await Professor.findOne({ userId });

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    const stats = {
      averageRating: professor.averageRating,
      totalReviews: professor.totalReviews,
      totalClassesTaught: professor.totalClassesTaught,
      totalHoursTaught: professor.totalHoursTaught,
      availableSlots: professor.getAvailableSlots(),
      availableDays: professor.getAvailableDays()
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
 * Agregar certificación adicional
 */
const addCertification = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Archivo de certificación requerido'
      });
    }

    const certification = {
      name,
      fileUrl: req.file.path
    };

    const professor = await Professor.findOneAndUpdate(
      { userId },
      { $push: { additionalCertifications: certification } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Certificación agregada exitosamente',
      data: professor.additionalCertifications
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProfessors,
  getProfessorById,
  updateProfessor,
  updateSchedule,
  getSchedule,
  getProfessorStats,
  addCertification
};