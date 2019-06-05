const ApartmentList = require('../models/apartmentList.model.js');
const Role = require('../_helpers/role.js');

 
// Create and Save a new List
exports.create = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
	
    if(!req.body.title ) {
        return res.status(400).send({
            message: "ApartmentList Title can not be empty"
        });
    }
	
	
    // Create a List
    const apartmentList = new ApartmentList({
        title: req.body.title || "Untitled List", 
        description: req.body.description,
		address: req.body.address,
		ListImage: req.body.ListImage,
		agentId: req.user.sub
    });

	  // Save List in the database
	  
	 
	
    apartmentList.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."
        });
    });
};



// Retrieve and return all lists from the database.
exports.findAll = (req, res) => {
    ApartmentList.find()
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving lists."
        });
    });
};


// Find a single list with a listId
exports.findOne = (req, res) => {
    ApartmentList.findById(req.params.listId)
    .then(apartmentList => {
        if(!apartmentList) {
            return res.status(404).send({
                message: "ApartmentList not found with id " + req.params.listId
            });            
        }
        res.send(apartmentList);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ApartmentList not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving list with id " + req.params.listId
        });
    });
};


// Update a list identified by the listId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "ApartmentList Title can not be empty"
        });
    }

    // Find list and update it with the request body
    ApartmentList.findByIdAndUpdate(req.params.listId, {
        title: req.body.title || "Untitled ApartmentList",
        description: req.body.description,
		address: req.body.address,
		ListImage: req.body.ListImage
    }, {new: true})
    .then(apartmentList => {
        if(!apartmentList) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send(apartmentList);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error updating list with id " + req.params.listId
        });
    });
};



// Delete a list with the specified listId in the request
exports.delete = (req, res) => {
    ApartmentList.findByIdAndRemove(req.params.listId)
    .then(apartmentList => {
        if(!apartmentList) {
            return res.status(404).send({
                message: "ApartmentList not found with id " + req.params.listId
            });
        }
        res.send({message: "ApartmentList deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ApartmentList not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Could not delete ApartmentList with id " + req.params.listId
        });
    });
};