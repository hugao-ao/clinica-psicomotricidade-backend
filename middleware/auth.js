const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Proteger rotas
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extrair token do Bearer
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Verificar se o token existe
  if (!token) {
    return next(new ErrorResponse('Não autorizado para acessar esta rota', 401));
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Não autorizado para acessar esta rota', 401));
  }
};

// Conceder acesso a funções específicas
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Usuário com função ${req.user.role} não está autorizado a acessar esta rota`,
          403
        )
      );
    }
    next();
  };
};
