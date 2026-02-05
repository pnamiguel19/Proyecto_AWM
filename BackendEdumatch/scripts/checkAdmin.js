require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/EdumatchDB');
    console.log('✅ Conectado a MongoDB');

    const admin = await User.findOne({ email: 'admin@edumatch.com' }).select('+password');
    
    if (admin) {
      console.log('\n📋 Admin encontrado:');
      console.log('   - ID:', admin._id);
      console.log('   - Email:', admin.email);
      console.log('   - Role:', admin.role);
      console.log('   - Active:', admin.isActive);
      console.log('   - Verified:', admin.isVerified);
      console.log('   - Password hash:', admin.password ? 'Existe' : 'NO existe');
      
      // Probar comparación de password
      const bcrypt = require('bcrypt');
      const isMatch = await bcrypt.compare('Admin123!', admin.password);
      console.log('   - Password válido:', isMatch ? '✅ SÍ' : '❌ NO');
      
      // Probar con el método del modelo
      const isMatchMethod = await admin.comparePassword('Admin123!');
      console.log('   - Password (método):', isMatchMethod ? '✅ SÍ' : '❌ NO');
    } else {
      console.log('❌ Admin NO encontrado en la base de datos');
      console.log('📝 Ejecuta: node scripts/createAdmin.js');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkAdmin();
