const { validationResult } = require('express-validator');

/**
 * Middleware para validar los resultados de express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = {};
    errors.array().forEach(err => {
      extractedErrors[err.path] = err.msg;
    });

    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: extractedErrors
    });
  }

  next();
};

/**
 * Middleware para validar que los campos requeridos existan
 */
const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missingFields = [];

    fields.forEach(field => {
      if (!req.body[field] && req.body[field] !== false && req.body[field] !== 0) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Campos requeridos faltantes',
        missingFields
      });
    }

    next();
  };
};

/**
 * Middleware para validar ObjectId de MongoDB
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const mongoose = require('mongoose');
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `ID inválido: ${id}`
      });
    }

    next();
  };
};

/**
 * Middleware para sanitizar entrada del usuario
 */
const sanitizeInput = (req, res, next) => {
  // Eliminar campos sensibles que no deberían ser modificados directamente
  const protectedFields = ['password', 'role', 'isVerified', 'isActive'];

  protectedFields.forEach(field => {
    if (req.body[field]) {
      delete req.body[field];
    }
  });

  next();
};

module.exports = {
  validate,
  validateRequiredFields,
  validateObjectId,
  sanitizeInput
};