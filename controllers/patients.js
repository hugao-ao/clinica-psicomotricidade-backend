const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Patient = require('../models/Patient');

// @desc    Obter todos os pacientes
// @route   GET /api/patients
// @access  Private
exports.getPatients = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Obter um único paciente
// @route   GET /api/patients/:id
// @access  Private
exports.getPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(
      new ErrorResponse(`Paciente não encontrado com id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Criar novo paciente
// @route   POST /api/patients
// @access  Private
exports.createPatient = asyncHandler(async (req, res, next) => {
  // Adicionar usuário ao corpo da requisição
  req.body.user = req.user.id;

  const patient = await Patient.create(req.body);

  res.status(201).json({
    success: true,
    data: patient
  });
});

// @desc    Atualizar paciente
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = asyncHandler(async (req, res, next) => {
  let patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(
      new ErrorResponse(`Paciente não encontrado com id ${req.params.id}`, 404)
    );
  }

  patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Excluir paciente
// @route   DELETE /api/patients/:id
// @access  Private
exports.deletePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(
      new ErrorResponse(`Paciente não encontrado com id ${req.params.id}`, 404)
    );
  }

  await patient.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
