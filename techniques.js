const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  getTechniques,
  getTechnique,
  createTechnique,
  updateTechnique,
  deleteTechnique,
  getTechniquesByCategory,
  getTechniquesByAge
} = require('../controllers/techniques');

router
  .route('/')
  .get(protect, getTechniques)
  .post(protect, authorize('admin', 'director', 'therapist'), createTechnique);

router
  .route('/:id')
  .get(protect, getTechnique)
  .put(protect, authorize('admin', 'director', 'therapist'), updateTechnique)
  .delete(protect, authorize('admin', 'director', 'therapist'), deleteTechnique);

router.get('/category/:category', protect, getTechniquesByCategory);
router.get('/age/:age', protect, getTechniquesByAge);

module.exports = router;
