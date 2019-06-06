const FavouriteList = require('../models/favouriteAgentList.model.js');
 //const listId = require('./roomsList.Controller.js');
const Role = require('../_helpers/role.js');

 
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
    const favouritelist = new FavouriteList({
        favourite: req.body.favourite,
        Userid: currentUser.sub,
		room_list_id: req.body.room_list_id
		
    });

	  // Save List in the database
	  
	 // const ab = FavouriteList.findById(req.body.room_list_id);
	  
	if(  favouritelist.room_list_id == "" ){
		return res.status(400).json({ message: 'Room List Id cant empty' });
    }
	
    favouritelist.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."
        });
    });
};



// Retrieve and return all lists from the database.
exports.fetchallFavListByAgent = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
	//Fav Mark List
	var favourite = FavouriteList.find( { favourite: "true" } );
	
    FavouriteList.find(favourite)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Favourite lists."
        });
    });
};

// Retrieve fav List By Userand return all lists from the database.
exports.fetchallFavListByUser = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
	
	//var favouriteAgentList= "true";
	var favourite = FavouriteList.find( { favourite: "true" } );
	
    FavouriteList.find(favourite)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Favourite Agent lists."
        });
    });
};


// Retrieve Unfavourite AgentList By User and return all lists from the database.
exports.fetchallUnfavouriteListByUser = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
	
	//Unfav List 
	var favourite = FavouriteList.find( { favourite: "false" } );
	
    FavouriteList.find(favourite)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Favourite Agent lists."
        });
    });
};

// Find a single list with a listId
exports.findFavOne = (req, res) => {
    FavouriteList.findById(req.params.listId)
    .then(favouritelist => {
        if(!favouritelist) {
            return res.status(404).send({
                message: " not found with id " + req.params.listId
            });            
        }
        res.send(favouritelist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Favourite not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Favourite with id " + req.params.listId
        });
    });
};


