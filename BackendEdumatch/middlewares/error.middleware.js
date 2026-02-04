/**
 * Middleware para manejar errores de Mongoose (duplicados, validación, etc.)
 */
const handleMongooseError = (err) => {
  let errors = {};

  // Error de validación
  if (err.name === 'ValidationError') {
    Object.keys(err.errors).forEach(key => {
      errors[key] = err.errors[key].message;
    });
    return {
      status: 400,
      message: 'Error de validación',
      errors
    };
  }

  // Error de clave duplicada
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    errors[field] = `Este ${field} ya está registrado`;
    return {
      status: 409,
      message: 'Registro duplicado',
      errors
    };
  }

  // Error de cast (ID inválido)
  if (err.name === 'CastError') {
    return {
      status: 400,
      message: 'ID inválido',
      errors: { [err.path]: 'Formato de ID inválido' }
    };
  }

  return null;
};

/**
 * Middleware principal para manejo de errores
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Intentar manejar errores de Mongoose
  const mongooseError = handleMongooseError(err);
  if (mongooseError) {
    return res.status(mongooseError.status).json({
      success: false,
      message: mongooseError.message,
      errors: mongooseError.errors
    });
  }

  // Error personalizado con statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors })
    });
  }

  // Error 404 - No encontrado
  if (err.status === 404) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Recurso no encontrado'
    });
  }

  // Error genérico del servidor
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
};

/**
 * Middleware para rutas no encontradas (404)
 */
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

/**
 * Clase para errores personalizados
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  notFound,
  AppError
};