const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'Por favor, adicione um paciente']
  },
  therapist: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Por favor, adicione um terapeuta']
  },
  date: {
    type: Date,
    required: [true, 'Por favor, adicione uma data']
  },
  startTime: {
    type: String,
    required: [true, 'Por favor, adicione um horário de início']
  },
  endTime: {
    type: String,
    required: [true, 'Por favor, adicione um horário de término']
  },
  type: {
    type: String,
    enum: ['individual', 'group'],
    default: 'individual'
  },
  location: {
    type: String,
    enum: ['main_hall', 'room1', 'room2', 'room3', 'room4', 'room5'],
    required: [true, 'Por favor, adicione um local']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'missed'],
    default: 'scheduled'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para popular o paciente e o terapeuta
AppointmentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'patient',
    select: 'name email phone'
  }).populate({
    path: 'therapist',
    select: 'name email'
  });
  next();
});

// Middleware para validar que atendimentos em grupo só podem ocorrer no salão principal
AppointmentSchema.pre('save', function(next) {
  if (this.type === 'group' && this.location !== 'main_hall') {
    const error = new Error('Atendimentos em grupo só podem ocorrer no salão principal');
    return next(error);
  }
  next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
