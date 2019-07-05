const FavApplicantList = require('../models/favouriteApplicant.model.js');
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
	   
    // Create a List
    const favApplicantList = new FavApplicantList({
        favMark: req.body.favMark,
        Userid: req.body.Userid,
        agent_id: currentUser.sub,
		propertyList_id: req.body.propertyList_id
		
    });

	  // Save List in the database
	  
	 // const ab = FavouriteList.findById(req.body.room_list_id);
	  
	if(  favApplicantList.propertyList_id == "" ){
		return res.status(400).json({ message: 'Property List Id cant empty' });
    }
	
    favApplicantList.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."
        });
    });
};



// Retrieve and return all Applicants lists from the database.
exports.viewAllMarkApplicants = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
	//Fav Mark List
	var favourite = FavApplicantList.find( { favMark: "true" } );
	
    FavApplicantList.find(favourite)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Favourite Applicants."
        });
    });
};

// Retrieve Unfavourite Applicants By Agent and return all lists from the database.
exports.viewAllUnmarkFav = (req, res) => {
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
	
	//Unfav List 
	var Unfavourite = FavApplicantList.find( { favMark: "false" } );
	
    FavApplicantList.find(Unfavourite)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Favourite Applicants List."
        });
    });
};

// Find a single Applicant with a listId
exports.findMarkFavOne = (req, res) => {
    FavApplicantList.findById(req.params.listId)
    .then(favApplicantList => {
        if(!favApplicantList) {
            return res.status(404).send({
                message: " not found with id " + req.params.listId
            });            
        }
        res.send(favApplicantList);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Favourite Applicants not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Favourite Applicants with id " + req.params.listId
        });
    });
};


