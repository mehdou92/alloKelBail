const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    User.find().then(data => res.json(data));
})


router.post('/', (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(data => res.status(201).json(data))
    .catch(
        error => {
            if(error.name === "ValidationError") {
                res.status(400).json(error.errors);
            } else {
                res.sendStatus(500);
            }
        }
    )
})


module.exports = router;
