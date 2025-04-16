const mongoose = require('mongoose');

const TechniqueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, informe o nome da técnica'],
    unique: true
  },
  category: {
    type: String,
    enum: ['motor', 'relational', 'cognitive', 'sensory', 'emotional', 'other'],
    required: [true, 'Por favor, informe a categoria']
  },
  description: {
    type: String,
    required: [true, 'Por favor, forneça uma descrição da técnica']
  },
  objectives: {
    type: [String],
    required: [true, 'Por favor, informe os objetivos da técnica']
  },
  ageRange: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 99
    }
  },
  materials: [String],
  procedure: {
    type: String,
    required: [true, 'Por favor, descreva o procedimento da técnica']
  },
  variations: [String],
  contraindications: [String],
  imageUrl: String, // URL para Cloudinary
  videoUrl: String, // URL para Cloudinary
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
TechniqueSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Technique', TechniqueSchema);
