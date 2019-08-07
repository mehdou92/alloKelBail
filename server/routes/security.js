const express = require('express');
const createToken = require('../lib/auth.js').createToken;
const verifyToken = require('../lib/auth.js').verifyToken;
const User = require('../models/user');

const router = express.Router();

router.post('/login_check', (req, res) => {
  //console.log(User.login(req.body.email,req.body.password));

  User.login(req.body.email,req.body.password).then(async () =>
  {

    const user = await User.getUser(req.body.email);

    const token = createToken({
      userId: user._id, //change for firstname lastname of the real user
    });
    res.status(201).send({token});
  })
    .catch(error => res.status(400).json({error : 'Invalids Credentials'}));
});

router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.register().then(data => res.status(200).json(data))
    .catch(error => {
      if(error.name === "ValidationError") {
        res.status(400).json(error.errors);
      } else {
        res.sendStatus(400);
      }
    });
});

module.exports = router;