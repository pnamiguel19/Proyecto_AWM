const jwt = require('jsonwebtoken');
const { User, Student, Professor } = require('../models');

// Secreto JWT (moverlo a variables de entorno después)
const JWT_SECRET = process.env.JWT_SECRET || 'edumatch_secret_key_2024';

/**
 * Middleware para verificar el token JWT
 */
const authenticate = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token de autenticación'
      });
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Buscar el usuario en todas las colecciones
    let user = await User.findById(decoded.userId);
    
    if (!user) {
      user = await Student.findById(decoded.userId);
    }
    
    if (!user) {
      user = await Professor.findById(decoded.userId);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Cuenta desactivada'
      });
    }

    // Agregar el usuario al request
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Error en la autenticación',
      error: error.message
    });
  }
};

/**
 * Mid
      let user = await User.findById(decoded.userId);
      
      if (!user) {
        user = await Student.findById(decoded.userId);
      }
      
      if (!user) {
        user = await Professor.findById(decoded.userId);
      }ación
 */
const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id;
        req.userRole = user.role;
      }
    }

    next();
  } catch (error) {
    // Si falla, simplemente continuar sin autenticación
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuthenticate,
  JWT_SECRET
};