const express = require('express');
//const aggregate = require('aggregate');
const router = express.Router();
const userService = require('../api/services/user.service');
const User = require('../models/user.model.js');
const Role = require('_helpers/role');
const db = require('config/db');
const FavouriteRoommates = require('../models/favouriteRoommate.model.js');
var multer  = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		var result = /[^/]*$/.exec(file.mimetype)[0];
		cb(null, file.fieldname + '-' + Date.now()+'.'+result)
	}
})
var upload = multer({ storage : storage }).single('avatar');

//console.log(db);

// routes
router.post('/photoUpload', photoUpload);
router.post('/authenticate', authenticate);
router.post('/register', register);
router.put('/questions', updateUserQuestions);
router.get('/questions', getUserAllQuestions);
router.get('/profile', roommateProfile);
router.get('/uploads', profileImageData);
router.get('/fetchAllUsersDetails', getAllUserDetails);
router.get('/viewAllRoommates', ViewAllRoommates);
router.get('/matchRoommates', matchRoommates);
router.get('/bestMatchs', bestMatchs);
router.get('/viewRoommateProfile/:id', fetchRoommateById);
router.get('/fetchAllAgentDetails', getAllAgentDetails);
router.get('/agentsViewbyuser', agentsViewbyUser);
router.get('/current', getCurrentUserDetails);
router.get('/userRole', userRole);
router.get('/agentRoleId', AgentRole);
router.get('/:id', getUserById);
router.put('/update', update);
router.delete('/:id', _delete);

module.exports = router;

function photoUpload(req, res, next){
	const user = req.user.sub;
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
		  // A Multer error occurred when uploading.
		  console.log(res);

		} else  {
			// console.log(res);
			var data = {
				imageName:res.filename,
				imageType:res.mimetype,
				imagePath:res.path
			}
			// var data = {
			// 	imageName:req.file.filename,
			// 	imageType:req.file.mimetype,
			// 	imagePath:req.file.path
			// }
			console.log(data);
			User.update(
				{ _id: user },
				{ $set: { "ProfileImage": data } })
				
			.then(
				() => res.status(200).json({message: "update successfull"}))   
			.catch(err => next(err));
		    }
	
	});
}


function authenticate(req, res, next) {
	const user = req.user;
      userService.authenticate(req.body)
	    .then(user => {
		if(user){ 
		         return res.json(user) 
			 } else{
				 return res.status(400).json({ message: 'Username or password is incorrect' }) 
				 
				} 
		}) 
         //400 Bad Request
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.status(201).json({ message: 'User Registered successfully' }))       // 201 User Created
        .catch(err => next(err));
}


function getCurrentUserDetails(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))   //404 Not Found
        .catch(err => next(err));
}

//UserRole Details
function userRole(req, res, next) {	 
        return res.status(200).json({ role: req.user.role, id: req.user.sub });      //200 Ok
}
//AgentRole Details
function AgentRole(req, res, next) {	

  const currentUser = req.user;
    const id = parseInt(req.params.id); 
	  
	//const agentId = agentId.id;
     
	  if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });       //401 Unauthorized
    }
     //const agent="Agent";
	 const role_name="Agent";
     return res.status(200).json({ role: req.user.role.role_name, id: req.user.sub });     // 200 Ok
	 
	  
	 
}


function getUserAllQuestions(req, res, next) {
    userService.getQuestionDataByUserId(req.user.sub)
        .then(user => user ? res.json(user.questions) : res.sendStatus(404).json({ message: 'Not Found' }) )
        .catch(err => next(err));
}



function matchRoommates(req, res, next) {
	const id = parseInt(req.params.id);
	const currentUser = req.user;
	var Finalresult = [];
	
	if (id !== currentUser.sub && currentUser.role !== Role.User) {
		return res.status(401).json({ message: 'Unauthorized User' });
	} 
	var current_user = req.user.sub;
	
	 User.findOne( {_id:current_user  }, {'questions.typeofperson': true, 'questions.DoYouDrink': true, 'questions.DoYouSmoke': true, 'questions.LikeGoOut': true, 'questions.Workhours': true, 'questions.BedTime': true, 'questions.RelationshipStatus': true},  function(err, result) {
		 
		 //console.log(result.questions.typeofperson);
		 console.log(req.user.sub);
		 
		var rules = [{ 'questions.typeofperson': result.questions.typeofperson }, { 'questions.DoYouDrink': result.questions.DoYouDrink }, { 'questions.DoYouSmoke': result.questions.DoYouSmoke }, { 'questions.LikeGoOut': result.questions.LikeGoOut }, { 'questions.Workhours': result.questions.Workhours }, { 'questions.BedTime': result.questions.BedTime }, { 'questions.RelationshipStatus': result.questions.RelationshipStatus }  ];
		//var rules = result;
		User.aggregate(
		  [
		    { $match : {$and: rules }  }
		  ], function (err, result) {
				if (err) { 
				   res.status(400).send({
					message: err.message || "Some error occurred while retrieving Matching User List."
				});
			}
			//200 result Ok
			//console.log(rules);
		  res.status(200).send(result);
		});
	});
}





