const jwt = require('jsonwebtoken');

const authenticateJWT = () => async (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    const verifiedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log('THIS TOKEN HAS BEEN VERIFIED', verifiedToken);
    req.user = verifiedToken;

    next();
  } catch (err) {
    console.log(err);
    return res.json({ message: 'JWT expired' });
  }
};

module.exports = authenticateJWT;
