const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    User.find().then(data => res.json(data));
})

router.get('/info', (req, res) => {
    console.log('info user');
    User.findOne({ _id : req.body.userId })
        .then(data => {
            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json('No user with this id');
            }
        });
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
