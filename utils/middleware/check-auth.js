const jwt = require('jsonwebtoken');

const JWT_KEY = process.env['JWT_KEY'];

exports.checkAuth = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    req.userData = {email: decodedToken.email, id: decodedToken.id};
  } catch (error) {
    req.userData = null;
  }
  return req;
};
