const express = require('express');
const Movie = require('../models/movie');
const Comment = require('../models/comment');
const router = express.Router();

router.get('/', (req, res) => {
    Movie.find().then(data => res.json(data));
});

router.get('/id/:id', (req, res) => {
    Movie.findOne({ imdbID: req.params.id })
        .then(data => {
            if (data === null) {
                res.status(400).json(`No movie find for the id : ${req.params.id}`);
            } else {
                res.status(200).json(data);
            }
        })
        .catch(error => res.status(500).json(error));
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
    console.log('Movie id comments : ', req.params.id);
    Comment.find({ MovieId: req.params.id })
        .then(data => {
            if (data.length) {
                res.status(200).json(data);
            } else {
                res.status(404).json('No comments find for the movie');
            }
        })
        .catch(error => res.status(500).json(error));
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


//elk feature

// router.get('/search/', (req, res) => {
//     if (req.query.q) {
//         Movie.search(
//             { query_string: { query: req.query.q } },
//             { hydrate: true },
//             function (err, results) {
//                 if (results) {
//                     res.status(200).json(results.hits)
//                 } else {
//                     res.status(500).json(er)
//                 }
//                 console.log('result ', results.hits);
//                 console.log('ERR ', err);
//                 // results here
//             });
//     } else {
//         Movie.esSearch(
//             {
//                 query: {
//                     bool: {
//                         must: [
//                             {
//                                 query_string: {
//                                     fields: ["Title", "Year", "Genre"],
//                                     query: `${req.query.title} AND ${req.query.year} AND ${req.query.genre}`
//                                 }
//                             },
//                             {
//                                 range: {
//                                     imdbRating: {
//                                         gte: req.query.rating
//                                     }
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             },
//             function (err, results) {
//                 if (results) {
//                     res.status(200).json(results.hits)
//                 } else {
//                     res.status(500).json(err)
//                 }
//                 console.log('result ', results.hits);
//                 console.log('ERR ', err);
//                 // results here
//             });
//     }
// });

module.exports = router;