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
app.use('/users', require('./controllers/users.controller'));    

// Apartments Lists routes
require('./api/routes/apartmentList.routes.js')(app);

// Property Lists routes
require('./api/routes/agentPropertyList.routes.js')(app);

//Agent List Count
require('./api/routes/agentCreatedlistcount.route.js')(app);

//Favourite Agent List
require('./api/routes/favouriteAgentList.route.js')(app);

//Favourite Roommates
require('./api/routes/favouriteRoommate.routes.js')(app);

//Agent List Applications
require('./api/routes/ListAllApplication.routes.js')(app);

// Rooms Lists routes
require('./api/routes/roomsList.routes.js')(app);


// Favourite Applicants for property
require('./api/routes/favouriteApplicant.route.js')(app);

// Search Result for property
require('./api/routes/filter.routes.js')(app);

// Neighbourhood List
require('./api/routes/neighbourhood.routes.js')(app);

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