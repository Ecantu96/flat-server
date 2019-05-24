const express = require('express');
//const aggregate = require('aggregate');
const router = express.Router();
const userService = require('../api/services/user.service');
const User = require('../models/user.model.js');
const Role = require('_helpers/role');
const db = require('config/db');

//console.log(db);

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.put('/questions', updateUserQuestions);
router.get('/questions', getUserAllQuestions);
router.get('/uploads', profileImageData);
router.get('/fetchAllUsersDetails', getAllUserDetails);
router.get('/matchRoommates', matchRoommates);
router.get('/viewRoommateProfile/:id', fetchRoommateById);
router.get('/fetchAllAgentDetails', getAllAgentDetails);
router.get('/agentsViewbyuser', agentsViewbyUser);
router.get('/current', getCurrentUserDetails);
router.get('/userRole', userRole);
router.get('/agentRole', AgentRole);
router.get('/:id', getUserById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User Registered successfully' }))
        .catch(err => next(err));
}

function getCurrentUserDetails(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

//UserRole Details
function userRole(req, res, next) {	 
        return res.status(200).json({ role: req.user.role, id: req.user.sub });
}
//AgentRole Details
function AgentRole(req, res, next) {	

  const currentUser = req.user;
    const id = parseInt(req.params.id); 
	
	//const agentId = agentId.id;
     
	  if (id !== currentUser.sub && currentUser.role !== Role.Agent) {
        return res.status(401).json({ message: 'Unauthorized Agent' });
    }
     //const agent="Agent";
	 const role_name="Agent";
     return res.status(200).json({ role: req.user.role.role_name, id: req.user.sub });
	 
	  
	 
}


function getUserAllQuestions(req, res, next) {
    userService.getQuestionDataByUserId(req.user.sub)
        .then(user => user ? res.json(user.questions) : res.sendStatus(404))
        .catch(err => next(err));
}

var getBalance = function(accountId) {
   
}


function matchRoommates(req, res, next) {
    
    /** db.users.aggregate(
    [ { $match : { questions : questions } } ]
	); ****/
	/*
	db.User.aggregate(
		[ { $match : { Role : "Admin" } } ]
	, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
	*/
	 const id = parseInt(req.params.id);
	 
	  const currentUser = req.user;
	  
	  //console.log(currentUser);
	  
	  
	   		// const LookingRoommate = new User({
       // LookingRoommate: req.body.LookingRoommate
       
   // });
	 	 	  
	  //var LookingRoommate =  User.questions.LookingRoommate ;
	  
	  //console.log(LookingRoommate);
	 	   
	 // var LookingInRoommates =  User.questions.LookingInRoommates;
	  
	 // var typeofperson = User.questions.typeofperson ;
	 
	 
	//var rules = [{ LookingRoommate: currentUser.questions.LookingRoommate }, { LookingInRoommates: currentUser.questions.LookingInRoommates }, { typeofperson: currentUser.questions.typeofperson }];
	
	var rules = [{ 'questions.LookingRoommate': "Tidy" }];
	
	//var rules = [{'questions.LookingRoommate.Loud': "true"}, { Role : "User" }];
	
	var MatchRoommates = db.User.aggregate(
	    // [ { $match : { $and: rules } } ]
		//[ { $match : { Role : "User" }  } ]
		  [ { $match : {$and: rules }  } ]
	   //  [ { $group : { questions : rules } } ]
		//[  { $group : { _id : id, questions: { $push: "$$ROOT" } } } ]
		//[   { $group: { _id: "$item", mergedSales: { $mergeObjects: "$questions" } } }	]
			
		
	, function (err, result) {
        if (err) { 
           res.status(500).send({
            message: err.message || "Some error occurred while retrieving Matching User List."
        });
        }
		res.status(200).send(result);
        
    });
 
					/*{ $match: {
						questions:{
						LookingRoommate: "false1111111"	
						}
					}*/
  
   
   
   
  /*  User.find(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err)); */
		

}


function profileImageData(req, res, next) {
    userService.profileImageData(req.user.sub)
        .then(user => user ? res.json(user.Images) : res.sendStatus(404))
        .catch(err => next(err));
}
  
  
function update(req, res, next) {
    userService.update(req.user.sub, req.body)
        .then(() => res.json({ message: "User Updated successfully" }))
        .catch(err => next(err));
}

function updateUserQuestions(req, res, next) {
    userService.updateQuestionData(req.user.sub,req.body)
        .then(() => res.json({}))
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
        .then(() => res.json({ message: "User Deleted successfully" }))
        .catch(err => next(err));
}



function getUserById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized Admin' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function fetchRoommateById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }

    userService.getById(req.params.id) 
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
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

function getAllAgentDetails(req, res, next) {
	const currentUser = req.user;
   
    // only allow admins to access other user records
	  if ( currentUser.role !== Role.Admin) {
        return res.status(402).json({ message: 'Unauthorized Admin' });
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
        return res.status(402).json({ message: 'Unauthorized User' });
    } 
	const role_name="Agent";
    userService.getAllUserBasedOnRole(role_name)
          .then(users => res.json(users))
		// .then(user => user ? res.json(user.role) : res.sendStatus(404))
        .catch(err => next(err));
		
    
} 


/* function getById(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
 */
