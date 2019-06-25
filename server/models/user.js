const db = require('../lib/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    newLetterAccepted: { type : Boolean, required: true},
    newsLetterAcceptedDate: { type : Date, required: true},
});

UserSchema.pre('validate', function (next) {
    if (this.newLetterAccepted) {
        this.newsLetterAcceptedDate = Date.now()
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(this.password, salt).then(hash => {
            this.password = hash;
            next();
        });
    });
});

UserSchema.post('save', function (doc) {
    console.log(doc.firstName + ' ' + doc.lastName + ' is saved');
});

UserSchema.statics.login = function (email, password) {
    return new Promise((resolve, reject) => {
        User.findOne({ email }).then(user => {    
            if (!user) {
                return reject("User not found");
            } else {
                bcrypt.compare(password, user.password).then(res => {
                        res ? resolve(user) : reject("Wrong password");
                });
            }
        })
    });
};

UserSchema.methods.register = function() {
    return this.save();
};

const User = db.model('User', UserSchema);

module.exports = User;