function bestMatchs(req, res, next) {
    
   const id = parseInt(req.params.id);
	const currentUser = req.user;
	var Finalresult = [];
	
	if (id !== currentUser.sub && currentUser.role !== Role.User) {
		return res.status(401).json({ message: 'Unauthorized User' });
	} 
	var current_user = req.user.sub;
	
	 User.findOne( {_id:current_user  }, {'questions.typeofperson': true, 'questions.DoYouDrink': true, 'questions.DoYouSmoke': true, 'questions.LikeGoOut': true, 'questions.Workhours': true, 'questions.BedTime': true, 'questions.RelationshipStatus': true},  function(err, result) {
		 
		 //console.log(result.questions.typeofperson);
		 
		var rules = [{ 'questions.typeofperson': result.questions.typeofperson }, { 'questions.DoYouDrink': result.questions.DoYouDrink }, { 'questions.DoYouSmoke': result.questions.DoYouSmoke }, { 'questions.LikeGoOut': result.questions.LikeGoOut }, { 'questions.Workhours': result.questions.Workhours }, { 'questions.BedTime': result.questions.BedTime }, { 'questions.RelationshipStatus': result.questions.RelationshipStatus }  ];
		//var rules = result;
		console.log(rules);
		User.aggregate(
		  [
		    { $match : {$and: rules }  }
		  ], function (err, result) {
				if (err) { 
				   res.status(400).send({
					message: err.message || "Some error occurred while retrieving Matching User List."
				});
			}
			//200 result Ok
			//console.log(rules);
		  res.status(200).send(result);
		});
	});

}

function profileImageData(req, res, next) {
    userService.profileImageData(req.user.sub)
        .then(user => user ? res.json(user.Images) : res.sendStatus(102))    
        .catch(err => next(err));
}
  
  
function update(req, res, next) {
	
	
    userService.update(req.user.sub, req.body)
      .then(() => res.status(200).json({ message: 'User Updated successfully' }))   
        .catch(err => next(err));
}

function updateUserQuestions(req, res, next) {
    userService.updateQuestionData(req.user.sub,req.body)
        .then(() => res.json({ message: 'Questions Updated successfully' }))
        .catch(err => next(err));

}
function _delete(req, res, next) {
	 const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    /* if (id !== currentUser.sub && currentUser.role !== Role.Admin ) {
        return res.status(401).json({ message: 'Unauthorized Admin' });
    } */
	
    userService.delete(req.params.id)
        .then(() =>  res.status(200).json({ message: "User Deleted successfully" }))    //ok Result
        .catch(err => next(err));
}



function getUserById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    /* if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized Admin' });
    } */

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function fetchRoommateById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);
    	
	var query= FavouriteRoommates.find({})
	    query.exec(function (err, result) {
		
			result.forEach(function(doc) {
			var favouriteRoommate = doc.favouriteRoommate;
			var favouriteRoommate_ID = doc.favouriteRoommate_id;
				  console.log("favouriteRoommate");
				  console.log(favouriteRoommate);
				  console.log("favouriteRoommate_ID");
				  console.log(favouriteRoommate_ID);
		 
		  userService.getById(req.params.id)
				.then(user => {
					var fullPropertyDetails = new Array();;
					fullPropertyDetails.push(user);
					if(!user) {
						return res.status(404).send({
							message: "User not found with id " + req.params.listId
						});            
					}
					//console.log(property.id == req.params.listId);
					if(user.id == favouriteRoommate_ID){
						fullPropertyDetails.push({'favouriteRoommate':favouriteRoommate});
						res.send(fullPropertyDetails);
				   }else{
					   res.send(user); 
				   }
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
				
			
			
		 });
	});
		
		
}

function getAllUserDetails(req, res, next) {
	const currentUser = req.user;
   
    // only allow admins to access other user records
    if (  currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized Admin' });
    } 
		
    const role_name="User";
    userService.getAllUserBasedOnRole(role_name)
          .then(users => res.json(users))
		// .then(user => user ? res.json(user.role) : res.sendStatus(404))
        .catch(err => next(err));
}

function ViewAllRoommates(req, res, next) {
	const role_name="User";
    userService.getAllUserBasedOnRole(role_name, {})
          .then(users => res.json(users))
		// .then(user => user ? res.json(user.role) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllAgentDetails(req, res, next) {
	const currentUser = req.user;
   
    // only allow admins to access other user records
	  if ( currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized Admin' });
    } 
	const role_name="Agent";
    userService.getAllUserBasedOnRole(role_name)
          .then(users => res.json(users))
		// .then(user => user ? res.json(user.role) : res.sendStatus(404))
        .catch(err => next(err));
		
    
}  

function agentsViewbyUser(req, res, next) {
	const currentUser = req.user;
   
    // only allow admins to access other user records
	  if ( currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    } 
	const role_name="Agent";
    userService.getAllUserBasedOnRole(role_name)
          .then(users => res.json(users))
		// .then(user => user ? res.json(user.role) : res.sendStatus(404))
        .catch(err => next(err));
		
    
} 


function roommateProfile(req, res, next) {
	
	const currentUser = req.user;
   
    // only allow admins to access other user records
	  if ( currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    } 
	userService.getById(req.user.sub)
          .then(users => res.json(users))
		// .then(user => user ? res.json(user.role) : res.sendStatus(404))
        .catch(err => next(err));
		
    
} 


