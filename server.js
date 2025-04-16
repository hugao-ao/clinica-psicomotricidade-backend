// Atualização do servidor para incluir rotas financeiras
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Rotas
const auth = require('./routes/auth');
const patients = require('./routes/patients');
const appointments = require('./routes/appointments');
const payments = require('./routes/payments');
const fees = require('./routes/fees');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Habilitar CORS
app.use(cors());

// Montar rotas
app.use('/api/auth', auth);
app.use('/api/patients', patients);
app.use('/api/appointments', appointments);
app.use('/api/payments', payments);
app.use('/api/fees', fees);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Lidar com rejeições de promessas não tratadas
process.on('unhandledRejection', (err, promise) => {
  console.log(`Erro: ${err.message}`);
  // Fechar servidor e sair do processo
  server.close(() => process.exit(1));
});
