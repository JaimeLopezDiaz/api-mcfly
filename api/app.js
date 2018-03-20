const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const config = require('./config');


// =======================
// configuration =========
// =======================

console.log('ENTORNO: ' + config.ENVIRONMENT);

mongoose.connect(config.DB_URI);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// If DEV we allow CORS
if (config.ENVIRONMENT === 'development') {
    app.use( (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    next();
});

require('./routes/routes')(app);

// =======================
// start the server ======
// =======================
app.listen(config.PORT);
console.log(`Magic happens at http://localhost: ${config.PORT}`);