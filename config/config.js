// Configuração para implantação
require('dotenv').config();

module.exports = {
  // Configurações do MongoDB
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://clinica_user:clinica_password@cluster0.mongodb.net/clinica_psicomotricidade',
  
  // Configurações do JWT
  jwtSecret: process.env.JWT_SECRET || 'clinica_jwt_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  jwtCookieExpire: process.env.JWT_COOKIE_EXPIRE || 30,
  
  // Configurações do servidor
  port: process.env.PORT || 5000,
  
  // Configurações de ambiente
  nodeEnv: process.env.NODE_ENV || 'production',
  
  // URL do frontend para CORS
  frontendURL: process.env.FRONTEND_URL || 'https://clinica-psicomotricidade.netlify.app'
};
