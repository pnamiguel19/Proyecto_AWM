const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authController = require('../controllers/auth.controller');

// ==================== CONFIGURAR MULTER SOLO PARA PROFESOR ====================
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Carpeta uploads creada');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB por archivo
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});

// ==================== RUTAS ====================

// Login (sin cambios)
router.post('/login', authController.login);

// Registro de estudiante (sin cambios)
router.post('/register/student', authController.registerStudent);

// ✅ ACTUALIZAR: Registro de profesor CON soporte para archivos
router.post(
  '/register/professor',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'degreeDocument', maxCount: 1 },
    { name: 'professionalIdDocument', maxCount: 1 },
    { name: 'certifications', maxCount: 5 }
  ]),
  (req, res, next) => {
    console.log('📥 Middleware multer ejecutado');
    console.log('📝 Body recibido:', Object.keys(req.body));
    console.log('📎 Files recibidos:', req.files ? Object.keys(req.files) : 'ninguno');
    next();
  },
  authController.registerProfessor
);

// Logout (sin cambios)
router.post('/logout', authController.logout);

module.exports = router;