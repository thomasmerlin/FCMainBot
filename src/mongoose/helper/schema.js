const Mongoose = require('mongoose');
const Configuration = require('./../../../parameters.json');


Mongoose.connect(
    'mongodb://localhost/' + Configuration.databaseName,
    { useNewUrlParser: true }
);

let db = Mongoose.connection;

db.once(
    'open',
    function () {
        console.log('Database connected');
    }
);


var kittySchema = new Mongoose.Schema({
    name: String
  });

let Schemas = {
    'tournament' : {
        name: String,
        date: Date,
        url: String
    }
};

let getSchema = (modelName) => {
    return Mongoose.model(modelName);
}

module.exports = {
    'initializeSchemas' : () => {
        for (let key in Schemas) {
            let schema = Mongoose.Schema(Schemas[key]);
            Mongoose.model(key, schema);
        }
    },

    'addDocument': async (modelName, data) => {
        let model = getSchema(modelName);
        let document = new model(data);
        let result = {
            error: false,
            message: ""
        };

        document.save(
            function (error, document) {
                if (error) {
                    result.error = true;
                    result.message = error;
                }
            }
        );

        return result;
    }
}