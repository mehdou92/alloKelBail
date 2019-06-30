const db = require('../lib/db');
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    year: String,
    released: String,
    runtime: String,
    genre: String,
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
    plot: String,
    language: String,
    rating: {
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

module.exports = db.model('Movie', MovieSchema); //movies