const jwt = require('jsonwebtoken')

module.exports = {
  checkForToken: function (req, res, next){
    if(req.cookies.token){
      next();
      return;
    }
    res.setHeader('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  },
  verifyUser: function (req, res, next){
    jwt.verify(req.cookies.token,
        process.env.JWT_KEY, (err, decoded) => {
      if(decoded){
        next();
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(401).send('Unauthorized');
    });
  }
}
