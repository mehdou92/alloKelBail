const express = require('express');
const Movie = require('../models/movie');
const Comment = require('../models/comment');
const router = express.Router();

router.get('/', (req, res) => {
    Movie.find().then(data => res.json(data));
});

router.get('/:id', (req, res) => {
    console.log('MOVIE BY ID : ',req.params.id);
    Movie.findOne({ imdbID: req.params.id}).then(data => res.json(data));
});

router.post('/', (req, res) => {
    const movie = new Movie(req.body);
    movie.save()
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
});

router.get('/:id/comments', (req, res) => {
    console.log('MOVIE BY ID : ',req.params.id);
    Comment.find({MovieId: req.params.id}).then(data => {
        console.log('data : ', data);
        res.json(data)
    });
});

router.post('/:id/comments', (req, res) => {
    console.log('request :  ', req.body);
    const comment = new Comment(req.body);
    comment.save()
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
});

module.exports = router;