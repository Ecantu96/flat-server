const ApartmentList = require('../models/apartmentList.model.js');
const count = require('count');
const RoomsList = require('../models/roomsList.model.js');
const Role = require('../_helpers/role.js');
const db = require('../config/db.js');
const Property = require('../models/agentPropertyList.model.js');


// Retrieve and return all lists from the database.
exports.findAll = (req, res) => {
	
	
	//const id = req.params.listId;
	//const _id = _id;
	
	
	
 ApartmentList.find({}, function ab(err, lists) {
    var listMap = {};
    var count = 1;
    lists.forEach(function(list, count) {
      listMap[count+1] = list._id;
	   
	 count++
	});

    res.send(listMap);  
	
  }); 
  

};


// Retrieve and return all lists from the database.
exports.countApplications = (req, res) => {
		
 Property.find({}, function ab(err, lists) {
    var listMap = {};
    var count = 1;
    lists.forEach(function(list, count) {
      listMap[count+1] = list._id;
	   
	 count++
	});

    res.send(listMap);  
	
  }); 
  

};

// Retrieve and return all lists from the database.
exports.findAllRoomCount = (req, res) => {
	
	
	//const id = req.params.listId;
	//const _id = _id;
	
	 RoomsList.find({}, function(err, lists) {
    var listMap = {};
    var count = 1;
    lists.forEach(function(list, count) {
      listMap[count+1] = list._id;
	   
	 count++
	});

    return res.send(listMap);  
	
	
  });
	
};





