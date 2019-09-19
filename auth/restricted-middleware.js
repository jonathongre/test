const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      // console.log(decodedToken)
      if(err) {
        res.status(401).json({ message: 'Invalid Credentials.' });
      } else {
        req.user = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({message: 'Please Login.'})
  }
};