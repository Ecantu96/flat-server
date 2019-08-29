module.exports = (app) => {
    const lists = require('../../controllers/IminterestedInUser.Controller.js');

    // Create a new List
    app.post('/SaveUpdateUserInterested', lists.create);

    // Retrieve all List
    app.get('/FindCurrentUserList', lists.findAll);
	
	//Retrieve Match users Results
    app.get('/fetchUserinterestQuestions', lists.findInterstedInUser);
	
	 // Update a List with noteId
   // app.put('/UserInterestUpdate', lists.update); 
	
	
}