const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecordsByPatient,
  getRecordsByTherapist,
  getRecordsByPeriod
} = require('../controllers/records');

router
  .route('/')
  .get(protect, getRecords)
  .post(protect, authorize('admin', 'director', 'therapist'), createRecord);

router
  .route('/:id')
  .get(protect, getRecord)
  .put(protect, authorize('admin', 'director', 'therapist'), updateRecord)
  .delete(protect, authorize('admin', 'director', 'therapist'), deleteRecord);

router.get('/patient/:patientId', protect, getRecordsByPatient);
router.get('/therapist/:therapistId', protect, getRecordsByTherapist);
router.get('/period', protect, getRecordsByPeriod);

module.exports = router;
