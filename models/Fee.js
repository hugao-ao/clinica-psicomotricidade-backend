const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, adicione um nome para o honorário']
  },
  description: String,
  amount: {
    type: Number,
    required: [true, 'Por favor, adicione um valor']
  },
  type: {
    type: String,
    enum: ['individual', 'group', 'evaluation', 'other'],
    default: 'individual'
  },
  duration: {
    type: Number,
    comment: 'Duração em minutos'
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Fee', FeeSchema);
