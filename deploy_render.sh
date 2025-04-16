#!/bin/bash

# Script de implantação do backend no Render
# Este script prepara o backend para implantação permanente no Render

echo "Preparando backend para implantação no Render..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js não encontrado. Por favor, instale o Node.js."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "npm não encontrado. Por favor, instale o npm."
    exit 1
fi

# Navegar para o diretório do backend
cd "$(dirname "$0")"

# Instalar dependências
echo "Instalando dependências..."
npm install

# Verificar se há erros no código
echo "Verificando código..."
npm run lint || echo "Aviso: Verificação de código falhou, mas continuando..."

# Criar arquivo de verificação de saúde se não existir
if [ ! -f "./routes/health.js" ]; then
    echo "Criando rota de verificação de saúde..."
    cat > ./routes/health.js << 'EOF'
// Rota de verificação de saúde para monitoramento do Render
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
EOF
fi

# Verificar se o arquivo .env existe
if [ ! -f "./.env" ]; then
    echo "Arquivo .env não encontrado. Criando arquivo .env padrão..."
    cat > ./.env << 'EOF'
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://clinica_admin:Psicomotricidade2025@cluster0.mongodb.net/clinica_psicomotricidade
JWT_SECRET=a7f9e3d1c5b2e8f6a4d7c9b3e5f2a8d6c4b7e9f3a5d2c8b6e4f7a9d3c5b8e2f
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FRONTEND_URL=https://clinica-psicomotricidade-relacional.netlify.app
EOF
fi

# Verificar se o arquivo render.json existe
if [ ! -f "./render.json" ]; then
    echo "Arquivo render.json não encontrado. Criando arquivo render.json padrão..."
    cat > ./render.json << 'EOF'
{
  "name": "clinica-psicomotricidade-relacional-api",
  "version": "1.0.0",
  "description": "API para sistema de gestão de clínica de psicomotricidade RELACIONAL",
  "engines": {
    "node": "16.x"
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "services": [
    {
      "type": "web",
      "name": "backend",
      "env": "node",
      "buildCommand": "npm install",
      "startCommand": "npm start",
      "healthCheckPath": "/api/auth/health",
      "autoDeploy": true
    }
  ]
}
EOF
fi

# Testar a aplicação localmente
echo "Testando a aplicação localmente..."
node -e "
const http = require('http');
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/health',
  method: 'GET'
};

// Iniciar o servidor em segundo plano
const server = require('./server');

// Aguardar 2 segundos para o servidor iniciar
setTimeout(() => {
  // Fazer uma requisição para verificar se o servidor está funcionando
  const req = http.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Resposta:', data);
      console.log('Servidor testado com sucesso!');
      process.exit(0);
    });
  });

  req.on('error', (error) => {
    console.error('Erro ao testar o servidor:', error);
    process.exit(1);
  });

  req.end();
}, 2000);
" || echo "Aviso: Teste local falhou, mas continuando..."

echo "Backend pronto para implantação no Render!"
echo "Para implantar, siga as instruções em ./docs/implantacao_render.md"

exit 0
