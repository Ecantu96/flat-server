const FavouriteRoommates = require('../models/favouriteRoommate.model.js');
const getAllUserDetails = require('./users.controller.js');
const User = require('../models/user.model.js');

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
	
   
    const favouriteRoommates = new FavouriteRoommates({
        favouriteRoommate: req.body.favouriteRoommate,
       	Userid: currentUser.sub,
		favouriteRoommate_id: req.body.favouriteRoommate_id
		
    });
	   var currentUserId = req.user.sub;
	   var roomate_Id = req.body.favouriteRoommate_id;
	   var queryRoommate = FavouriteRoommates.find({"Userid": currentUserId, "favouriteRoommate_id": roomate_Id }) 
	    
	    queryRoommate.exec(function (err, result) {
			
			  console.log(result);
			  //res.send(result);
			    var favouriteRoommate_id = [];
				  result.forEach(function(property) {
					  
					  favouriteRoommate_id['favouriteRoommate_id'] = property.favouriteRoommate_id; 
					  favouriteRoommate_id['Userid'] = property.Userid; 
					  
				  });
			 		
									
						if(favouriteRoommate_id['favouriteRoommate_id'] != null && favouriteRoommate_id['Userid'] != null){
							FavouriteRoommates.updateOne({}, {                      
											  
											favouriteRoommate: req.body.favouriteRoommate,
											favouriteRoommate_id: req.body.favouriteRoommate_id
																						
										}, {new: true})
										.then(lists => {
											if(!lists) {
												return res.status(404).send({
													message: "List not found"
												});
											}
											res.json({ message: 'User Updated successfully' });
										})
						}else{
							
							favouriteRoommates.save()
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


// Retrieve Favroite Marked only.
exports.find = (req, res) => {
		
		  FavouriteRoommates.find()
		   .then(data => {
				res.send(data);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Some error occurred while creating the List."    //500 Server Error
				});
			});
		
};


// Fetch Favorite Marked Match Result
exports.findFavMarkedMatchRoommate = (req, res) => {
	
	
	var query = FavouriteRoommates.find({favouriteRoommate: {$ne: false}},{"favouriteRoommate_id": true, "_id": 0})
		query.exec(function (err, result) {
			var newArray=[];
			result.forEach(function(doc) {
				//console.log(doc.favouriteRoommate_id);
				newArray.push(doc.favouriteRoommate_id);
			});
			User.find({"_id" : {"$in" : newArray }}, function(err, finalresult){
				res.json(finalresult);
			});
	});
	
		
}
		




