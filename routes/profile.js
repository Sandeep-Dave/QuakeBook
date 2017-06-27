'use strict'
const router      = require('express').Router();
const jwt         = require('jsonwebtoken');
const ProfileRepo = require('../controllers/profile');


router.post('/login', checkForToken, verifyUser, (req, res, next) => {
  const repo    = new ProfileRepo();
  var username = req.body.username;
  var password = req.body.password;

  repo.login(decoded.sub.user_id)//TODO verify function sig
    .then((userInfo) => {
      res.send(userInfo);
      return;
    })
    .catch(err => {
      res.status(404).send(err);
      return;
    })
});


router.get('/', checkForToken, verifyUser, (req, res, next) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.query(decoded.sub.user_id)//TODO verify function sig
    .then((userInfo) => {
      res.send(userInfo);
      return;
    })
    .catch(err => {
      res.status(404).send(err);
      return;
    })
});

function checkForToken(req, res, next){
  if(req.cookies.token){
    next();
    return;
  }
  res.setHeader('Content-Type', 'text/plain');
  res.status(401).send('Unauthorized');
}

function verifyUser(req, res, next){
  jwt.verify(req.cookies.token,
      process.env.JWT_KEY, (err, decoded) => {
    if(decoded){
      next();
      return;
    }
    //GET 4F if no match return 401
    //GET3F  if no JWT .send -401
    res.setHeader('Content-Type', 'application/json');
    res.status(401).send('Unauthorized');
  });
}