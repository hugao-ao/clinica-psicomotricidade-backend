const express = require('express');
const { 
  register, 
  login, 
  logout, 
  getMe, 
  forgotPassword, 
  resetPassword, 
  updateDetails, 
  updatePassword 
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Rota de verificação de saúde
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API da Clínica de Psicomotricidade RELACIONAL está funcionando corretamente',
    timestamp: new Date(),
    environment: process.env.NODE_ENV
  });
});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
