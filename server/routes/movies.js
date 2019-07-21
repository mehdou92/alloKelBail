const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

router.get('/', (req, res) => {
    Movie.find().then(data => res.json(data));
});

router.get('/id/:id', (req, res) => {
    console.log('MOVIE BY ID : ',req.params.id);
    Movie.findOne({ imdbID: req.params.id}).then(data => res.json(data));
});

router.get('/search/', (req, res) => {
    console.log('get movie by search : ', req.query.q);
    Movie.search(
    {query_string: {query: req.query.q}},
    {hydrate: true},
    function(err, results) {
        if(results){
            res.status(200).json(results.hits)
        } else {
            res.status(500).json(er)
        }
        console.log('result ', results.hits);
        console.log('ERR ', err);
      // results here

  });
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

module.exports = router;