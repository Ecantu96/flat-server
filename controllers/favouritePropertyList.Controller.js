const FavProperty = require('../models/favouritePropertyList.model.js');
const Property = require('../models/agentPropertyList.model.js');
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
		    favMark: req.body.favMark,				
			PropertyList_id: req.body.PropertyList_id,				
			Roommate_id: req.user.sub,
			createdDate: req.body.createdDate,
           		   
		   
      });
	  
	 
	  var currentUserId = req.user.sub;
	   var property_ID = req.body.PropertyList_id;
	   var queryfind = FavProperty.find({"Roommate_id": currentUserId, "PropertyList_id": property_ID }) 
	 
	      queryfind.exec(function (err, result) {
			  
					  var favPropertyId = [];
					  result.forEach(function(property) {
						  
						  favPropertyId['PropertyList_id'] = property.PropertyList_id; 
						   favPropertyId['Roommate_id'] = property.Roommate_id;
								
						   
						 });
                       					 
						if ( favPropertyId['PropertyList_id'] != null && favPropertyId['Roommate_id'] != null ){
						 
						 FavProperty.updateOne({}, {                      
											  
												favMark: req.body.favMark,
												PropertyList_id: req.body.PropertyList_id
												
												
						}, {new: true})
						.then(lists => {
							if(!lists) {
								return res.status(404).send({
									message: "List not found"
								});
							}
							res.send({message: "Update Successfully"});
						})
					 }else{	
					// console.log(FinalResult);
					 
							favProperty.save()
							.then(data => {
								res.send(data);
							}).catch(err => {
								res.status(500).send({
									message: err.message || "Some error occurred while creating the List."    //500 Server Error
								});
							});
							
					 }
		       
		

	        });
	
    
};


// Retrieve Favroite Marked.
exports.find = (req, res) => {
	var User_id = req.user.sub;
	FavProperty.find()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the List."    //500 Server Error
		});
	});
};


//Fetch Users who interted in properties
exports.findUserInterestInproperty = (req, res) => {
	var query = FavProperty.find({ favMark: { $exists: true, $nin: false } }, {"PropertyList_id": true, "_id": 0 } )
	query.exec(function (err, doc) {
		  //res.json(doc);
		 Property.find({}, {doc})
		.then(data => {
				res.send(data);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occurred while creating the List."    //500 Server Error
				});
			});
													 
									
		});
	
	
};



// Retrieve and return all properties from the database.
exports.findFavPropertyList = (req, res, next) => {
	var query = FavProperty.find({favMark: {$ne: false}},{"PropertyList_id": true, "_id": 0})
		query.exec(function (err, result) {
			var newArray=[];
			result.forEach(function(doc) {
				newArray.push(doc.PropertyList_id);
			});
			Property.find({"_id" : {"$in" : newArray }}, function(err, finalresult){
				res.json(finalresult);
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