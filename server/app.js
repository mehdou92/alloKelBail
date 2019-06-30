const db = require('./lib/db');
const User = require('./models/user');

const express = require('express');
const movieRouter = require('./routes/movies');
const userRouter = require('./routes/user');
const securityRouter = require('./routes/security');
const verifyToken = require('./middlewares/security');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use('/', securityRouter);
app.use('/users', userRouter);
app.use(verifyToken);
app.use('/movies', movieRouter);

app.listen(3000, () => {
    console.log('Listening');
});
