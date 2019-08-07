const express = require('express');
const User = require('../models/user');
const router = express.Router();
const verifyToken = require('../lib/auth.js').verifyToken;

router.get('/', (req, res) => {
    User.find().then(data => res.json(data));
})

router.get('/info', (req, res) => {
    console.log('info user');

    let token = req.body.token;
    token = token.replace('Bearer ', '');

     const tmp = async () => {
        const result = await verifyToken(token).then(values => {
            const resultToken = values.userId;
            return resultToken;
         })
         return result;
     }

     tmp().then(values => {
        User.findOne({ _id : values })
        .then(data => {
            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json('No user with this id');
            }
        });
     }) 
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
