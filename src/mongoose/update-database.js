const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/' + Configuration.databaseName);

let db = Mongoose.connection;

db.once(
    'open',
    function () {
        console.log('Database connected');
    }
);
