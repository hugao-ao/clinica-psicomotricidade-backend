const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Importar rotas
const auth = require('./routes/auth');
const patients = require('./routes/patients');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Habilitar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}) );

// Montar rotas
app.use('/api/auth', auth);
app.use('/api/patients', patients);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API da Clínica de Psicomotricidade RELACIONAL está funcionando');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Servidor rodando no modo ${process.env.NODE_ENV} na porta ${PORT}`)
);

// Lidar com rejeições de promessas não tratadas
process.on('unhandledRejection', (err, promise) => {
  console.log(`Erro: ${err.message}`);
  // Fechar servidor e sair do processo
  server.close(() => process.exit(1));
});
