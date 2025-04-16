const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointments');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Proteger todas as rotas
router.use(protect);

// Rotas acessíveis para todos os usuários autenticados, exceto pacientes
router.route('/')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getAppointments)
  .post(authorize('admin', 'director', 'therapist', 'secretary'), createAppointment);

router.route('/:id')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getAppointment)
  .put(authorize('admin', 'director', 'therapist', 'secretary'), updateAppointment)
  .delete(authorize('admin', 'director', 'therapist', 'secretary'), deleteAppointment);

module.exports = router;
