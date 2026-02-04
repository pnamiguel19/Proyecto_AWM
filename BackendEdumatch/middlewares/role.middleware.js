/**
 * Middleware para verificar roles de usuario
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // Verificar que el usuario esté autenticado
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    // Verificar si el rol del usuario está en los roles permitidos
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para realizar esta acción',
        requiredRoles: roles,
        userRole: req.user.role
      });
    }

    next();
  };
};

/**
 * Middleware para verificar que el usuario sea estudiante
 */
const isStudent = (req, res, next) => {
  return authorize('student')(req, res, next);
};

/**
 * Middleware para verificar que el usuario sea profesor
 */
const isProfessor = (req, res, next) => {
  return authorize('professor')(req, res, next);
};

/**
 * Middleware para verificar que el usuario sea admin
 */
const isAdmin = (req, res, next) => {
  return authorize('admin')(req, res, next);
};

/**
 * Middleware para verificar que el usuario sea profesor o admin
 */
const isProfessorOrAdmin = (req, res, next) => {
  return authorize('professor', 'admin')(req, res, next);
};

/**
 * Middleware para verificar que el usuario accede a su propio recurso
 */
const isOwner = (paramName = 'id') => {
  return (req, res, next) => {
    const resourceId = req.params[paramName];
    const userId = req.userId.toString();

    // Admin puede acceder a cualquier recurso
    if (req.userRole === 'admin') {
      return next();
    }

    // Verificar si el usuario es dueño del recurso
    if (resourceId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para acceder a este recurso'
      });
    }

    next();
  };
};

/**
 * Middleware para verificar que el usuario sea dueño o admin
 */
const isOwnerOrAdmin = (paramName = 'id') => {
  return (req, res, next) => {
    const resourceId = req.params[paramName];
    const userId = req.userId.toString();

    // Admin puede acceder a cualquier recurso
    if (req.userRole === 'admin') {
      return next();
    }

    // Verificar si el usuario es dueño del recurso
    if (resourceId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para acceder a este recurso'
      });
    }

    next();
  };
};

module.exports = {
  authorize,
  isStudent,
  isProfessor,
  isAdmin,
  isProfessorOrAdmin,
  isOwner,
  isOwnerOrAdmin
};