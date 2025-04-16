const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, adicione um nome']
  },
  email: {
    type: String,
    required: [true, 'Por favor, adicione um email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, adicione um email válido'
    ]
  },
  phone: {
    type: String
  },
  birthDate: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  therapist: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  notes: String,
  medicalInfo: {
    conditions: String,
    medications: String,
    allergies: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para popular o terapeuta
PatientSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'therapist',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Patient', PatientSchema);
