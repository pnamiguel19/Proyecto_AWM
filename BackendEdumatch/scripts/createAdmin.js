const mongoose = require('mongoose');
const { User, Admin } = require('../models');

const createAdmin = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect('mongodb://localhost/EdumatchDB');
    console.log('Conectado a MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ email: 'admin@edumatch.com' });
    if (existingAdmin) {
      console.log('El admin ya existe');
      process.exit(0);
    }

    // Crear usuario admin
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'EduMatch',
      email: 'admin@edumatch.com',
      password: 'Admin123!',
      phone: '+1111111111',
      birthDate: new Date('1990-01-01'),
      gender: 'not_say',
      address: 'EduMatch HQ',
      role: 'admin',
      isActive: true,
      isVerified: true
    });

    // Crear perfil de admin
    const admin = await Admin.create({
      userId: adminUser._id,
      permissions: {
        canApproveProfessors: true,
        canManageUsers: true,
        canManageClasses: true,
        canViewReports: true,
        canManageContent: true
      }
    });

    console.log('✅ Admin creado exitosamente');
    console.log('Email:', adminUser.email);
    console.log('Password: Admin123!');
    console.log('ID:', adminUser._id);

    if (pm.response.code === 200) {
      const jsonData = pm.response.json();
      pm.environment.set("token", jsonData.data.token);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error al crear admin:', error);
    process.exit(1);
  }
};

createAdmin();