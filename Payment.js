const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'Por favor, adicione um paciente']
  },
  amount: {
    type: Number,
    required: [true, 'Por favor, adicione um valor']
  },
  method: {
    type: String,
    enum: ['pix', 'credit', 'debit', 'cash', 'transfer'],
    default: 'pix'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  period: {
    month: {
      type: String,
      match: [/^(0[1-9]|1[0-2])$/, 'Mês deve estar no formato MM (01-12)']
    },
    year: {
      type: String,
      match: [/^[0-9]{4}$/, 'Ano deve estar no formato YYYY']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  description: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

// Middleware para popular o paciente
PaymentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'patient',
    select: 'name email phone'
  });
  next();
});

module.exports = mongoose.model('Payment', PaymentSchema);
