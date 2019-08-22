const FavProperty = require('../models/favouritePropertyList.model.js');
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
    const favProperty = new FavProperty({
		    agentId: req.body.agentId,				
			favMark: req.body.favMark,				
			PropertyList_id: req.body.PropertyList_id,				
			Roommate_id: req.user.sub,
			createdDate: req.body.createdDate,
           		   
		   
      });

	 
    favProperty.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."    //500 Server Error
        });
    });
};


// Retrieve and return all properties from the database.
exports.findFavPropertyList = (req, res) => {
    FavProperty.find()
    .then(properties => {
        res.send(properties);
    }).catch(err => {
        res.status(404).send({       
            message: err.message || "Fav Properties Not Found"            //404 Not Found Result
        });
    });
};


// Delete a list with the specified listId in the request
exports.delete = (req, res) => {
    FavProperty.findByIdAndRemove(req.params.listId)
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "Property not found with id " + req.params.listId
            });
        }
        res.send({message: "Property deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Property not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Property with id " + req.params.listId
        });
    });
};