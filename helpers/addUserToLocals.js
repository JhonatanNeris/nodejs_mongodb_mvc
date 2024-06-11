const User = require('../models/User');

const addUserToLocals = async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findById(req.user.id).lean();
      if (user) {
        res.locals.user = user;
      }
    } catch (err) {
      console.error('Erro ao buscar usuário no banco de dados:', err);
    }
  }
  next();
};

module.exports = addUserToLocals;
