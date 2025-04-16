const express = require('express');
const {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
  getFinancialSummary
} = require('../controllers/payments');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Proteger todas as rotas
router.use(protect);

// Rotas acessíveis para funções específicas
router.route('/')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getPayments)
  .post(authorize('admin', 'director', 'secretary', 'financial'), createPayment);

router.route('/:id')
  .get(authorize('admin', 'director', 'therapist', 'secretary', 'financial'), getPayment)
  .put(authorize('admin', 'director', 'secretary', 'financial'), updatePayment)
  .delete(authorize('admin', 'director', 'financial'), deletePayment);

router.route('/summary')
  .get(authorize('admin', 'director', 'financial'), getFinancialSummary);

module.exports = router;
