const express = require('express');
const {
  getFees,
  getFee,
  createFee,
  updateFee,
  deleteFee
} = require('../controllers/fees');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Proteger todas as rotas
router.use(protect);

// Rotas acessíveis para funções específicas
router.route('/')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getFees)
  .post(authorize('admin', 'director', 'financial'), createFee);

router.route('/:id')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getFee)
  .put(authorize('admin', 'director', 'financial'), updateFee)
  .delete(authorize('admin', 'director'), deleteFee);

module.exports = router;
