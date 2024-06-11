const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserByToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(); // Se não houver token, continue sem definir o usuário em app.locals
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id).lean();
        if (user) {
            req.user = user; // Define o usuário em req.user para acesso fácil em controladores individuais
            res.locals.user = user; // Armazena o usuário em app.locals para acesso em toda a aplicação
        }
    } catch (error) {
        console.error('Erro ao obter usuário pelo token:', error);
    }

    next();
};

module.exports = getUserByToken;
