const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
        if (err) {
          // JWT verification failed
          console.error('JWT verification failed:', err.message);
          return res.status(401).json({ error: 'Unauthorized' });
        } else {
          // JWT verification successful
          console.log('JWT verified successfully:', decoded);
    
          // Attach the user ID to the request object for use in subsequent middleware or routes
          req.userId = decoded.email;
    
          // Continue to the next middleware or route
          next();
        }
      });
           
};