module.exports = (app) => {
    const properties = require('../../controllers/IminterestedInUser.Controller.js');

    // Create a new List
    app.post('/SaveUserInterested', properties.create);

    // Retrieve all List
    app.get('/fetchUserinterestQuestions', properties.findAll);
	
	 // Update a List with noteId
    app.put('/UserInterestUpdate/:listId', properties.update); 
	
	
}