const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Por favor, informe o paciente']
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Por favor, informe o terapeuta']
  },
  sessionDate: {
    type: Date,
    required: [true, 'Por favor, informe a data da sessão'],
    default: Date.now
  },
  sessionType: {
    type: String,
    enum: ['individual', 'group'],
    required: [true, 'Por favor, informe o tipo de sessão']
  },
  location: {
    type: String,
    enum: ['main_hall', 'director_room', 'additional_room', 'sublet_room_1', 'sublet_room_2', 'sublet_room_3'],
    required: [true, 'Por favor, informe o local da sessão']
  },
  evaluation: {
    motorCoordination: String,
    bodyScheme: String,
    spatialOrganization: String,
    temporalOrganization: String,
    laterality: String,
    relationalAspects: String
  },
  activities: [{
    technique: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Technique'
    },
    description: String,
    outcome: String
  }],
  observations: String,
  goals: String,
  nextSessionPlan: String,
  attachments: [String], // URLs para Cloudinary
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar o campo updatedAt antes de salvar
RecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Record', RecordSchema);
