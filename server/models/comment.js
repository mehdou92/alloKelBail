const db = require('../lib/db');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    // User: String,
    Text: String,
    MovieId: String,
});

CommentSchema.pre('save', function (next) {
    console.log('Saving...' + this.User);
    next();
});

CommentSchema.post('save', function (doc) {
    console.log(doc.User + ' is saved!');
});

const Model = db.model('Comment', CommentSchema);

module.exports = Model; //comments