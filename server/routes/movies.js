const express = require('express');
const Movie = require('../models/movie');
const Comment = require('../models/comment');
const router = express.Router();

router.get('/', (req, res) => {
    Movie.find().then(data => res.json(data));
});

router.get('/id/:id', (req, res) => {
    console.log('MOVIE BY ID : ', req.params.id);
    Movie.findOne({ imdbID: req.params.id }).then(data => res.json(data));
});

router.get('/search/', (req, res) => {
    console.log('get movie by search : ', req.query.q);
    console.log('query ', req.query);

    if (req.query.q) {
        
        console.log('request full text');

        Movie.search(
            { query_string: { query: req.query.q } },
            { hydrate: true },
            function (err, results) {
                if (results) {
                    res.status(200).json(results.hits)
                } else {
                    res.status(500).json(er)
                }
                console.log('result ', results.hits);
                console.log('ERR ', err);
                // results here
            });
    } else {

        console.log('request with arg');

        Movie.esSearch(
            {
                query: {
                    bool: {
                        must: [
                            {
                                query_string: {
                                    fields: ["Title", "Year", "Genre"],
                                    query: `${req.query.title} AND ${req.query.year} AND ${req.query.genre}`
                                }
                            },
                            {
                                range: {
                                    imdbRating: {
                                        gte: req.query.rating
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            function (err, results) {
                if (results) {
                    res.status(200).json(results.hits)
                } else {
                    res.status(500).json(err)
                }
                console.log('result ', results.hits);
                console.log('ERR ', err);
                // results here
            });
    }



    
    //   {
    // "query": {
    //   "query_string": {
    //     "fields": ["Title", "Year", "Genre"],
    //     "query": "Avengers AND 2018 AND Action"
    //   }
    // }
    //   }

    //     GET movies/_search
    // {
    //   "query": {
    //     "bool": {
    //       "must": [
    //         {
    //           "query_string": {
    //             "fields": ["Title", "Year", "Genre"],
    //             "query": "Avengers AND 2018 AND Action"
    //           }
    //         },
    //         {
    //           "range": {
    //             "imdbRating": {
    //             "gte": 7
    //             }
    //           }
    //         }
    //       ]
    //     }
    //   }
    // }

    // GET _search
    // {
    //     "query": {
    //         "range" : {
    //             "age" : {
    //                 "gte" : 10,
    //                 "lte" : 20,
    //                 "boost" : 2.0
    //             }
    //         }
    //     }
    // }
});

router.post('/', (req, res) => {
    const movie = new Movie(req.body);
    movie.save()
        .then(data => res.status(201).json(data))
        .catch(
            error => {
                if (error.name === "ValidationError") {
                    res.status(400).json(error.errors);
                } else {
                    res.sendStatus(500);
                }
            }
        )
});

router.get('/:id/comments', (req, res) => {
    console.log('MOVIE BY ID : ', req.params.id);
    Comment.find({ MovieId: req.params.id }).then(data => {
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
                if (error.name === "ValidationError") {
                    res.status(400).json(error.errors);
                } else {
                    res.sendStatus(500);
                }
            }
        )
});

module.exports = router;