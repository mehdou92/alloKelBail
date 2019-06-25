const db = require('./lib/db');
const User = require('./models/user');

const express = require('express');
const movieRouter = require('./routes/movies');
const securityRouter = require('./routes/security');
const verifyToken = require('./middlewares/security');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(verifyToken);
app.use('/movies', movieRouter);
app.use('/', securityRouter);

app.listen(3000, () => {
    console.log('Listening');
});
