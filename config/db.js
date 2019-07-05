const config = require('config.json');
const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    apartmentlists: require('../controllers/filter.Controller.js')
   // RoomsList: require('../models/roomsList.model')
};

