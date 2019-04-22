const Mongoose = require('mongoose');
const Configuration = require('./../config.json');


Mongoose.connect('mongodb://localhost/' + Configuration.databaseName);

let db = Mongoose.connection;

db.once(
    'open',
    function () {
        console.log('Database connected');
    }
);


var kittySchema = new mongoose.Schema({
    name: String
  });