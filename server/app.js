const db = require('./lib/db');
const User = require('./models/user');
const Movie = require('./models/movie');

const express = require('express');
const movieRouter = require('./routes/movies');
const userRouter = require('./routes/user');
const securityRouter = require('./routes/security');
const verifyToken = require('./middlewares/security');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyparser.json());
app.use('/', securityRouter);
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use(verifyToken);

// // create mapping for elk
// Movie.createMapping((err, mapping) => {
//     if(err){
//         console.log('error creating mapping');
//         console.log(err);
//     } else {
//         console.log('mapping created');
//         console.log(mapping);
//     }
// });

// let stream = Movie.synchronize();
// let count = 0;

// stream.on('data', function () {
//     count++;

// });

// stream.on('close', function () {
//     console.log("Indexed ", + count + " documents");
// });

// stream.on('error', function (err) {
//     console.log(err);
// });

// query test elk 

// Movie.search(
//     {query_string: {query: '2018'}},
//     {hydrate: true},
//     function(err, results) {
//         console.log('result ', results.hits);
//         console.log('ERR ', err);
//       // results here

//   });

app.listen(3000, () => {
    console.log('Listening');
});
