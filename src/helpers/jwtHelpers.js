const jwt = require("jsonwebtoken");
const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(paylaod, secret, {expiresIn});
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {generateToken, verifyToken};