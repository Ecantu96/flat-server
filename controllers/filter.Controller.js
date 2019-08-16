const SearchResult = require('../models/filter.model.js');
const Property = require('../models/agentPropertyList.model.js');
const db = require('../config/db.js');
const Role = require('../_helpers/role.js');




// Search API based on filters
exports.FilterAsPerGiven = (req, res) =>{
	
	const currentUser = req.user;
	const id = parseInt(req.params.id);
		   
        var search_query =  {}
		
		if (req.body.rentPrice ) {
			search_query.rentPrice = req.body.rentPrice;
		}
		if(req.body.Beds){
			search_query.Beds = req.body.Beds;
		}
		if(req.body.Baths){
			search_query.Baths = req.body.Baths;
		} 
		
		if(req.body.squareFeet){
			search_query.squareFeet = req.body.squareFeet;
		}
		
	
		if(req.body.location){
			search_query.location = req.body.location;
			
		}
		if(req.body.region){
			search_query.region = req.body.region;
			//search.apprtment = req.body.apprtment;
			
		}
		
	
		
	Property.find(search_query, { "propertyType.apprtment": true, "rentPrice": true, "PhotosAndMedia": true, "Address": true, "Beds": true, "Baths": true, "PhotosAndMedia": true, "squareFeet": true, "location": true, "region": true, "createdDate": true  }, function(err, lists){
				
				if (err){
					return res.status(404).json({ message: 'Not found the result' });
				}
								
				res.send(lists);
				
			}); 
	
	
	
};


//return required data of apartment to display on search result

exports.ApartmentSearch = (req, res) =>{
	
	const currentUser = req.user;
	const id = parseInt(req.params.id);
	
	  var search_query = {}
		
		
		if(req.body.Beds){
			search_query.Beds = req.body.Beds;
		}
		if(req.body.Baths){
			search_query.Baths = req.body.Baths;
		} 
		
		if(req.body.squareFeet){
			search_query.squareFeet = req.body.squareFeet;
		}
		
		if (req.body.rentPrice ) {
			search_query.rentPrice = req.body.rentPrice;
		}
		
		if (req.body.AC ) {
			search_query.AC = req.body.AC;
		}
		if(req.body.BalconyDeck){
			search_query.BalconyDeck = req.body.BalconyDeck;
		}
		if(req.body.Furnished){
			search_query.Furnished = req.body.Furnished;
		} 
		
		if(req.body.HardwoodFloor){
			search_query.HardwoodFloor = req.body.HardwoodFloor;
		}
		
		if(req.body.wheelchairAccess){
			search_query.wheelchairAccess = req.body.wheelchairAccess;
		}
		
		if(req.body.GarageParking){
			search_query.GarageParking = req.body.GarageParking;
		}
	
	
		if(req.body.OffStreetParking){
			search_query.OffStreetParking = req.body.OffStreetParking;
		}
	
		if(req.body.None){
			search_query.None = req.body.None;
		}
	
		if(req.body.InUnit){
			search_query.InUnit = req.body.InUnit;
		}
	
		if(req.body.SharedInBuilding){
			search_query.SharedInBuilding = req.body.SharedInBuilding;
		}
		
		if(req.body.NoPetsAllowed){
			search_query.NoPetsAllowed = req.body.NoPetsAllowed;
		}
	
		if(req.body.Catsok){
			search_query.Catsok = req.body.Catsok;
		}
	
		if(req.body.SmallDogsOk){
			search_query.SmallDogsOk = req.body.SmallDogsOk;
		}
	
		if(req.body.LargeDogsOk){
			search_query.LargeDogsOk = req.body.LargeDogsOk;
		}
		
	
	Property.find(search_query, { "propertyType.apprtment": true, "rentPrice": true, "PhotosAndMedia": true, "Address": true, "Beds": true, "Baths": true, "PhotosAndMedia": true, "squareFeet": true, "location": true, "region": true, "createdDate": true  })
	.then(lists =>{
		res.send(lists);
	}).catch(err => { 
	     res.status(404).send({
			 
			 message: err.message || "Property List Not Found"

			 
		 });
	});
	
};



//Inner page Details of single list 

exports.InnerDetailsPage = (req, res) =>{
	
     
	
    // var mongo = require('mongodb');
    // var o_id = new mongo.ObjectID('search_query');
    // Property.findById({'_id': o_id});
		
		var search_query = {}
		
		if(req.body.id){
			search_query = req.body.id;
		}
	
		Property.findById(search_query)
		.then(lists =>{
			res.send(lists);
		}).catch(err => { 
			 res.status(404).send({
				 
				 message: err.message || "Property List Not Found"

				 
			 });
		});
		
};


//List search properties with All Amenities

exports.AmenitiesSearch = (req, res) =>{
	
	const currentUser = req.user;
	const id = parseInt(req.params.id);
	
	   
   var search =  {}
		
		if (req.body.AC ) {
			search.AC = req.body.AC;
		}
		if(req.body.BalconyDeck){
			search.BalconyDeck = req.body.BalconyDeck;
		}
		if(req.body.Furnished){
			search.Furnished = req.body.Furnished;
		} 
		
		if(req.body.HardwoodFloor){
			search.HardwoodFloor = req.body.HardwoodFloor;
		}
		
		if(req.body.wheelchairAccess){
			search.wheelchairAccess = req.body.wheelchairAccess;
		}
		
		if(req.body.GarageParking){
			search.GarageParking = req.body.GarageParking;
		}
	
	
		if(req.body.OffStreetParking){
			search.OffStreetParking = req.body.OffStreetParking;
		}
	
		if(req.body.None){
			search.None = req.body.None;
		}
	
		if(req.body.InUnit){
			search.InUnit = req.body.InUnit;
		}
	
		if(req.body.SharedInBuilding){
			search.SharedInBuilding = req.body.SharedInBuilding;
		}
		
		if(req.body.NoPetsAllowed){
			search.NoPetsAllowed = req.body.NoPetsAllowed;
		}
	
		if(req.body.Catsok){
			search.Catsok = req.body.Catsok;
		}
	
		if(req.body.SmallDogsOk){
			search.SmallDogsOk = req.body.SmallDogsOk;
		}
	
		if(req.body.LargeDogsOk){
			search.LargeDogsOk = req.body.LargeDogsOk;
		}
	
	
	
			
	Property.find(search, { "propertyType.apprtment": true, "rentPrice": true, "PhotosAndMedia": true, "Address": true, "Beds": true, "Baths": true, "PhotosAndMedia": true, "squareFeet": true, "location": true, "region": true, "createdDate": true  })
	.then(lists =>{
		res.send(lists);
	}).catch(err => { 
	     res.status(404).send({
			 
			 message: err.message || "Property List Not Found"

			 
		 });
	});
	
};



// Retrieve and return all lists from the database.
exports.findAll = (req, res) => {
	
	
	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
	
	
		var search_query =  {}
		
		if (req.body.rentPrice) {
			search_query.rentPrice = req.body.rentPrice;
		}
	   
	 Property.find(search_query)
    .then(lists => {
        res.send(lists);
    }).catch(err => {
        res.status(404).send({
            message: err.message || "Property List Not Found"
        });
    }); 
};


// Find a single list with a listId
exports.findOne = (req, res) => {
    SearchResult.findById(req.params.listId)
    .then(SearchResults => {
        if(!SearchResults) {
            return res.status(404).send({
                message: "SearchResults not found with id " + req.params.listId
            });            
        }
        res.send(SearchResults);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "SearchResults not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving SearchResults with id " + req.params.listId
        });
    });
};

