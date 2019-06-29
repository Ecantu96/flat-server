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
router.get('/profile', roommateProfile);
router.get('/uploads', profileImageData);
router.get('/fetchAllUsersDetails', getAllUserDetails);
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

function authenticate(req, res, next) {
	const user = req.user;
      userService.authenticate(req.body)
	    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))   //400 Bad Request
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
	  
	  
	 
	   if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
		
        } 
	// var qlist = db.User.find(   { questions: "LookingRoommate" }, { $type: "questionsNecessary" }, { $type: "interestedRoommate" } );
			//console.log(qlist);		
	var qlist = db.User.find( { 'questions.LookingRoommate': "Quiet" } );
	
	//var rules = [{ LookingRoommate: currentUser.questions.LookingRoommate }, { LookingInRoommates: currentUser.questions.LookingInRoommates }, { typeofperson: currentUser.questions.typeofperson }];
	
	 var rules = [{ 'question': currentUser.qlist } ];
	//var rules = [{'questions.LookingRoommate.Loud': "true"}, { Role : "User" }];
		var MatchRoommates = db.User.aggregate(
	   
		  [ { $match : {$and: rules }  } ]	, function (err, result) {
			  
				if (err) { 
				   res.status(400).send({
					message: err.message || "Some error occurred while retrieving Matching User List."
				});
			}
			//200 result Ok
		  res.status(200).send(result);
        
    });  
 			

}

function bestMatchs(req, res, next) {
    
   
	 const id = parseInt(req.params.id);
	 
	  const currentUser = req.user;
	  
	  
	 
	 /*   if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
		
    }  */

    function bestMatch(params,cb){
			User.findOne(params,function(err,questions){
				if (err || !questions){
				   var keys = Object.keys(params);
				   if (keys.length){
					   delete params[keys.pop()];
					   bestMatch(params,cb);
				   }else{
					   cb('No matches',null);
				   }
				}else{
					cb(null,questions);
				}
			});
		}

		bestMatch({'LookingRoommate':'Quiet','LookingInRoommates':'Quiet','typeofperson':'Quiet', 'LookingRoommate':'Loud','LookingInRoommates':'Loud','typeofperson':'Loud', 'LookingRoommate':'Tidy','LookingInRoommates':'Tidy','typeofperson':'Tidy', 'LookingRoommate':'Messy','LookingInRoommates':'Messy','typeofperson':'Messy'},function(err,questions){
		   // console.log(err,questions);
			if (err) { 
						   res.status(400).send({
							message: err.message || "Some error occurred while retrieving Matching User List."
						});
					}
					//200 result Ok
				  res.status(200).send(questions);
			
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
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }

    userService.getById(req.params.id) 
        .then(user => user ? res.json(user) : res.sendStatus(404))   //404 No Found Result
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

/* function getById(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
 */
