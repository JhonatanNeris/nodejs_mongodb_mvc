const jwt = require("jsonwebtoken");

// middleware to validate token
const checkToken = (req, res, next) => {
  //const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];

  const token = req.cookies.token;

  console.log('Token:', token); // Adicione este log para verificar se o token está presente

  if (!token) {
    // return res.status(401).json({ msg: 'Acesso negado!' });
    return res.redirect("/users/signin");
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido:', err); // Adicione este log para verificar se o token é inválido
      res.clearCookie("token");
      // res.status(403).json({ msg: 'Token inválido!' });
      return res.redirect("/users/signin")
      // return res.status(403).json({ msg: 'Token inválido!' });
    }
    req.user = user;
    console.log("Usuário: ",user)
    next();
  });
};


module.exports = checkToken;