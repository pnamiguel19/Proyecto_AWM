const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    // Referencia al usuario base
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    // Permisos y roles específicos
    permissions: {
      canApproveProfessors: {
        type: Boolean,
        default: true
      },
      canManageUsers: {
        type: Boolean,
        default: true
      },
      canManageClasses: {
        type: Boolean,
        default: true
      },
      canViewReports: {
        type: Boolean,
        default: true
      },
      canManageContent: {
        type: Boolean,
        default: true
      }
    },

    // Actividad del administrador
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0
    },

    // Acciones realizadas
    actionsLog: [{
      action: String,
      targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      description: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para obtener información completa del usuario
adminSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Método para registrar una acción
adminSchema.methods.logAction = function (action, targetUser, description) {
  this.actionsLog.push({
    action,
    targetUser,
    description,
    timestamp: new Date()
  });
  return this.save();
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;