const express = require('express');
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patients');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Proteger todas as rotas
router.use(protect);

// Rotas acessíveis para todos os usuários autenticados, exceto pacientes
router.route('/')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getPatients)
  .post(authorize('admin', 'director', 'therapist', 'secretary'), createPatient);

router.route('/:id')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getPatient)
  .put(authorize('admin', 'director', 'therapist', 'secretary'), updatePatient)
  .delete(authorize('admin', 'director'), deletePatient);

module.exports = router;
