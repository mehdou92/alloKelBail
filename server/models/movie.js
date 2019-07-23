const db = require('../lib/db');
const mongoose = require('mongoose');
const mongoostatic = require('mongoosastic');

const MovieSchema = new mongoose.Schema({
    Title: String,
    Year: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Plot: String,
    Language: String,
    Poster: String,
    Ratings: {
        Source: String,
        Value: String
    },
    imdbRating: String,
    imdbVotes: String,
});

MovieSchema.pre('save', function (next) {
    console.log('Saving...' + this.title);
    next();
});

MovieSchema.post('save', function (doc) {
    console.log(doc.title + ' is saved!');
});

// elk search

// MovieSchema.plugin(mongoostatic, {
//     "host": "elasticsearch",
//     "port": 9200
// });

const Movie = db.model('Movie', MovieSchema);

module.exports = Movie; //movies