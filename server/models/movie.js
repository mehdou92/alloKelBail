const db = require('../lib/db');
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    Title: String,
    Year: String,
    Released: String,
    Runtime: String,
    Genre: String,
    // genre: {
    //     type: [String],
    //     enum: ["Action",
    //         "Adventure",
    //         "Animation",
    //         "Biography",
    //         "Comedy",
    //         "Crime",
    //         "Documentary",
    //         "Drama",
    //         "Family",
    //         "Fantasy",
    //         "Film Noir",
    //         "Game-Show",
    //         "History",
    //         "Horror",
    //         "Musical",
    //         "Music",
    //         "Mystery",
    //         "News",
    //         "Reality-TV",
    //         "Romance",
    //         "Sci-Fi",
    //         "Short",
    //         "Sport",
    //         "Talk-Show",
    //         "Thriller",
    //         "War",
    //         "Western"]
    // }
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

const Model = db.model('Movie', MovieSchema);

module.exports = Model; //movies