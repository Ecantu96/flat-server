const ApartmentList = require('../models/apartmentList.model.js');
const User = require('../models/user.model.js');
const NeighbourhoodList = require('../models/neighbourhood.model.js');
const db = require('../config/db.js');
const Role = require('../_helpers/role.js');



// Create and Save a new List
exports.create = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized Admin' }); //401 Unauthorized
    }
	
    if(!req.body.name ) {
        return res.status(400).send({
            message: "Neighbourhood Name can not be empty"
        });
    }
	
	
    // Create a List
    const neighbourhoodList = new NeighbourhoodList({
        name: req.body.name || "Unnamed List", 
        address: req.body.address,
		ListImage: req.body.ListImage,
		AreaLocations: req.body.AreaLocations,
		BusinessType: req.body.BusinessType,
		Rating: req.body.Rating,
		favourite: req.body.favourite,
		appartment_id: req.body.appartment_id,
		currentUser: req.user.sub
    });

	  // Save List in the database
	  
	 
	
    neighbourhoodList.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."
        });
    });
};



// Retrieve and return latest 5 lists from the database.
exports.findAll = (req, res) => {
	
	
	
	var method = { address : -1 };
	
	//var favourite = NeighbourhoodList.find( { favourite: "true" } );
	var favourite = NeighbourhoodList.find( { favourite: { $exists: false } } )
	
   NeighbourhoodList.find(favourite).sort(method).limit(5)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Neighbourhood Not Found"
        });
    }); 
	
};


// Retrieve and return Appartment List Based on Neighbourhood ID from the database for Landing Page
exports.aprtmentBasedonNiegbourhood = (req, res) => {
	
	
	
	//Fav Mark List
	var neighborhood_id = ApartmentList.find( { Neighborhood_id: req.params.Neighborhood_id } );
	
	
  	 ApartmentList.find(neighborhood_id ,  req.params.neighborhood_id)
    .then(lists => {
        if(!lists) {
            return res.status(404).send({
                message: "ApartmentList not found with id " + req.params.Neighborhood_id
            });            
        }
        return res.send(lists);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ApartmentList not found with id " + req.params.Neighborhood_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving ApartmentList with id " + req.params.Neighborhood_id
        });
    });
 
	
	
};


// Retrieve and return Roommate List Based on Neighbourhood ID from the database for Landing Page
exports.roommateBasedonNiegbourhood = (req, res) => {
	
	
	const room_id = req.Roommate_id;
	
	//Fav Mark List
	var roommate_id = ApartmentList.find( { Roommate_id:  { $exists: true } }  );
	
	var neighborhood_id = ApartmentList.find( { Neighborhood_id: req.params.Neighborhood_id } );
	
		
  	 ApartmentList.find(roommate_id, { "Roommate_id": true} , req.params.neighborhood_id)
    .then(lists => {
        if(!lists) {
            return res.status(404).send({
                message: "Roommates not found with id " + req.params.Neighborhood_id
            });            
        } 
		 //return res.status(200).json({ Roommate_id: req.lists.Roommate_id, id: req.user.sub })
        return res.json( lists );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Roommates not found with id " + req.params.Neighborhood_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Roommates with id " + req.params.Neighborhood_id
        });
    });
 
	
	
};



// Retrieve Locations Listing based on neighborhood id for Landing Page
exports.LocationsbasedonNeighborhood = (req, res) => {
	
	
	const room_id = req.Roommate_id;
	
	//Fav Mark List
	var Address = ApartmentList.find( { address:  { $exists: true } }  );
	
	var neighborhood_id = ApartmentList.find( { Neighborhood_id: { $exists: true } } );
	
		
  	 ApartmentList.find(neighborhood_id, { "address": true, "Neighborhood_id": true },  req.params.neighborhood_id)
    .then(lists => {
        if(!lists) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.Neighborhood_id
            });            
        } 
		 //return res.status(200).json({ Roommate_id: req.lists.Roommate_id, id: req.user.sub })
        return res.json( lists );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Location not found with id " + req.params.Neighborhood_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Location with id " + req.params.Neighborhood_id
        });
    });
 
	
	
};

exports.apartmentListCount = (req, res) => {
			
	 ApartmentList.find({}, function ab(err, lists) {
		var listMap = {};
		var count = 1;
		lists.forEach(function(list, count) {
		  listMap[count] = count+1;
		   
		 count++
		});

		res.send(listMap);  
		
	  }); 
  

};

exports.LocationCount = (req, res) => {
	
	var userLocation = ApartmentList.find( { address: { $exists: true } } )
	
		 ApartmentList.find(userLocation, function ab(err, lists) {
			var listMap = {};
			var count = 1;
			lists.forEach(function(list, count) {
			  listMap[count] = count+1;
			   count++
			});

			res.send(listMap);  
			
		  }); 
  

};


exports.roommateCounts = (req, res) => {
	
	const currentUser = req.user;
   
    // only allow admins to access other user records
    /* if (  currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized Admin' });
    }  */
		
    const role_name="User";
	
    var roommate = User.find( { Role: "User" } )	
	
	 User.find(roommate, function ab(err, lists) {
		var listMap = {};
		var count = 1;
		lists.forEach(function(list, count) {
		  listMap[count] = count+1;
		   
		 count++
		});

		res.send(listMap);  
		
	  }); 
  

};



// Retrieve and return latest 5 lists from the database.
exports.FavNeighbourhoodList = (req, res) => {
	
	
	
	//Fav Mark List
	var favourite = NeighbourhoodList.find( { favourite: { $exists: true } } )
	
	//var AreaLocations = NeighbourhoodList.find( { AreaLocations: -1 } );
	
   NeighbourhoodList.find(favourite)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Neighbourhood Not Found"
        });
    }); 
	
 
	
	
};

// Retrieve and return all lists from the database.
exports.AllNeighborhoods = (req, res) => {
	
	var favourite = NeighbourhoodList.find( { favourite: { $exists: false } } )
			
   NeighbourhoodList.find(favourite)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Neighbourhood Not Found"
        });
    }); 
	
 
	
	
};



// Update a list identified by the listId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Neighbourhood Title can not be empty"
        });
    }

    // Find list and update it with the request body
    NeighbourhoodList.findByIdAndUpdate(req.params.listId, {
        name: req.body.name || "Unnamed List", 
        address: req.body.city_name,
		ListImage: req.body.ListImage,
		AreaLocations: req.body.AreaLocations,
		BusinessType: req.body.BusinessType,
		Rating: req.body.Rating,
		favourite: req.body.favourite
				
    }, {new: true})
    .then(neighbourhoodList => {
        if(!neighbourhoodList) {
            return res.status(400).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send(neighbourhoodList);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
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
    NeighbourhoodList.findByIdAndRemove(req.params.listId)
    .then(neighbourhoodList => {
        if(!neighbourhoodList) {
            return res.status(400).send({
                message: "Neighbourhood not found with id " + req.params.listId
            });
        }
        res.send({message: "Neighbourhood deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(400).send({
                message: "Neighbourhood not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Neighbourhood with id " + req.params.listId
        });
    });
};
