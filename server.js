require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());    

// use JWT auth to secure the api
app.use(jwt());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Lists application. Take lists quickly. Organize and keep track of all your lists."});
});
         
// api routes        
app.use('/users', require('./users/users.controller'));

// api agent
app.use('/agents', require('./agents/agent.controller'));

// Apartments Lists routes
require('./Listings/routes/apartmentList.routes.js')(app);

// Rooms Lists routes
require('./Listings/routes/roomsList.routes.js')(app);

// Configuring the database
const dbConfig = require('./config/database.config.js');



// global error handler
app.use(errorHandler);
      
// start server 
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


//const dbConfig = require('./config.json');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});