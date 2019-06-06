const FavouriteRoommates = require('../models/favouriteRoommate.model.js');
const getAllUserDetails = require('./users.controller.js');

//console.log(getAllUserDetails);

 //const listId = require('./roomsList.Controller.js');
const Role = require('../_helpers/role.js');

const config = require('../config/db.js');

//console.log(config.users.find( { _id: 5 } ));
 
// Create and Save a new List
exports.create = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
   /*  if(!req.body.title ) {
        return res.status(400).send({
            message: "RoomsList Title can not be empty"
        });
    } */
	
	//const Userid = parseInt(req.params.id);
    // Create a List
    const favouriteRoommates = new FavouriteRoommates({
        favouriteRoommate: req.body.favouriteRoommate,
       	Userid: currentUser.sub,
		favouriteRoommate_id: req.body.favouriteRoommate_id
		
    });

	  // Save List in the database
	  
	 // const ab = FavouriteList.findById(req.body.room_list_id);
	  
	if(  favouriteRoommates.favouriteRoommate_id == "" ){
		return res.status(400).json({ message: 'Roommmate Id cant empty' });     //400 Bad Request
    }
	
    favouriteRoommates.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List." 
        });
    });
};



// Retrieve and return all lists from the database.
exports.fetchAllRoommateByuser = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
	
	//var favouriteRoommate = "true";
	var favouriteRoommate = FavouriteRoommates.find( { favouriteRoommate: "true" } );
	
    FavouriteRoommates.find(favouriteRoommate)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(404).send({
            message: err.message || "Some error occurred while retrieving Favourite Roommate."
        });
    });
};

// Retrieve and return all lists from the database.
exports.fetchAllUnMarkRoommate = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
	
	//var favouriteRoommate = "true";
	var favouriteRoommate = FavouriteRoommates.find( { favouriteRoommate: "false" } );
	
    FavouriteRoommates.find(favouriteRoommate)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(404).send({
            message: err.message || "Some error occurred while retrieving Favourite Roommate."
        });
    });
};



// Retrieve and return all lists from the database.
exports.matchUsers = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
    FavouriteRoommates.find()
    .then(getAllUserDetails => {
        res.send(getAllUserDetails);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Favourite Roommate."
        });
    });
};




