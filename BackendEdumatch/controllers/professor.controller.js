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
    const filters = { approvalStatus: 'approved' };

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
    let query = Professor.find(filters).select('-password');

    // Si hay búsqueda por texto, buscar en nombre
    if (search) {
      filters.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
      query = Professor.find(filters).select('-password');
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

    const professor = await Professor.findById(id).select('-password');

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
    const updates = req.body;

    // Campos que no se pueden actualizar directamente
    const protectedFields = ['approvalStatus', 'rating', 'totalClasses'];
    protectedFields.forEach(field => delete updates[field]);

    // Actualizar perfil de profesor
    const professor = await Professor.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

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
    const { schedule } = req.body;

    const professor = await Professor.findByIdAndUpdate(
      req.userId,
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
    const professor = await Professor.findById(req.userId);

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    const stats = {
      rating: professor.rating || { average: 0, count: 0 },
      totalClasses: professor.totalClasses || 0,
      approvalStatus: professor.approvalStatus,
      subjects: professor.subjects || [],
      educationLevels: professor.educationLevels || [],
      hourlyRate: professor.hourlyRate,
      maxStudentsPerClass: professor.maxStudentsPerClass
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
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Archivo de certificación requerido'
      });
    }

    const certification = {
      name,
      url: req.file.path
    };

    const professor = await Professor.findByIdAndUpdate(
      req.userId,
      { $push: { certifications: certification } },
      { new: true }
    );

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certificación agregada exitosamente',
      data: professor.certifications
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