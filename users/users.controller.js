const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.put('/questions', updateUserQuestions);
router.get('/questions', getUserAllQuestions);
router.get('/uploads', profileImageData);
router.get('/fetchAllUsersDetails', getAllUserDetails);
router.get('/fetchAllAgentDetails', getAllAgentDetails);
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
        .then(() => res.json({}))
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

function profileImageData(req, res, next) {
    userService.profileImageData(req.user.sub)
        .then(user => user ? res.json(user.Images) : res.sendStatus(404))
        .catch(err => next(err));
}
  
  
function update(req, res, next) {
    userService.update(req.user.sub, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateUserQuestions(req, res, next) {
    userService.updateQuestionData(req.user.sub,req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}
function _delete(req, res, next) {
    userService.delete(req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}



function getUserById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllUserDetails(req, res, next) {
	const currentUser = req.user;
   
    // only allow admins to access other user records
    if (  currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
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
        return res.status(402).json({ message: 'Unauthorized Agent' });
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
