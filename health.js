// Adicionar rota de verificação de saúde para monitoramento do Render
const express = require('express');
const router = express.Router();

// @desc    Verificar saúde da API
// @route   GET /api/auth/health
// @access  Public
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API da Clínica de Psicomotricidade RELACIONAL está funcionando corretamente',
    timestamp: new Date(),
    environment: process.env.NODE_ENV
  });
});

module.exports = router;
