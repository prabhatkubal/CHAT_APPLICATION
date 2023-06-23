// Middleware function to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      // Store the decoded user information in the request object
      req.user = decoded;
  
      next();
    });
  };

  module.exports = { verifyToken };